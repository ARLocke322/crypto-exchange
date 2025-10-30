
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "./ui/card"
import useTransactionsStore from "@/hooks/useTransactionsStore"
import { Loading } from "./Loading"

const TransactionsHistory = () => {
    const transactions = useTransactionsStore((state) => state.currentTransactions)

    if (!transactions) return <Loading />

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return (
        <div>
            <div className="flex flex-col gap-4">
                <Card>
                    <Table className="table-auto">
                        <TableCaption>Your Transaction History.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-muted-foreground">Transaction Type</TableHead>
                                <TableHead className="w-[100px] text-muted-foreground">Cryptocurrency</TableHead>
                                <TableHead className="w-[100px] text-muted-foreground">Date</TableHead>
                                <TableHead className="text-right text-muted-foreground">Amount</TableHead>
                                <TableHead className="text-right text-muted-foreground">Value</TableHead>
                                <TableHead className="text-right text-muted-foreground">Price</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                    <TableCell className="font-medium">{transaction.transaction_type}</TableCell>
                                    <TableCell className="font-medium">{transaction.cryptocurrency.abbreviation}</TableCell>
                                    <TableCell className="font-medium">{new Date(transaction.created_at).toLocaleDateString('en-CA')}</TableCell>
                                    <TableCell className="text-right">{transaction.crypto_amount}</TableCell>
                                    <TableCell className="text-right">${transaction.usd_amount}</TableCell>
                                    <TableCell className="text-right">${transaction.price_per_unit}</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>

            </div>
        </div>
    )
}

export default TransactionsHistory