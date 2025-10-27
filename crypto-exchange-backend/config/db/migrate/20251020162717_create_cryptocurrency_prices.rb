class CreateCryptocurrencyPrices < ActiveRecord::Migration[8.0]
  def change
    create_table :cryptocurrency_prices do |t|
      t.references :cryptocurrency, null: false, foreign_key: true
      t.decimal :price_usd, precision: 15, scale: 2

      t.timestamps
    end
  end
end
