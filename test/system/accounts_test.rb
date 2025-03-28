require "application_system_test_case"

class AccountsTest < ApplicationSystemTestCase
  setup do
    @account = accounts(:one)
    @user = users(:one)
  end

  test "visiting the accounts page asks for sign in" do
    visit accounts_url
    assert_selector "h1", text: "Sign in"
  end
end
