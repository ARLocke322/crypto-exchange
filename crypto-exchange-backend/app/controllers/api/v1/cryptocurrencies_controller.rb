class Api::V1::CryptocurrenciesController < ::ApplicationController
  def index
    cryptocurrencies = Cryptocurrency.all.includes(:cryptocurrency_price)
    puts cryptocurrencies[0].cryptocurrency_price
    render json: cryptocurrencies.map{|cryptocurrency| format_cryptocurrency(cryptocurrency)}, status: :ok
  end

  def show
    cryptocurrency = Cryptocurrency.includes(:cryptocurrency_price).find_by(id: params[:id])
    render json: format_cryptocurrency(cryptocurrency), status: :ok
  end

  private
    def format_cryptocurrency(cryptocurrency)
      {
        id: cryptocurrency.id,
        name: cryptocurrency.name,
        abbreviation: cryptocurrency.abbreviation,
        price_usd: cryptocurrency.cryptocurrency_price.price_usd
      }
    end
end