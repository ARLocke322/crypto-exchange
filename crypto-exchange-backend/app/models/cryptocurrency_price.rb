class CryptocurrencyPrice < ApplicationRecord
  belongs_to :cryptocurrency

  validates :price_usd, presence: true, numericality: {greater_than: 0} 
  validates :market_cap_usd, presence: true, numericality: {greater_than: 0} 
  validates :total_volume_usd, presence: true, numericality: {greater_than: 0} 
end
