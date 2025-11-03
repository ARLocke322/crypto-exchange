import type { PortfolioData, Holding } from "../types"
import { TrendingUp, TrendingDown, Equal } from 'lucide-react';
import { formatPrice } from "./formatPrice"

export const getPortfolioValue = (portfolio: PortfolioData) => {
  const totalValue = portfolio.holdings.reduce((a, c) =>
    a + (c.cryptocurrency.current_price_usd * c.crypto_amount), 0
  )
  return formatPrice(totalValue)
}

export const getPortfolioPercentageChangeText = (portfolio: PortfolioData) => {
  const totalValue = portfolio.holdings.reduce((a, c) =>
    a + (c.crypto_amount * c.cryptocurrency.current_price_usd), 0)

  const weightedPL = portfolio.holdings.reduce((a, c) => {
    const holdingValue = c.crypto_amount * c.cryptocurrency.current_price_usd
    return a + (holdingValue * c.cryptocurrency.value_percentage_change)
  }, 0)

  const percentageChange = (weightedPL / totalValue)
  const dollarAmount = totalValue * (percentageChange / 100)

  if (percentageChange > 0) {
    return <span className="flex items-center gap-1 text-green-500" > <TrendingUp />{percentageChange.toFixed(2)}% (+${dollarAmount.toFixed(2)})</span >
  } else if (percentageChange < 0) {
    return <span className="flex items-center gap-1 text-red-500" > <TrendingDown />{percentageChange.toFixed(2)}% (-${Math.abs(dollarAmount).toFixed(2)})</span >
  } else {
    return <span className="flex items-center gap-1 text-gray-500" > <Equal />{percentageChange.toFixed(2)}%</span >
  }
}

export const getPercentageChangeText = (holding: Holding) => {
  const percentageChange = holding.cryptocurrency.value_percentage_change
  if (percentageChange > 0) {
    return <span className="flex items-center gap-1 text-green-500" > <TrendingUp />{percentageChange}%</span >
  } else if (percentageChange < 0) {
    return <span className="flex items-center gap-1 text-red-500" > <TrendingDown />{percentageChange}%</span >
  } else {
    return <span className="flex items-center gap-1 text-gray-500" > <Equal />{percentageChange}%</span >
  }
}
