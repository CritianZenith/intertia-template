class SettingsController < ApplicationController
  layout "inertia"
  before_action :ensure_current_account

  inertia_share flash: -> { flash.to_hash }

  def show
    @account_users = Current.account.account_users.includes(:user)

    render inertia: "Settings/Show", props: {
      account: serialize_account(Current.account),
      account_users: serialize_account_users(@account_users)
    }
  end

  def edit
    render inertia: "Settings/Edit", props: {
      account: serialize_account(Current.account)
    }
  end

  def update
    if Current.account.update(account_params)
      redirect_to settings_path, notice: "Account settings were successfully updated."
    else
      redirect_to edit_settings_path, inertia: { errors: Current.account.errors }
    end
  end

  private

  def ensure_current_account
    redirect_to root_path, alert: "No active account selected." unless Current.account
  end

  def account_params
    params.require(:account).permit(:name, :avatar)
  end

  def serialize_account(account)
    json = {}
    json[:id] = account.id
    json[:name] = account.name
    json[:users_count] = account.users_count
    json[:avatar_url] = account.avatar.attached? ? polymorphic_url(account.avatar) : nil

    json
  end

  def serialize_account_users(account_users)
    account_users.map do |account_user|
      account_user.as_json(only: [ :id, :role ]).merge(
        user: account_user.user.as_json(only: [ :id, :email_address, :name ])
      )
    end
  end
end
