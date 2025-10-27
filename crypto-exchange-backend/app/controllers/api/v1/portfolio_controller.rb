class Api::V1::PortfolioController < ::ApplicationController

  def index
    wallet = current_user.wallet

    cryptocurrency_holdings = CryptocurrencyHolding
      .where("wallet_id = :wallet_id", {wallet_id: wallet.id})
      .includes(cryptocurrency: :cryptocurrency_price)
    
    render json: {
      wallet: { id: wallet.id, usd_amount: wallet.usd_amount},
      holdings: cryptocurrency_holdings.map{|holding| format_holding(holding)}
      }, status: :ok
  end


  private 
    def format_holding(holding)
      {
        "id": holding.id,
        "crypto_amount": holding.amount,
        "cryptocurrency": {
          "id": holding.cryptocurrency.id,
          "name": holding.cryptocurrency.name,
          "abbreviation": holding.cryptocurrency.abbreviation,
          "current_price_usd": holding.cryptocurrency.cryptocurrency_price.price_usd
        }
      }
    end
end
