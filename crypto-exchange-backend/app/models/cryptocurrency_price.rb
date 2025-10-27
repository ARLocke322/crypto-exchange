class CryptocurrencyPrice < ApplicationRecord
  belongs_to :cryptocurrency

  validates :price_usd, presence: true, numericality: {greater_than: 0} 
end
