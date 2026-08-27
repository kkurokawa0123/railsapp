class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  # skip_before_action :authenticate_api_v1_user!, only: [:create]
  
  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end
end
