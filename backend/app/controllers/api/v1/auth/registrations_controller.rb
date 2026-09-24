class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  
  def create
    start_time = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    Rails.logger.info "[SIGNUP] START"

    result = super

    elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - start_time
    Rails.logger.info "[SIGNUP] END: #{elapsed.round(3)} sec"

    result
  end

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :name)
  end
end
