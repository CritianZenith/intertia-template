class ProfilesController < ApplicationController
  layout "inertia"

  inertia_share flash: -> { flash.to_hash }

  def show
    render inertia: "Profile/Show", props: {
      user: serialize_user(Current.user)
    }
  end

  def edit
    render inertia: "Profile/Edit", props: {
      user: serialize_user(Current.user)
    }
  end

  def update
    if Current.user.update(user_params)
      redirect_to profile_path, notice: "Profile was successfully updated."
    else
      redirect_to edit_profile_path, inertia: { errors: Current.user.errors }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :bio)
  end

  def serialize_user(user)
    user.as_json(only: [
      :id, :email_address, :name, :bio
    ])
  end
end
