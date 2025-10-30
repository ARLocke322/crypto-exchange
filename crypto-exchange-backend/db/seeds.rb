# db/seeds.rb
puts "Clearing all existing data..."

# Destroy all records
CryptocurrencyTransaction.destroy_all
CryptocurrencyHolding.destroy_all
CryptocurrencyPrice.destroy_all
Cryptocurrency.destroy_all
Session.destroy_all
Wallet.destroy_all
User.destroy_all

# Reset primary key sequences
ActiveRecord::Base.connection.reset_pk_sequence!('cryptocurrency_transactions')
ActiveRecord::Base.connection.reset_pk_sequence!('cryptocurrency_holdings')
ActiveRecord::Base.connection.reset_pk_sequence!('cryptocurrency_prices')
ActiveRecord::Base.connection.reset_pk_sequence!('cryptocurrencies')
ActiveRecord::Base.connection.reset_pk_sequence!('sessions')
ActiveRecord::Base.connection.reset_pk_sequence!('wallets')
ActiveRecord::Base.connection.reset_pk_sequence!('users')

puts "Seeding cryptocurrencies..."
cryptocurrencies = [
  { name: "Bitcoin", abbreviation: "BTC" },
  { name: "Ethereum", abbreviation: "ETH" },
  { name: "Tether", abbreviation: "USDT" },
  { name: "Binance Coin", abbreviation: "BNB" },
  { name: "Solana", abbreviation: "SOL" },
  { name: "Ripple", abbreviation: "XRP" },
  { name: "USD Coin", abbreviation: "USDC" },
  { name: "Cardano", abbreviation: "ADA" },
  { name: "Dogecoin", abbreviation: "DOGE" },
  { name: "Tron", abbreviation: "TRX" }
]

cryptocurrencies.each do |crypto_data|
  Cryptocurrency.create!(crypto_data)
  puts "Created #{crypto_data[:name]}"
end

puts "\nSeeding cryptocurrency prices (as of October 21, 2025)..."
price_history = {
  "BTC" => [105000.00, 108000.00, 112000.00, 109500.00, 110522.24],
  "ETH" => [3750.00, 3850.00, 4050.00, 4100.00, 3957.64],            # DOWN from last week
  "USDT" => [1.00, 1.00, 1.00, 1.00, 1.00],
  "BNB" => [1020.00, 1050.00, 1100.00, 1080.00, 1095.41],            # UP from last week
  "SOL" => [175.00, 180.00, 190.00, 195.00, 187.79],                 # DOWN from last week
  "XRP" => [2.30, 2.35, 2.50, 2.42, 2.46],                           # UP from last week
  "USDC" => [1.00, 1.00, 1.00, 1.00, 1.00],
  "ADA" => [0.62, 0.64, 0.68, 0.68, 0.66],                           # DOWN from last week
  "DOGE" => [0.18, 0.19, 0.21, 0.19, 0.20],                          # UP from last week
  "TRX" => [0.30, 0.31, 0.33, 0.34, 0.32]       # DOWN from last week  
}

[4, 3, 2, 1, 0].each_with_index do |weeks_ago, index|
  date = weeks_ago.weeks.ago
  
  price_history.each do |abbreviation, prices|
    crypto = Cryptocurrency.find_by(abbreviation: abbreviation)
    price = prices[index]
    
    CryptocurrencyPrice.create!(
      cryptocurrency: crypto,
      price_usd: price,
      created_at: date,
      updated_at: date
    )
    
    puts "Set #{abbreviation} price to $#{price} on #{date.strftime('%Y-%m-%d')}"
  end
  puts ""
end

puts "\nSeeding test user..."
user = User.create!(
  username: "testuser",
  email: "test@example.com",
  password: "password"
)
puts "Created user: #{user.username}"

wallet = Wallet.create!(
  user: user,
  usd_amount: 10000.00
)
puts "Created wallet with $#{wallet.usd_amount}"

puts "\nSeeding transactions from 1 week ago (~$5000 total)..."
one_week_ago = 1.week.ago

# Transaction amounts using updated 1 week ago prices
transactions_data = [
  { abbreviation: "BTC", crypto_amount: 0.01, usd_amount: 1095.00 },   # 0.01 * $109,500
  { abbreviation: "ETH", crypto_amount: 0.5, usd_amount: 2050.00 },    # 0.5 * $4,100
  { abbreviation: "SOL", crypto_amount: 5, usd_amount: 975.00 },       # 5 * $195
  { abbreviation: "BNB", crypto_amount: 0.5, usd_amount: 540.00 },     # 0.5 * $1,080
  { abbreviation: "ADA", crypto_amount: 500, usd_amount: 340.00 },     # 500 * $0.68
  { abbreviation: "DOGE", crypto_amount: 1000, usd_amount: 190.00 },   # 1000 * $0.19
  { abbreviation: "USDT", crypto_amount: 300, usd_amount: 300.00 },    # 300 * $1.00
  { abbreviation: "USDC", crypto_amount: 200, usd_amount: 200.00 },    # 200 * $1.00
  { abbreviation: "XRP", crypto_amount: 100, usd_amount: 242.00 },     # 100 * $2.42
  { abbreviation: "TRX", crypto_amount: 100, usd_amount: 34.00 }     
]

transactions_data.each do |tx_data|
  crypto = Cryptocurrency.find_by(abbreviation: tx_data[:abbreviation])
  price_at_time = price_history[tx_data[:abbreviation]][3] # 1 week ago price
  
  # Create transaction
  transaction = CryptocurrencyTransaction.create!(
    wallet: wallet,
    cryptocurrency: crypto,
    transaction_type: 'buy',
    crypto_amount: tx_data[:crypto_amount],
    price_per_unit: price_at_time,
    usd_amount: tx_data[:usd_amount],
    created_at: one_week_ago,
    updated_at: one_week_ago
  )
  
  # Create or update holding
  holding = CryptocurrencyHolding.find_or_initialize_by(
    wallet: wallet,
    cryptocurrency: crypto
  )
  holding.amount = (holding.amount || 0) + tx_data[:crypto_amount]
  holding.save!
  
  puts "Created buy transaction: #{tx_data[:crypto_amount]} #{tx_data[:abbreviation]} for $#{tx_data[:usd_amount]}"
end

# Update wallet balance (subtract total spent)
total_spent = transactions_data.sum { |tx| tx[:usd_amount] }
wallet.update!(usd_amount: wallet.usd_amount - total_spent)

puts "\n Seed data complete"
puts "Cryptocurrencies: #{Cryptocurrency.count}"
puts "Prices: #{CryptocurrencyPrice.count}"
puts "Users: #{User.count}"
puts "Wallets: #{Wallet.count}"