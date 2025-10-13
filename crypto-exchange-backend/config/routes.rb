Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do 
      resources :users 
      # resources :sessions, only: [:create]
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      post '/signup', to: 'users#create'

    end 
  end

  resources :auth
  get "up" => "rails/health#show", as: :rails_health_check

end