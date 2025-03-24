require "test_helper"

class GraphqlControllerTest < ActionDispatch::IntegrationTest
  setup do
    # Update the account_users fixture to have proper roles
    @account_user_one = account_users(:one)
    @account_user_one.update!(role: "admin")

    @account_user_two = account_users(:two)
    @account_user_two.update!(role: "member")

    @user = users(:one)
    @account = accounts(:one)

    # Sign in as a user
    post session_path, params: { email_address: @user.email_address, password: "password" }
  end

  test "should return current user with me query" do
    query = <<~GQL
      query {
        me {
          id
          emailAddress
        }
      }
    GQL

    post graphql_path, params: { query: query }
    assert_response :success

    json_response = JSON.parse(@response.body)
    assert_nil json_response["errors"]
    assert_equal @user.email_address, json_response["data"]["me"]["emailAddress"]
  end

  test "should return null for me when not authenticated" do
    # Sign out
    delete session_path

    query = <<~GQL
      query {
        me {
          id
          emailAddress
        }
      }
    GQL

    post graphql_path, params: { query: query }
    assert_response :success

    json_response = JSON.parse(@response.body)
    assert_nil json_response["errors"]
    assert_nil json_response["data"]["me"]
  end

  test "should return accounts for current user" do
    query = <<~GQL
      query {
        accounts {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    GQL

    post graphql_path, params: { query: query }
    assert_response :success

    json_response = JSON.parse(@response.body)
    assert_nil json_response["errors"]
    assert_equal 1, json_response["data"]["accounts"]["edges"].length
    assert_equal @account.name, json_response["data"]["accounts"]["edges"][0]["node"]["name"]
  end

  test "should return all account fields" do
    query = <<~GQL
      query {
        accounts {
          edges {
            node {
              id
              name
              createdAt
              updatedAt
            }
          }
        }
      }
    GQL

    post graphql_path, params: { query: query }
    assert_response :success

    json_response = JSON.parse(@response.body)
    assert_nil json_response["errors"]

    node = json_response["data"]["accounts"]["edges"][0]["node"]
    assert_equal @account.name, node["name"]
    assert_not_nil node["createdAt"]
    assert_not_nil node["updatedAt"]
  end

  test "should not return accounts when not authenticated" do
    # Sign out
    delete session_path

    query = <<~GQL
      query {
        accounts {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    GQL

    post graphql_path, params: { query: query }
    assert_response :success

    json_response = JSON.parse(@response.body)
    assert_nil json_response["errors"]
    # When not authenticated, the accounts field returns null
    assert_nil json_response["data"]["accounts"]
  end

  test "should be able to query account by id" do
    # Get the global id
    global_id = ManagerSchema.id_from_object(@account, Types::AccountType, {})

    query = <<~GQL
      query {
        node(id: "#{global_id}") {
          ... on Account {
            id
            name
          }
        }
      }
    GQL

    post graphql_path, params: { query: query }
    assert_response :success

    json_response = JSON.parse(@response.body)
    assert_nil json_response["errors"]
    assert_equal @account.name, json_response["data"]["node"]["name"]
  end

  test "should not return account by id if user doesn't have access" do
    # Sign in as a different user who doesn't have access to the account
    delete session_path
    @user2 = users(:two)
    post session_path, params: { email_address: @user2.email_address, password: "password" }

    # Try to access account one which user two doesn't have access to
    global_id = ManagerSchema.id_from_object(@account, Types::AccountType, {})

    query = <<~GQL
      query {
        node(id: "#{global_id}") {
          ... on Account {
            id
            name
          }
        }
      }
    GQL

    post graphql_path, params: { query: query }
    assert_response :success

    json_response = JSON.parse(@response.body)
    assert_nil json_response["data"]["node"]
  end
end
