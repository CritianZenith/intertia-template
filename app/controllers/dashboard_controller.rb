class DashboardController < ApplicationController
  layout "inertia"

  def index
    render inertia: "Dashboard"
  end
end
