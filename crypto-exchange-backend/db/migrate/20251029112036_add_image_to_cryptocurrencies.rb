class AddImageToCryptocurrencies < ActiveRecord::Migration[8.0]
  def change
    add_column :cryptocurrencies, :image, :string
  end
end
