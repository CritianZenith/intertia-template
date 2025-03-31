require "test_helper"

class AccountsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @account = accounts(:one)
    @user = users(:one)
    # Sign in as a user
    sign_in_as(@user)
  end

  test "should get new" do
    get new_account_url
    assert_response :success
  end

  test "should create account" do
    assert_difference("Account.count") do
      post accounts_url, params: { account: { name: @account.name } }
    end

    assert_redirected_to settings_url
  end
end
