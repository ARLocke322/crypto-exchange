import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, ActivityIcon, DollarSignIcon, BarChart3Icon } from "lucide-react"

// Mock data
const portfolioValue = 124567.89
const dayChange = 3.24
const dayChangeAmount = 3912.45

const cryptoAssets = [
  { symbol: "BTC", name: "Bitcoin", amount: 2.5, value: 87500, change: 5.2, price: 35000 },
  { symbol: "ETH", name: "Ethereum", amount: 15.3, value: 28050, change: -2.1, price: 1833.33 },
  { symbol: "SOL", name: "Solana", amount: 250, value: 6250, change: 8.7, price: 25 },
  { symbol: "USDT", name: "Tether", amount: 2767.89, value: 2767.89, change: 0.01, price: 1 },
]

const recentTrades = [
  { type: "buy", symbol: "BTC", amount: 0.5, price: 34800, time: "2m ago" },
  { type: "sell", symbol: "ETH", amount: 2.1, price: 1845, time: "15m ago" },
  { type: "buy", symbol: "SOL", amount: 50, price: 24.5, time: "1h ago" },
]

export default function Dashboard() {
  return (
    <div className="w-full max-w-none space-y-6">
      {/* Portfolio Overview */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              {dayChange >= 0 ? (
                <ArrowUpIcon className="h-3 w-3 text-chart-4" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 text-destructive" />
              )}
              <span className={dayChange >= 0 ? "text-chart-4" : "text-destructive"}>
                {dayChange >= 0 ? "+" : ""}
                {dayChange}% (${dayChangeAmount.toLocaleString()})
              </span>
              <span className="text-muted-foreground">today</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground mt-1">Across 12 trades</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Performer</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">SOL</div>
            <p className="text-xs text-chart-4 mt-1">+8.7% today</p>
          </CardContent>
        </Card>
      </div>

      {/* Price Chart Mock */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3Icon className="h-5 w-5" />
            Portfolio Performance (7D)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full relative">
            {/* Mock chart using SVG */}
            <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="50" x2="800" y2="50" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="100" x2="800" y2="100" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
              <line x1="0" y1="150" x2="800" y2="150" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />

              {/* Area fill */}
              <path
                d="M 0 120 L 100 110 L 200 130 L 300 100 L 400 90 L 500 105 L 600 80 L 700 70 L 800 60 L 800 200 L 0 200 Z"
                fill="hsl(var(--chart-1))"
                opacity="0.2"
              />

              {/* Line */}
              <path
                d="M 0 120 L 100 110 L 200 130 L 300 100 L 400 90 L 500 105 L 600 80 L 700 70 L 800 60"
                fill="none"
                stroke="hsl(var(--chart-1))"
                strokeWidth="2"
              />

              {/* Data points */}
              {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((x, i) => {
                const y = [120, 110, 130, 100, 90, 105, 80, 70, 60][i]
                return <circle key={i} cx={x} cy={y} r="3" fill="hsl(var(--chart-1))" />
              })}
            </svg>
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            <span>7 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

      {/* Assets and Trades Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full">
        {/* Holdings */}
        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cryptoAssets.map((asset) => (
                <div key={asset.symbol} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-mono font-bold text-sm">
                      {asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium">{asset.symbol}</div>
                      <div className="text-xs text-muted-foreground">
                        {asset.amount} {asset.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${asset.value.toLocaleString()}</div>
                    <div
                      className={`text-xs flex items-center justify-end gap-1 ${
                        asset.change >= 0 ? "text-chart-4" : "text-destructive"
                      }`}
                    >
                      {asset.change >= 0 ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
                      {Math.abs(asset.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTrades.map((trade, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-medium ${
                        trade.type === "buy" ? "bg-chart-4/20 text-chart-4" : "bg-destructive/20 text-destructive"
                      }`}
                    >
                      {trade.type.toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{trade.symbol}</div>
                      <div className="text-xs text-muted-foreground">{trade.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      {trade.amount} {trade.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">@ ${trade.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Overview */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cryptoAssets.map((asset) => (
              <div key={asset.symbol} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{asset.symbol}</span>
                  <span className={`text-xs ${asset.change >= 0 ? "text-chart-4" : "text-destructive"}`}>
                    {asset.change >= 0 ? "+" : ""}
                    {asset.change}%
                  </span>
                </div>
                <div className="text-lg font-bold">${asset.price.toLocaleString()}</div>
                {/* Mini sparkline */}
                <div className="h-8 w-full">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <path
                      d={`M 0 ${15 + Math.random() * 10} L 20 ${10 + Math.random() * 10} L 40 ${12 + Math.random() * 10} L 60 ${8 + Math.random() * 10} L 80 ${5 + Math.random() * 10} L 100 ${asset.change >= 0 ? 5 : 20}`}
                      fill="none"
                      stroke={asset.change >= 0 ? "hsl(var(--chart-4))" : "hsl(var(--destructive))"}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
