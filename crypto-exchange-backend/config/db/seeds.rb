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
prices = {
  "BTC" => 110522.24,
  "ETH" => 3957.64,
  "USDT" => 1.00,
  "BNB" => 1095.41,
  "SOL" => 187.79,
  "XRP" => 2.46,
  "USDC" => 1.00,
  "ADA" => 0.66,
  "DOGE" => 0.20,
  "TRX" => 0.32
}

prices.each do |abbreviation, price|
  crypto = Cryptocurrency.find_by(abbreviation: abbreviation)
  crypto.create_cryptocurrency_price!(price_usd: price)
  puts "Set #{abbreviation} price to $#{price}"
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

puts "\n Seed data complete"
puts "Cryptocurrencies: #{Cryptocurrency.count}"
puts "Prices: #{CryptocurrencyPrice.count}"
puts "Users: #{User.count}"
puts "Wallets: #{Wallet.count}"