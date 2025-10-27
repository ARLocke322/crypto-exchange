class Wallet < ApplicationRecord
  belongs_to :user

  has_many :cryptocurrency_holdings, dependent: :destroy
  has_many :cryptocurrency_transactions, dependent: :destroy

  validates :usd_amount, presence: true, numericality: {greater_than_or_equal_to: 0}  

end
