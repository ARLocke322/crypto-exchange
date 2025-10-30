class AddIndexToCryptocurrencyPrices < ActiveRecord::Migration[8.0]
  def change
    add_index :cryptocurrency_prices, [:cryptocurrency_id, :created_at], order: { created_at: :desc }
  end
end
