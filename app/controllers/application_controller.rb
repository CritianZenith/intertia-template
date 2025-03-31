class ApplicationController < ActionController::Base
  include Authentication

  protect_from_forgery with: :exception

  inertia_share account: -> { Current.account }, user: -> { Current.user }
end
