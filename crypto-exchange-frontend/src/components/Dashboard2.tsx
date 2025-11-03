import { Button } from "./ui/button"
import TopHoldings from "./TopHoldings"
import usePortfolioStore from "@/hooks/usePortfolioStore"
import { Loading } from "./Loading"
import { getPortfolioValue, getPortfolioPercentageChangeText } from "@/utils/portfolioHelpers"
import TopCryptocurrencies from "./TopCryptocurrencies"
import type { CryptocurrencyData } from "@/types"
import { Card } from "./ui/card"
const Dashboard = ({ cryptocurrencies }: { cryptocurrencies: CryptocurrencyData[] }) => {
  const portfolio = usePortfolioStore(state => state.currentPortfolio)
  if (!portfolio) return <Loading />
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">

      {/* Top row - Portfolio stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-2 text-center">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Portfolio Value</h3>
            <p className="text-2xl font-bold">{getPortfolioValue(portfolio)}</p>
          </div>
        </Card>

        <Card className="p-2 text-center">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Wallet Value</h3>
            <p className="text-2xl font-bold">${portfolio.wallet.usd_amount}</p>
          </div>
        </Card>

        <Card className="p-2 text-center">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">P&L</h3>
            <div className="text-xl font-bold">{getPortfolioPercentageChangeText(portfolio)}</div>
          </div>
        </Card>
      </div>

      {/* Bottom section - Market Trends and Top Holdings */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left side - Top Cryptocurrencies (Market Trends) */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Market Trends</h2>
          <TopCryptocurrencies cryptocurrencies={cryptocurrencies} />
        </Card>

        {/* Right side - Top Holdings (spans 2 columns) */}
        <div className="col-span-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Top Holdings</h2>
            <TopHoldings />
          </Card>
        </div>
      </div>

      {/* Trade button row */}
      <Card className="p-4">
        <Button className="w-full py-3 text-lg font-semibold">
          Trade
        </Button>
      </Card>
    </div>
  )
}

export default Dashboard
