class Api::V1::SessionsController < ::ApplicationController
  # Allow unauthenticated user to login 
  skip_before_action :authenticate_user!, only: [:create, :destroy], :raise => false

  # POST /api/v1/login
  # Verifies username and password hash matches db 
  # Creates a new session and JWT token
  # Returns 201 Created on success, returns token to user 
  # 422 Unprocessable Entity on validation error
  # 401 Unauthorized if credentials do not match
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session=Session.new({user_id: user.id})
      if session.save
        render json: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          },
          token: session.token
        }, status: :created
      else 
        render json: session.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid Credentials' }, status: :unauthorized
    end
  end

  # DELETE /api/v1/logout
  # Deletes the user's current session
  # Returns 200 OK on success
  def destroy
    if current_session
      current_session.update!(revoked_at: Time.current)
    end

    render json: { message: 'Logged out successfully' }, status: :ok
  end


  private 
    # Whitelists username and password attributes
    def session_params
      params.require(:session).permit(:username, :password)
    end
end
