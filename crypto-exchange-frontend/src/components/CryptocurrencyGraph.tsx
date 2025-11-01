import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"


import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { PricePoint } from "@/types"

const CryptocurrencyGraph = ({ pricePoints }: { pricePoints: PricePoint[] }) => {
  const chartConfig = {
    price_usd: {
      label: "Price",
      color: "var(--chart-1)",
    },
    timestamp: {
      label: "Time",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig
  console.log(pricePoints)
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={pricePoints}
            margin={{
              left: 12,
              right: 12,

            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tick={false}
              tickMargin={8}
            />
            <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={(value) => new Date(value).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
              />}
            />
            <Line
              dataKey="price_usd"
              type="linear"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default CryptocurrencyGraph
