class Api::V1::TransactionsController < ::ApplicationController
  # GET /api/v1/transactions
  # Returns a formatted list of all of the user's past transactions
  # Returns 200 OK on success
  def index
    transactions = current_user.wallet.cryptocurrency_transactions.includes(:cryptocurrency)
    render json: transactions.map{|transaction| formatTransaction(transaction)}, status: :ok
  end

  private
    # Formats a transaction record to include cryptocurrency information  
    # Returns the formatted transaction
    def formatTransaction(transaction)
      {
        id: transaction.id,
        transaction_type: transaction.transaction_type,
        crypto_amount: transaction.crypto_amount,
        price_per_unit: transaction.price_per_unit,
        usd_amount: transaction.usd_amount,
        cryptocurrency: {
          id: transaction.cryptocurrency.id,
          name: transaction.cryptocurrency.name,
          abbreviation: transaction.cryptocurrency.abbreviation,
          image: transaction.cryptocurrency.image
        },
        created_at: transaction.created_at
      }
    end
end
