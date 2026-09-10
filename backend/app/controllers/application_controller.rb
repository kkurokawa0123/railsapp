class ApplicationController < ActionController::API
  # API用の共通処理（JSONレスポンス設定、トークン認証など）
  include DeviseTokenAuth::Concerns::SetUserByToken
  
end
