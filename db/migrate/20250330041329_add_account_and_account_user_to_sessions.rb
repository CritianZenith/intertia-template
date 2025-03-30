class AddAccountAndAccountUserToSessions < ActiveRecord::Migration[8.0]
  def change
    add_reference :sessions, :account, null: true, foreign_key: true
    add_reference :sessions, :account_user, null: true, foreign_key: true
  end
end
