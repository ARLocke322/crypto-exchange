Rails.application.routes.draw do
  namespace :api do 
    namespace :v1 do 
      post '/login', to: 'sessions#create'
      delete '/logout', to: 'sessions#destroy'
      post '/signup', to: 'users#create'

      resources :trades, only: :create
      resources :portfolio, only: :index
      resources :cryptocurrencies, only: [:index, :show] do
        get 'chart', to: 'cryptocurrency_charts#show'
      end
      resources :transactions, only: :index
    end 
  end

  get "up" => "rails/health#show", as: :rails_health_check

end