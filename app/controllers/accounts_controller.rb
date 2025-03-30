class AccountsController < ApplicationController
  layout "inertia"
  before_action :set_account, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /accounts
  def index
    @accounts = Account.all
    render inertia: "Account/Index", props: {
      accounts: @accounts.map do |account|
        serialize_account(account)
      end
    }
  end

  # GET /accounts/1
  def show
    @account_users = @account.account_users.includes(:user)

    render inertia: "Account/Show", props: {
      account: serialize_account(@account),
      account_users: serialize_account_users(@account_users)
    }
  end

  # GET /accounts/new
  def new
    @account = Account.new
    render inertia: "Account/New", props: {
      account: serialize_account(@account)
    }
  end

  # GET /accounts/1/edit
  def edit
    render inertia: "Account/Edit", props: {
      account: serialize_account(@account)
    }
  end

  # POST /accounts
  def create
    @account = Account.new(account_params)

    if @account.save
      @account.account_users.create(user: Current.user, role: "admin")
      redirect_to @account, notice: "Account was successfully created."
    else
      redirect_to new_account_url, inertia: { errors: @account.errors }
    end
  end

  # PATCH/PUT /accounts/1
  def update
    if @account.update(account_params)
      redirect_to @account, notice: "Account was successfully updated."
    else
      redirect_to edit_account_url(@account), inertia: { errors: @account.errors }
    end
  end

  # DELETE /accounts/1
  def destroy
    @account.destroy!
    redirect_to accounts_url, notice: "Account was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    # We need to find the account by the global id, but only allow the current user to access their own accounts
    def set_account
      @account = Current.user.accounts.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def account_params
      params.require(:account).permit(:name)
    end

    def serialize_account(account)
      json = {}
      json[:id] = account.id if account.id
      json[:name] = account.name
      json[:users_count] = account.users_count if account.id

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
