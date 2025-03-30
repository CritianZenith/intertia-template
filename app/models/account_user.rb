class AccountUser < ApplicationRecord
  belongs_to :user
  belongs_to :account

  enum :role, {
    admin: "admin",
    member: "member"
  }, default: "member"
end
