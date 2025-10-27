class CryptocurrencyTransaction < ApplicationRecord
  belongs_to :wallet
  belongs_to :cryptocurrency
  
  enum :transaction_type, [ :buy, :sell ]
  
  validates :crypto_amount, presence: true, numericality: { greater_than: 0 }
  validates :price_per_unit, presence: true, numericality: { greater_than: 0 }
  validates :usd_amount, presence: true, numericality: { greater_than: 0 }
end