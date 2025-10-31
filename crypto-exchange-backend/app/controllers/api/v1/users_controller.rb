class Api::V1::UsersController < ::ApplicationController
  # Allows unauthenticated user to login/signup
  skip_before_action :authenticate_user!, only: [:create], :raise => false

  # POST /api/v1/users
  # Creates a new user with an initial wallet containing $10,000 
  # Uses transaction to ensure both are created
  # Returns 201 Created on sucess, 422 Unprocessable Entity on validation failure 
  def create
    user=User.new(user_params)
    
    begin
      ActiveRecord::Base.transaction do
        user.save!
        wallet=Wallet.new(user_id: user.id, usd_amount: 10000)
        wallet.save!
      end
      render json: user, status: :created
    rescue ActiveRecord::RecordInvalid => e
      render json: {error: e.message}, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/users/:id
  # Updates existing user's attributes
  # Returns 200 OK on success, 422 Unproccessable Entity on validation failure
  def update
    user = User.find(params[:id])

    if user.update(user_params)
      render json: user, status: :ok
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/users/:id
  # Deletes user from the system
  # Returns 204 No Content on success
  def destroy
    user = User.find(params[:id])

    user.destroy
    head :no_content
  end

  private 
    # Whitelists email, username, and password attributes
    def user_params
      params.require(:user).permit(:email, :username, :password)
    end
end
