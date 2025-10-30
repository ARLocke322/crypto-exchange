class Cryptocurrency < ApplicationRecord
  has_many :cryptocurrency_prices, dependent: :destroy
  has_many :cryptocurrency_holdings, dependent: :destroy 
  has_many :cryptocurrency_transactions, dependent: :destroy

  validates :name, presence: true, 
    uniqueness: true,
    length: { minimum: 2, maximum: 20 }

  validates :abbreviation, presence: true, 
    uniqueness: true,
    length: { minimum: 2, maximum: 5 }

  validates :image, format: { with: URI::regexp(%w[http https]) }
end
