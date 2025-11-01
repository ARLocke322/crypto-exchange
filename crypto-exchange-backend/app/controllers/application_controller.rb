class ApplicationController < ActionController::API
  
  # Called before every request
  # If a current user is not found returns 402 Unauthorized
  def authenticate_user!
    if !current_user
      render json: { error: 'Unauthorized' }, status: :unauthorized 
    end
  end

  # Finds the current session from Auth header, or from memoized value
  def current_session
    @current_session ||= begin
      token = request.headers['Authorization']&.remove('Bearer ')
      Session.active.find_by(token: token)
    end
  end

  # Finds current user from the session, or from memoized value
  def current_user
    @current_user ||= current_session&.user
  end

  before_action :authenticate_user!
  
end
