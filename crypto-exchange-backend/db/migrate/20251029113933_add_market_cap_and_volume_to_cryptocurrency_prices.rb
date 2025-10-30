class AddMarketCapAndVolumeToCryptocurrencyPrices < ActiveRecord::Migration[8.0]
  def change
    add_column :cryptocurrency_prices, :market_cap_usd, :decimal, precision: 20, scale: 2
    add_column :cryptocurrency_prices, :total_volume_usd, :decimal, precision: 20, scale: 2
  end
end
