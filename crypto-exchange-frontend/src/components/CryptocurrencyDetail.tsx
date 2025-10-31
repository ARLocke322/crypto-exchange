import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "./ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import cryptocurrencyService from '../services/cryptocurrencies'
import type { PricePoint, CryptocurrencyData, ChartData } from "@/types"
import { useState } from "react"
import CryptocurrencyGraph from "./CryptocurrencyGraph"
import { Equal, TrendingDown, TrendingUp, AppWindowIcon, CodeIcon } from "lucide-react"
import { Loading } from "./Loading"
import { Avatar, AvatarImage } from "./ui/avatar"
import { AvatarFallback } from "@radix-ui/react-avatar"
import { Button } from "./ui/button"
import { formatPrice } from "../utils/formatPrice"
const CryptocurrencyDetail = ({ cryptocurrency }: { cryptocurrency: CryptocurrencyData }) => {
  const [chartData, setChartData] = useState<ChartData>()
  const fetchGraphDataPoints = async (period: string) => {
    try {
      const dataPoints = await cryptocurrencyService.getChart(cryptocurrency.id, period)
      setChartData(dataPoints)
    } catch (err) {
      console.error('Failed to load data points:', err)
    }
  }
  if (!chartData) {
    fetchGraphDataPoints('day')
    return <Loading />
  }
  const getPercentageChangeText = (percentageChange: number) => {
    if (percentageChange > 0) {
      return <span className="flex items-center gap-1 text-green-500"><TrendingUp />{percentageChange}%</span>
    } else if (percentageChange < 0) {
      return <span className="flex items-center gap-1 text-red-500"><TrendingDown />{percentageChange}%</span>
    } else {
      return <span className="flex items-center gap-1 text-gray-500"><Equal />{percentageChange}%</span>
    }
  }

  return (


    <Card className="w-full sm:max-w-md p-4">
      <Card className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold">{cryptocurrency.abbreviation.toUpperCase()} · {cryptocurrency.name}</h2>
          <h2 className="text-2xl font-bold">${formatPrice(cryptocurrency.price_usd)}</h2>
          <div className="text-sm">{getPercentageChangeText(chartData.price_change)}</div>
        </div>
        <Avatar className="rounded-lg h-16 w-16">
          <AvatarImage src={cryptocurrency.image} />
          <AvatarFallback>{cryptocurrency.abbreviation.toUpperCase()}</AvatarFallback>
        </Avatar>
      </Card>
      <Tabs onValueChange={(value) => fetchGraphDataPoints(value)} defaultValue='day' >
        <TabsList>
          <TabsTrigger value='day'>Day</TabsTrigger>
          <TabsTrigger value='week'>Week</TabsTrigger>
          <TabsTrigger value='month'>Month</TabsTrigger>
        </TabsList>
        <TabsContent value='day'>
          <CryptocurrencyGraph pricePoints={chartData.price_history} />
        </TabsContent>
        <TabsContent value='week'>
          <CryptocurrencyGraph pricePoints={chartData.price_history} />
        </TabsContent>
        <TabsContent value='month'>
          <CryptocurrencyGraph pricePoints={chartData.price_history} />
        </TabsContent>
      </Tabs>
      <Card className="flex flex-row items-center gap-2 p-1">
        <Button size="sm" className="flex-1">Trade</Button>
      </Card>
    </Card>

  )
}

export default CryptocurrencyDetail
