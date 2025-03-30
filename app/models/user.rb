class User < ApplicationRecord
  has_secure_password
  has_many :sessions, dependent: :destroy
  has_many :account_users, dependent: :destroy
  has_many :accounts, through: :account_users

  normalizes :email_address, with: ->(e) { e.strip.downcase }

  def create_first_account!
    account = accounts.create!(name: "Default Account")
    account_user = account_users.where(account: account).first_or_create!
    account_user.update!(role: :admin)
    account
  end
end
