class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Try again later." }
  layout "inertia"
  inertia_share flash: -> { flash.to_hash }

  def new
    render inertia: "Session/New"
  end

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      redirect_to after_authentication_url
    else
      redirect_to new_session_path, alert: "Try another email address or password."
    end
  end

  def select_account
    @account = Current.user.accounts.find(params[:account_id])
    @account_user = Current.user.account_users.find_by!(account: @account)
    Current.session.update!(account: @account, account_user: @account_user)
    redirect_back_or_to root_url
  rescue ActiveRecord::RecordNotFound => e
    redirect_back_or_to root_url, alert: e.message
  end

  def destroy
    terminate_session
    redirect_to new_session_path
  end
end
