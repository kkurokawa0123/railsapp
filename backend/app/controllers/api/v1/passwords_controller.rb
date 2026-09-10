class Api::V1::PasswordsController < Api::BaseApiController
  before_action :authenticate_api_v1_user!

  def update
    user = current_user
 
     unless user.valid_password?(params[:current_password])
       return render json: { message: "入力した現在のパスワードが正しくありません" }, status: :unprocessable_entity
     end
 
     if user.update_with_password(password_params)
       # Deviseセッション維持
       bypass_sign_in(user)
 
       render json: { message: "パスワードの更新が完了しました" }, status: :ok
     else
       render json: { message: "パスワードの更新に失敗しました" }, status: :unprocessable_entity
     end
   end


  private

  def password_params
    params.permit(
      :current_password,
      :password,
      :password_confirmation
    )
  end
end
