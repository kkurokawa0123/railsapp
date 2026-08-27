# app/controllers/api/base_api_controller.rb
module Api
  class BaseApiController < ActionController::API
    # API用の共通処理（JSONレスポンス設定、トークン認証など）
    include DeviseTokenAuth::Concerns::SetUserByToken

    # DeviseTokenAuthのメソッドを統一
    def current_user
      current_api_v1_user
    end
  end
end