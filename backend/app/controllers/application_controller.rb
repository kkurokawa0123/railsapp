class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  
  # before_action :authenticate_api_v1_user!
  # skip_before_action :verify_authenticity_token
end
