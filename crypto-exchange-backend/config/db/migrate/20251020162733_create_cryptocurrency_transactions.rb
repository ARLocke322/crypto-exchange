class CreateCryptocurrencyTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :cryptocurrency_transactions do |t|
      t.references :wallet, null: false, foreign_key: true
      t.references :cryptocurrency, null: false, foreign_key: true
      t.integer :transaction_type, null: false
      t.decimal :crypto_amount, precision: 20, scale: 8, null: false
      t.decimal :price_per_unit, precision: 15, scale: 2, null: false
      t.decimal :usd_amount, precision: 15, scale: 2, null: false

      t.timestamps
    end

    add_index :cryptocurrency_transactions, [:wallet_id, :created_at]
  end
end
