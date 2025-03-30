class Session < ApplicationRecord
  belongs_to :user
  belongs_to :account, optional: true
  belongs_to :account_user, optional: true
end
