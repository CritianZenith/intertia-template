class Account < ApplicationRecord
  has_many :account_users, dependent: :destroy
  has_many :users, through: :account_users
  has_many :sessions, dependent: :nullify

  def users_count
    account_users.count
  end
end
