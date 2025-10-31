class Api::V1::TradesController < ::ApplicationController

  # POST /api/v1/trades
  # Finds user's wallet and existing holdings from params
  # Calls the create_transaction_record method to create a transaction
  # Calls the process_buy/sell method depending on user's request
  def create
    @wallet = current_user.wallet.lock!

    @cryptocurrency_price = CryptocurrencyPrice.where(cryptocurrency_id: trade_params[:cryptocurrency_id]).order(created_at: :desc).first
    @cryptocurrency_holding = CryptocurrencyHolding.find_or_create_by( 
        wallet_id: @wallet.id, cryptocurrency_id: trade_params[:cryptocurrency_id]
      )

    create_transaction_record
    process_buy if trade_params[:transaction_type] == 'buy'
    process_sell if trade_params[:transaction_type] == 'sell'
  end

  private 
    # Updates user's wallet, holdings, and saves the transaction
    # Returns error if user does not have enough balance
    # Uses transaction to ensure both holding, transaction, and wallet save
    # Returns the JSON formatted transaction with status 200 :OK
    # Otherwise returns status 422 Unprocessable Entity on validation failure
    def process_buy
      return render json: {error: 'Insufficient wallet balance'} \
        if trade_params[:crypto_amount]*@cryptocurrency_price.price_usd > @wallet.usd_amount
      
      begin
        ActiveRecord::Base.transaction do
           # Update wallet record
          @wallet.usd_amount -= @cryptocurrency_price.price_usd * trade_params[:crypto_amount]

          # Update holding record with new crypto ammount
          if @cryptocurrency_holding.amount
            @cryptocurrency_holding.amount += trade_params[:crypto_amount]
          else 
            @cryptocurrency_holding.amount = trade_params[:crypto_amount]
          end

          # Save records
          @cryptocurrency_transaction.save!
          @cryptocurrency_holding.save!
          @wallet.save!
        end
        render json: @cryptocurrency_transaction, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: {error: e.message}, status: :unprocessable_entity
      end
    end

    # Same as process_buy, just performs validations for selling instead
    def process_sell
      return render json: { error: 'Insufficient crypto balance' }  \
        if trade_params[:crypto_amount] > @cryptocurrency_holding.amount

      begin
        ActiveRecord::Base.transaction do
           # Update wallet record
          @wallet.usd_amount += @cryptocurrency_price.price_usd * trade_params[:crypto_amount]

          # Update holding record with new crypto ammount
          @cryptocurrency_holding.amount -= trade_params[:crypto_amount]

          # Save records
          @cryptocurrency_transaction.save!
          @cryptocurrency_holding.save!
          @wallet.save!
        end
        render json: @cryptocurrency_transaction, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: {error: e.message}, status: :unprocessable_entity
      end
    end

    # Creates the transaction record from the request params
    def create_transaction_record
      @cryptocurrency_transaction = CryptocurrencyTransaction.new(
        wallet: @wallet, 
        cryptocurrency_id: trade_params[:cryptocurrency_id],
        transaction_type: trade_params[:transaction_type],
        crypto_amount: trade_params[:crypto_amount],
        price_per_unit: @cryptocurrency_price.price_usd,
        usd_amount: trade_params[:crypto_amount] * @cryptocurrency_price.price_usd
      )
    end

    # Whitelists the request params
    def trade_params
      params.require(:trade).permit(:wallet_id, :transaction_type, :cryptocurrency_id, :crypto_amount)
    end
end
