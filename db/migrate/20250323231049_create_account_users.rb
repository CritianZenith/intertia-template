class CreateAccountUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :account_users do |t|
      t.references :user, null: false, foreign_key: true
      t.references :account, null: false, foreign_key: true
      t.string :role

      t.timestamps
    end
  end
end
