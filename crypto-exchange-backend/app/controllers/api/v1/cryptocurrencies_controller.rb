class Api::V1::CryptocurrenciesController < ::ApplicationController
  # GET /api/v1/cryptocurrencies  
  # Returns list of all cryptocurrencies and their price information
  def index
    cryptocurrencies = Cryptocurrency.all.includes(:cryptocurrency_prices)
    
    render json: cryptocurrencies.map{
      |cryptocurrency| format_cryptocurrency(cryptocurrency)}, status: :ok
  end

  # GET /api/v1/cryptocurrencies/:id
  # Returns a specific cruptocurrency and it's price information
  def show
    cryptocurrency = Cryptocurrency
      .includes(:cryptocurrency_prices)
      .find_by(id: params[:id])
    render json: format_cryptocurrency(cryptocurrency), status: :ok
  end

  private
    # Formats cryptocurrency record 
    # Finds most recent price information and adds to response
    # Returns JSON object including cryptocurerncy and price information
    def format_cryptocurrency(cryptocurrency)
      latest_info = cryptocurrency.cryptocurrency_prices.sort_by(&:created_at).last
      {
        id: cryptocurrency.id,
        name: cryptocurrency.name,
        abbreviation: cryptocurrency.abbreviation,
        image: cryptocurrency.image,
        price_usd: latest_info&.price_usd,
        market_cap_usd: latest_info&.market_cap_usd,
        total_volume_usd: latest_info&.total_volume_usd
      }
    end
end
