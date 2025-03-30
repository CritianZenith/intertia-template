class AccountUser < ApplicationRecord
  belongs_to :user
  belongs_to :account
  has_one :session, dependent: :nullify

  enum :role, {
    admin: "admin",
    member: "member"
  }, default: "member"
end
