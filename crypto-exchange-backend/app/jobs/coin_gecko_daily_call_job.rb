require 'net/http'

class CoinGeckoDailyCallJob < ApplicationJob
  queue_as :default
  retry_on ActiveRecord::Deadlocked, wait: 5.seconds, attempts: 3
  retry_on Net::OpenTimeout, Timeout::Error, wait: :exponentially_longer, attempts: 10 # retries at most 10 times for Net::OpenTimeout and Timeout::Error combined
 

  def perform(*args)
    # Do something later
    # 
    api_key = ENV['COINGECKO_API_KEY']

    cryptocurrency_map = {
      "bitcoin" => "Bitcoin",
      "ethereum" => "Ethereum",
      "binancecoin" => "BNB",
      "solana" => "Solana",
      "ripple" => "XRP",
      "cardano" => "Cardano",
      "dogecoin" => "Dogecoin",
      "tron" => "TRON"
    }
    cryptocurrency_map.each do |gecko_id, name|
    begin
      cryptocurrency = Cryptocurrency.find_by(name: name)
      next unless cryptocurrency
      
      queryPrices(cryptocurrency, gecko_id, api_key)
    rescue => e
      Rails.logger.error("Failed to fetch prices for #{name}: #{e.message}")
      next
    end
  
  end

  end

  def queryPrices(cryptocurrency, id, api_key)
    from_timestamp = DateTime.yesterday.midnight.to_time.to_i
    to_timestamp = DateTime.current.midnight.to_time.to_i
    
    url = URI.parse("https://api.coingecko.com/api/v3/coins/#{id}/market_chart/range?vs_currency=usd&from=#{from_timestamp}&to=#{to_timestamp}&precision=2")
    req = Net::HTTP::Get.new(url.to_s)
    req['x-cg-demo-api-key'] = api_key

    res = Net::HTTP.start(url.host, url.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) {|http| # TODO: Fix SSL cert store instead of disabling verification
      http.request(req)
    }
    sleep 0.5
    data=JSON.parse(res.body)

    begin
      data['prices'].each_with_index do |(timestamp, price), index|
        CryptocurrencyPrice.create!(
          cryptocurrency: cryptocurrency,
          price_usd: price,
          market_cap_usd: data['market_caps'][index][1],
          total_volume_usd: data['total_volumes'][index][1],
          created_at: Time.at(timestamp / 1000), 
          updated_at: Time.at(timestamp / 1000)
        )
      end
    rescue => e
      Rails.logger.error("Failed to store for #{cryptocurrency}: #{e.message}")
    end

    
    

  end
end


