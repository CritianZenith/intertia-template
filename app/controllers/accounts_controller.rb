class AccountsController < ApplicationController
  layout "inertia"

  inertia_share flash: -> { flash.to_hash }

  # GET /accounts/new
  def new
    @account = Account.new
    render inertia: "Account/New", props: {
      account: serialize_account(@account)
    }
  end

  # POST /accounts
  def create
    @account = Account.new(account_params)

    if @account.save
      account_user = @account.account_users.create(user: Current.user, role: "admin")
      Current.session.update(account: @account, account_user: account_user)
      redirect_to settings_path, notice: "Account was successfully created."
    else
      redirect_to new_account_url, inertia: { errors: @account.errors }
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def account_params
      params.require(:account).permit(:name, :avatar)
    end

    def serialize_account(account)
      json = {}
      json[:id] = account.id if account.id
      json[:name] = account.name
      json[:users_count] = account.users_count if account.id
      json[:avatar_url] = account.avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_url(account.avatar) : nil

      json
    end
end
