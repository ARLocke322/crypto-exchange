class Api::V1::SessionsController < ::ApplicationController
  skip_before_action :authenticate_user!, only: [:create, :destroy], :raise => false

  def index
    sessions=Session.all

    render json: sessions, status: :ok
  end

  def create
    user = User.find_by(username: params[:username])
    puts params
    if user&.authenticate(params[:password])
      session=Session.new({user_id: user.id})
      if session.save
        render json: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email
            # add any other fields you want exposed to the frontend
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

  def destroy
    if current_session
      current_session.update!(revoked_at: Time.current)
    end

    render json: { message: 'Logged out successfully' }, status: :ok
  end


  private 
    def session_params
      params.require(:session).permit(:username, :password)
    end
end
