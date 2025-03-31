class Account < ApplicationRecord
  has_many :account_users, dependent: :destroy
  has_many :users, through: :account_users
  has_many :sessions, dependent: :nullify
  has_one_attached :avatar

  validates :avatar, content_type: { in: [ "image/png", "image/jpeg", "image/gif" ], message: "must be a valid image format" },
                     size: { less_than: 5.megabytes, message: "should be less than 5MB" },
                     if: -> { avatar.attached? }

  def users_count
    account_users.count
  end
end
