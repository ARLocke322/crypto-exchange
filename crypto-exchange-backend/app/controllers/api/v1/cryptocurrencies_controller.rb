class Api::V1::CryptocurrenciesController < ::ApplicationController
  def index
    cryptocurrencies = Cryptocurrency.all.includes(:cryptocurrency_prices)
    
    render json: cryptocurrencies.map{|cryptocurrency| format_cryptocurrency(cryptocurrency)}, status: :ok
  end

  def show
    cryptocurrency = Cryptocurrency.includes(:cryptocurrency_prices).find_by(id: params[:id])
    render json: format_cryptocurrency(cryptocurrency), status: :ok
  end

  private
    def format_cryptocurrency(cryptocurrency)
      latest_price = cryptocurrency.cryptocurrency_prices.sort_by(&:created_at).last
      {
        id: cryptocurrency.id,
        name: cryptocurrency.name,
        abbreviation: cryptocurrency.abbreviation,
        image: cryptocurrency.image,
        price_usd: latest_price&.price_usd
      }
    end
end