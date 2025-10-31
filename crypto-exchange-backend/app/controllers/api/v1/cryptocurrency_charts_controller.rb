class Api::V1::CryptocurrencyChartsController < ::ApplicationController
  skip_before_action :authenticate_user!, only: [:show], :raise => false

  def show
    @cryptocurrency_prices = CryptocurrencyPrice.where(cryptocurrency_id: params[:cryptocurrency_id]).order(created_at: :asc)

    period = params[:period]
    
    if period == 'day'
      interval, start_time = 15.minutes, Time.current.days_ago(1).midnight 
    elsif period == 'week'
      interval, start_time = 2.hours, Time.current.days_ago(7).midnight
    elsif period == 'month'
      interval, start_time = 8.hours, Time.current.days_ago(30).midnight
    else 
      render json: { error: 'Invalid time period' }, status: :bad_request
      return
    end
    price_data =getPriceData(interval, start_time)

    first_price = price_data.first[:price_usd]
    puts first_price
    last_price = price_data.last[:price_usd]
    puts last_price
    price_change = ((last_price - first_price) / first_price * 100).round(2)

    render json: {price_change: , price_history: price_data}, status: :ok
    
  end
  private

    def getPriceData(interval, start_time)
      end_time = Time.current.midnight
      chart_data = []
      
      current_interval_start = start_time
      
      while current_interval_start < end_time
        current_interval_end = current_interval_start + interval
        
        # Find first price in this interval
        price_in_interval = @cryptocurrency_prices.find { |p| 
          p.created_at >= current_interval_start && p.created_at < current_interval_end 
        }
        
        chart_data << {
          timestamp: current_interval_start,
          price_usd: price_in_interval.price_usd
        } if price_in_interval

        current_interval_start = current_interval_end
      end
      
      chart_data
    end
  

end