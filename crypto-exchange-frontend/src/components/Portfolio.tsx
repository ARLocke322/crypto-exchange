
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import usePortfolioStore from "@/hooks/usePortfolioStore"
import { Loading } from "./Loading"
import { useState } from "react"
import Trade from "./Trade"
import type { CryptocurrencyData } from "@/types"


const Portfolio = ({ cryptocurrencies }: { cryptocurrencies: CryptocurrencyData[] }) => {
    const [tradeActive, setTradeActive] = useState<boolean>(false)
    const portfolio = usePortfolioStore((state) => state.currentPortfolio)

    if (!portfolio) return <Loading />

    return (
        <div>
            <div className="flex flex-col gap-4">
                <Card className="flex flex-row">
                    <CardContent>
                        <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
                        <div className="text-2xl font-bold">
                            ${portfolio.holdings.reduce((a, c) => a + (c.cryptocurrency.current_price_usd * c.crypto_amount), 0).toFixed(2)}
                        </div>
                    </CardContent>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">Wallet Balance</div>
                        <div className="text-2xl font-bold">
                            ${portfolio.wallet.usd_amount}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <Table className="table-auto">
                        <TableCaption>Your Cryptocurrency holdings.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-muted-foreground">Abbreviation</TableHead>
                                <TableHead className="text-right text-muted-foreground">Amount</TableHead>
                                <TableHead className="text-right text-muted-foreground">Value</TableHead>
                                <TableHead className="text-right text-muted-foreground">Current price</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {portfolio.holdings.map((holding) => (
                                <TableRow key={holding.id}>
                                    <TableCell className="font-medium">{holding.cryptocurrency.abbreviation}</TableCell>
                                    <TableCell className="text-right">{holding.crypto_amount}</TableCell>
                                    <TableCell className="text-right">${(holding.cryptocurrency.current_price_usd * holding.crypto_amount).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${holding.cryptocurrency.current_price_usd}</TableCell>
                                    <TableCell className="text-right"><Button size="sm" onClick={() => setTradeActive(true)}>Trade</Button></TableCell>
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
                            <Trade cryptocurrencies={cryptocurrencies} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Portfolio