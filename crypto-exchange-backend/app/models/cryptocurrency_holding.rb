class CryptocurrencyHolding < ApplicationRecord
  belongs_to :wallet
  belongs_to :cryptocurrency

  validates :cryptocurrency_id, uniqueness: { scope: :wallet_id }
  validates :amount, presence: true, numericality: {greater_than_or_equal_to: 0}
end
