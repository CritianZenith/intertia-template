class PasswordsMailer < ApplicationMailer
  def reset(user)
    @user = user
    mail subject: "Reset your password", to: user.email_address
  end

  def new_user(user, password)
    @user = user
    @password = password
    mail subject: "Your account has been created", to: user.email_address
  end
end
