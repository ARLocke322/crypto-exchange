class Api::V1::PortfolioController < ::ApplicationController

  # GET /api/v1/portfolio
  # Returns the user's cryptocurrency holdings + cryptocurrency specific data 
  # Returns 200 OK on success
  def index
    wallet = current_user.wallet

    cryptocurrency_holdings = CryptocurrencyHolding
      .where("wallet_id = :wallet_id", {wallet_id: wallet.id})
      .includes(cryptocurrency: :cryptocurrency_prices)
    
    @cryptocurrency_transactions = CryptocurrencyTransaction
      .where("wallet_id = :wallet_id", {wallet_id: wallet.id})

    render json: {
      wallet: { id: wallet.id, usd_amount: wallet.usd_amount},
      holdings: cryptocurrency_holdings.map{|holding| format_holding(holding)}
      }, status: :ok
  end

  private 
    # Formats the holding record including the cryptocurrency information
    # Calls the calculateValueChange method 
    # Returns the JSON formatted holding
    def format_holding(holding)
      current_price_usd = holding.cryptocurrency.cryptocurrency_prices.sort_by(&:created_at).last.price_usd
      {
        "id": holding.id,
        "crypto_amount": holding.amount,
        "cryptocurrency": {
          "id": holding.cryptocurrency.id,
          "name": holding.cryptocurrency.name,
          "abbreviation": holding.cryptocurrency.abbreviation,
          "image": holding.cryptocurrency.image,
          "current_price_usd": current_price_usd,
          "value_percentage_change": calculateValueChange(holding, current_price_usd)
        }
      }
    end

    # Calculates the percentage change in value of the holding since purchase
    # Returns percentage change = ( current value / total purchase value) 
    def calculateValueChange(holding, current_price_usd)
      transactions = @cryptocurrency_transactions.select { |t| t.cryptocurrency_id == holding.cryptocurrency_id }
      cost_basis = transactions.sum { |t| t.transaction_type == 'buy' ? t.usd_amount : -t.usd_amount }
      current_value = holding.amount * current_price_usd

      return 0 if cost_basis.zero?

      ((current_value - cost_basis) / cost_basis * 100).round(2)
      
    end
end
