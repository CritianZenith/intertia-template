require "test_helper"

class AccountTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "should have one attached avatar" do
    account = Account.new(name: "Test Account")
    assert_respond_to account, :avatar
    assert_respond_to account, :avatar_attachment
  end
end
