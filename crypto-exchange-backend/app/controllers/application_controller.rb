class ApplicationController < ActionController::API
  

  def authenticate_user!
    if !current_user
      render json: { error: 'Unauthorized' }, status: :unauthorized 
    end
  end

  def current_session
    @current_session ||= begin
      token = request.headers['Authorization']&.remove('Bearer ')
      Session.active.find_by(token: token)
    end
  end

  def current_user
    @current_user ||= current_session&.user
  end

  before_action :authenticate_user!
  
end
