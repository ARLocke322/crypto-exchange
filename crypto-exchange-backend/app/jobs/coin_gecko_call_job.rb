require 'net/http'

class CoinGeckoCallJob < ApplicationJob
  queue_as :default
 

  def perform(*args)
    # Do something later
    # 
    api_key = ENV['COINGECKO_API_KEY']
    cryptocurrencies = [
      "bitcoin", 
      "ethereum", 
      "binancecoin", 
      "solana",
      "ripple",
      "cardano",
      "dogecoin",
      "tron",
    ]
    cryptocurrencies.each do |id|
      
      url = URI.parse("https://api.coingecko.com/api/v3/coins/#{id}")
      req = Net::HTTP::Get.new(url.to_s)
      req['x-cg-demo-api-key'] = api_key

      res = Net::HTTP.start(url.host, url.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) {|http|
        http.request(req)
      }
      sleep 0.5
      data=JSON.parse(res.body)

      cryptocurrency = Cryptocurrency.create!(
        name: data['name'],
        abbreviation: data['symbol'],
        image: data['image']['small']
      )
      queryPrices(cryptocurrency, id, api_key)


    end

  end

  def queryPrices(cryptocurrency, id, api_key)
    from_timestamp = 1759100400
    to_timestamp = 1761696000
    
    url = URI.parse("https://api.coingecko.com/api/v3/coins/#{id}/market_chart/range?vs_currency=usd&from=#{from_timestamp}&to=#{to_timestamp}&precision=2")
    req = Net::HTTP::Get.new(url.to_s)
    req['x-cg-demo-api-key'] = api_key

    res = Net::HTTP.start(url.host, url.port, use_ssl: true, verify_mode: OpenSSL::SSL::VERIFY_NONE) {|http|
      http.request(req)
    }
    sleep 0.5
    data=JSON.parse(res.body)

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
    

  end
end


