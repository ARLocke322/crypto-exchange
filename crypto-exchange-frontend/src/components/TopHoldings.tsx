
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
import { Card } from "./ui/card"
import usePortfolioStore from "@/hooks/usePortfolioStore"
import { Loading } from "./Loading"
import type { Holding } from "@/types"
import { formatPrice } from "@/utils/formatPrice";

const TopHoldings = () => {
  const portfolio = usePortfolioStore(state => state.currentPortfolio)
  if (!portfolio) return <Loading />

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
  const topHoldings = [...portfolio.holdings]
    .sort((a, b) =>
      b.cryptocurrency.current_price_usd * b.crypto_amount
      -
      a.cryptocurrency.current_price_usd * a.crypto_amount
    ).slice(0, 5)
  return (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {topHoldings.map((holding) => (
            <TableRow key={holding.id}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default TopHoldings
