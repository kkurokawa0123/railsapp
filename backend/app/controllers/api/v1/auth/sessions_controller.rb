class Api::V1::Auth::SessionsController < ApplicationController
  # skip_before_action :authenticate_api_v1_user!, only: [:index,:create]

  def index
    if current_api_v1_user
      render json: { is_login: true, data: current_api_v1_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end
