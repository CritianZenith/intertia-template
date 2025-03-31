module Settings
  class UsersController < ApplicationController
    layout "inertia"
    before_action :set_account_user, only: [ :update, :destroy ]
    before_action :ensure_current_account

    inertia_share flash: -> { flash.to_hash }

    # GET /settings/users/new
    def new
      render inertia: "Settings/Users/New", props: {
        account: serialize_account(Current.account)
      }
    end

    # POST /settings/users
    def create
      user = User.find_by(email_address: account_user_params[:email_address])

      unless user
        redirect_to new_settings_user_path, inertia: {
          errors: { email_address: [ "User not found with this email address" ] }
        }
        return
      end

      # Check if the user is already part of the account
      if Current.account.account_users.exists?(user: user)
        redirect_to settings_path(tab: "users"), alert: "User is already a member of this account."
        return
      end

      @account_user = Current.account.account_users.new(
        user: user,
        role: account_user_params[:role]
      )

      if @account_user.save
        redirect_to settings_path(tab: "users"), notice: "User was successfully added to the account."
      else
        redirect_to new_settings_user_path, inertia: { errors: @account_user.errors }
      end
    end

    # PATCH/PUT /settings/users/1
    def update
      # only admins can update user roles
      unless Current.account_user.role == "admin"
        redirect_to settings_path(tab: "users"), alert: "You are not authorized to update user roles."
        return
      end

      if @account_user.update(account_user_params)
        redirect_to settings_path(tab: "users"), notice: "User role was successfully updated."
      else
        redirect_to settings_path(tab: "users"), alert: "Failed to update user role."
      end
    end

    # DELETE /settings/users/1
    def destroy
      # only admins can delete users
      unless Current.account_user.role == "admin"
        redirect_to settings_path(tab: "users"), alert: "You are not authorized to delete users."
        return
      end

      @account_user.destroy!
      redirect_to settings_path(tab: "users"), notice: "User was successfully removed from the account."
    end

    private

    def set_account_user
      @account_user = Current.account.account_users.find(params[:id])
    end

    def account_user_params
      params.require(:account_user).permit(:email_address, :role)
    end

    def ensure_current_account
      redirect_to root_path, alert: "No active account selected." unless Current.account
    end

    def serialize_account(account)
      json = {}
      json[:id] = account.id
      json[:name] = account.name

      json
    end
  end
end
