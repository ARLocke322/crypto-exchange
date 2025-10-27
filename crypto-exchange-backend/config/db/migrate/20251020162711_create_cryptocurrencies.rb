class CreateCryptocurrencies < ActiveRecord::Migration[8.0]
  def change
    create_table :cryptocurrencies do |t|
      t.string :name
      t.string :abbreviation
    end
  end
end
