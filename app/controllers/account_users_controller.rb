class AccountUsersController < ApplicationController
  layout "inertia"
  before_action :set_account
  before_action :authorize_account_admin
  before_action :set_account_user, only: [ :destroy ]

  inertia_share flash: -> { flash.to_hash }

  def index
    @account_users = @account.account_users.includes(:user)

    render inertia: "Account/Users/Index", props: {
      account: serialize_account(@account),
      account_users: serialize_account_users(@account_users)
    }
  end

  def new
    render inertia: "Account/Users/New", props: {
      account: serialize_account(@account),
      available_roles: [ "admin", "member" ]
    }
  end

  def create
    user = User.find_by(email_address: params[:email_address].strip.downcase)

    if user.nil?
      new_user_password = Faker::Company.bs.parameterize
      user = User.create!(
        email_address: params[:email_address].strip.downcase,
        password: new_user_password
      )
      PasswordsMailer.new_user(user, new_user_password).deliver_later
      flash[:alert] = "User created successfully with #{new_user_password} as the password."
    end

    if @account.users.include?(user)
      redirect_to account_users_path(@account), notice: "User is already a member of this account."
      return
    end

    @account_user = @account.account_users.build(user: user, role: account_user_params[:role])

    if @account_user.save
      redirect_to account_users_path(@account), notice: "User was successfully added to the account."
    else
      redirect_to new_account_user_path(@account), inertia: { errors: @account_user.errors }
    end
  end

  def destroy
    if @account.account_users.where(role: "admin").count <= 1 && @account_user.role == "admin"
      redirect_to account_users_path(@account), alert: "Cannot remove the last admin from the account."
      return
    end

    @account_user.destroy!
    redirect_to account_users_path(@account), notice: "User was successfully removed from the account."
  end

  private
    def set_account
      @account = Current.user.accounts.find(params[:account_id])
    end

    def set_account_user
      @account_user = @account.account_users.find(params[:id])
    end

    def authorize_account_admin
      unless @account.account_users.exists?(user: Current.user, role: "admin")
        redirect_to @account, alert: "You must be an admin to manage account users."
      end
    end

    def account_user_params
      params.require(:account_user).permit(:role)
    end

    def serialize_account(account)
      account.as_json(only: [ :id, :name ])
    end

    def serialize_account_users(account_users)
      account_users.map do |account_user|
        account_user.as_json(only: [ :id, :role ]).merge(
          user: account_user.user.as_json(only: [ :id, :email_address, :name ])
        )
      end
    end
end
