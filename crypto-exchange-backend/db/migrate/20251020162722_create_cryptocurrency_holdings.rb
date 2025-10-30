class CreateCryptocurrencyHoldings < ActiveRecord::Migration[8.0]
  def change
    create_table :cryptocurrency_holdings do |t|
      t.references :wallet, null: false, foreign_key: true
      t.references :cryptocurrency, null: false, foreign_key: true
      t.decimal :amount, precision: 20, scale: 8

      t.timestamps
    end

  end
end
