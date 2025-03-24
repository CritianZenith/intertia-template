class AccountUser < ApplicationRecord
  belongs_to :user
  belongs_to :account

  validates :role, presence: true, inclusion: { in: %w[admin member] }
end
