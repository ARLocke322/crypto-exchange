class Cryptocurrency < ApplicationRecord
  has_one :cryptocurrency_price, dependent: :destroy
  has_many :cryptocurrency_holdings, dependent: :destroy 
  has_many :cryptocurrency_transactions, dependent: :destroy

  validates :name, presence: true, 
    uniqueness: true,
    length: { minimum: 2, maximum: 20 }

  validates :abbreviation, presence: true, 
    uniqueness: true,
    length: { minimum: 2, maximum: 5 }
end
