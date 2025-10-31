
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { TrendingUp, TrendingDown, Equal } from 'lucide-react';
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import usePortfolioStore from "@/hooks/usePortfolioStore"
import { Loading } from "./Loading"
import { useState } from "react"
import TradeContainer from './TradeForm'
import type { CryptocurrencyData, Holding, PortfolioData } from "@/types"
import { formatPrice } from "@/utils/formatPrice";
import CryptocurrencyDetail from "./CryptocurrencyDetail";

const Portfolio = ({ cryptocurrencies }: { cryptocurrencies: CryptocurrencyData[] }) => {
  const [tradeActive, setTradeActive] = useState<boolean>(false)
  const portfolio = usePortfolioStore((state) => state.currentPortfolio)
  const [cryptocurrencyDetailSelected, setCryptocurrencyDetailSelected] = useState<CryptocurrencyData | null>()
  if (!portfolio) return <Loading />

  const getPortfolioPercentageChangeText = (portfolio: PortfolioData) => {
    const totalValue = portfolio.holdings.reduce((a, c) =>
      a + (c.crypto_amount * c.cryptocurrency.current_price_usd), 0)

    const weightedPL = portfolio.holdings.reduce((a, c) => {
      const holdingValue = c.crypto_amount * c.cryptocurrency.current_price_usd
      return a + (holdingValue * c.cryptocurrency.value_percentage_change)
    }, 0)

    const percentageChange = (weightedPL / totalValue)
    const dollarAmount = totalValue * (percentageChange / 100)

    if (percentageChange > 0) {
      return <span className="flex items-center gap-1 text-green-500"><TrendingUp />{percentageChange.toFixed(2)}% (+${dollarAmount.toFixed(2)})</span>
    } else if (percentageChange < 0) {
      return <span className="flex items-center gap-1 text-red-500"><TrendingDown />{percentageChange.toFixed(2)}% (-${Math.abs(dollarAmount).toFixed(2)})</span>
    } else {
      return <span className="flex items-center gap-1 text-gray-500"><Equal />{percentageChange.toFixed(2)}%</span>
    }
  }

  const getPercentageChangeText = (holding: Holding) => {
    const percentageChange = holding.cryptocurrency.value_percentage_change
    if (percentageChange > 0) {
      return <span className="flex items-center gap-1 text-green-500"><TrendingUp />{percentageChange}%</span>
    } else if (percentageChange < 0) {
      return <span className="flex items-center gap-1 text-red-500"><TrendingDown />{percentageChange}%</span>
    } else {
      return <span className="flex items-center gap-1 text-gray-500"><Equal />{percentageChange}%</span>
    }
  }

  portfolio.holdings.sort((a, b) => (b.crypto_amount * b.cryptocurrency.current_price_usd) - (a.crypto_amount * a.cryptocurrency.current_price_usd))
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Card className="flex flex-row">
          <CardContent>
            <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
            <div className="text-2xl font-bold">
              ${formatPrice(portfolio.holdings.reduce((a, c) => a + (c.cryptocurrency.current_price_usd * c.crypto_amount), 0))}
            </div>
            <div>
              {getPortfolioPercentageChangeText(portfolio)}
            </div>
          </CardContent>
          <CardContent>
            <div className="text-sm text-muted-foreground"></div>
          </CardContent>
          <CardContent>
            <div className="text-sm text-muted-foreground">Wallet Balance</div>
            <div className="text-2xl font-bold">
              ${formatPrice(portfolio.wallet.usd_amount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <Table className="table-auto">
            <TableCaption>Your Cryptocurrency holdings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left"></TableHead>
                <TableHead className="w-[100px] text-muted-foreground">Abbreviation</TableHead>
                <TableHead className="text-right text-muted-foreground">Amount</TableHead>
                <TableHead className="text-right text-muted-foreground">Value</TableHead>
                <TableHead className="text-right text-muted-foreground">Current price</TableHead>
                <TableHead className="text-right text-muted-foreground">P/L</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.holdings.map((holding) => (
                <TableRow onClick={() => setCryptocurrencyDetailSelected(cryptocurrencies.find((c) => c.id === holding.cryptocurrency.id))} key={holding.id}>
                  <TableCell >
                    <Avatar>
                      <AvatarImage src={holding.cryptocurrency.image} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{holding.cryptocurrency.abbreviation.toUpperCase()}</TableCell>
                  <TableCell className="text-right">{formatPrice(holding.crypto_amount)}</TableCell>
                  <TableCell className="text-right">${formatPrice(holding.cryptocurrency.current_price_usd * holding.crypto_amount)}</TableCell>                  <TableCell className="text-right">${formatPrice(holding.cryptocurrency.current_price_usd)}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-1">{getPercentageChangeText(holding)}</TableCell>
                  <TableCell className="text-right"><Button size="sm" onClick={(e) => {
                    e.stopPropagation()
                    setTradeActive(true)
                    setCryptocurrencyDetailSelected(null)
                  }}>Trade</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

      </div>
      {tradeActive && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setTradeActive(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setTradeActive(false)}>
            <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <TradeContainer cryptocurrencies={cryptocurrencies} onSuccess={() => setTradeActive(false)} />
            </div>
          </div>
        </>
      )}
      {cryptocurrencyDetailSelected && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setCryptocurrencyDetailSelected(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setCryptocurrencyDetailSelected(null)}>
            <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <CryptocurrencyDetail cryptocurrency={cryptocurrencyDetailSelected} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Portfolio
