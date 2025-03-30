class Current < ActiveSupport::CurrentAttributes
  attribute :session
  delegate :user, to: :session, allow_nil: true
  delegate :account, to: :session, allow_nil: true
  delegate :account_user, to: :session, allow_nil: true
end
