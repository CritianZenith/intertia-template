require "test_helper"

module Settings
  class UsersControllerTest < ActionDispatch::IntegrationTest
    setup do
      @user = users(:one)
      sign_in_as(@user)
    end

    test "should get new" do
      get new_settings_user_url
      assert_response :success
    end

    test "should create user" do
      another_user = users(:two)

      assert_difference("AccountUser.count") do
        post settings_users_url, params: {
          account_user: {
            email_address: another_user.email_address,
            role: "member"
          }
        }
      end

      assert_redirected_to settings_path(tab: "users")
      assert_equal "User was successfully added to the account.", flash[:notice]
    end

    test "should update user role" do
      account_user = account_users(:one)

      patch settings_user_url(account_user), params: {
        account_user: { role: "member" }
      }

      assert_redirected_to settings_path(tab: "users")
      assert_equal "User role was successfully updated.", flash[:notice]
      account_user.reload
      assert_equal "member", account_user.role
    end

    test "should destroy user" do
      account_user = account_users(:one)

      assert_difference("AccountUser.count", -1) do
        delete settings_user_url(account_user)
      end

      assert_redirected_to settings_path(tab: "users")
      assert_equal "User was successfully removed from the account.", flash[:notice]
    end
  end
end
