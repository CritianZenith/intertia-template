require "application_system_test_case"

class DashboardTest < ApplicationSystemTestCase
  setup do
    @account = accounts(:one)
    @user = users(:one)
  end

  test "visiting the dashboard page asks for sign in" do
    visit root_url
    assert_selector "h1", text: "Sign in"
  end
end
