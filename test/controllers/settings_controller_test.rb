require "test_helper"

class SettingsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
    sign_in_as(@user)
  end

  test "should show settings" do
    get settings_url
    assert_response :success
  end

  test "should get edit settings" do
    get edit_settings_url
    assert_response :success
  end

  test "should update settings" do
    patch settings_url, params: { account: { name: "Updated Account Name" } }
    assert_redirected_to settings_url
    assert_equal "Account settings were successfully updated.", flash[:notice]
    # We can't easily test the account name change since we don't have access to the Current.account
  end

  test "should redirect when not signed in" do
    sign_out if defined?(sign_out)
    delete "/session/destroy" # Alternative way to sign out
    get settings_url
    assert_redirected_to new_session_url
  end
end
