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
    render inertia: "Account/Show", props: {
      account: serialize_account(@account)
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
    def set_account
      @account = Account.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def account_params
      params.require(:account).permit(:name)
    end

    def serialize_account(account)
      account.as_json(only: [
        :id, :name
      ])
    end
end
