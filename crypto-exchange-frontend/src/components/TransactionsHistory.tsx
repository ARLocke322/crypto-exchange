
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import type { CryptocurrencyData } from "@/types"

const TransactionsHistory = (
  { cryptocurrency = null, count = 0 }
    : { cryptocurrency: CryptocurrencyData | null, count: number }
) => {
  const transactions = useTransactionsStore((state) => state.currentTransactions)

  if (!transactions) return <Loading />
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  let filteredTransactions
  if (cryptocurrency) {
    filteredTransactions = sortedTransactions
      .filter(transaction =>
        transaction.cryptocurrency.id === cryptocurrency.id)
      .slice(0, count)
  } else {
    filteredTransactions = sortedTransactions
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Card>
          <Table className="table-auto">
            <TableCaption>Your Transaction History.</TableCaption>
            <TableHeader>
              <TableRow>
                {!cryptocurrency && <TableHead className="text-left"></TableHead>}
                <TableHead className="w-[100px] text-muted-foreground">Type</TableHead>
                {!cryptocurrency && <TableHead className="w-[100px] text-muted-foreground">Cryptocurrency</TableHead>}
                <TableHead className="w-[100px] text-muted-foreground">Date</TableHead>
                <TableHead className="text-right text-muted-foreground">Amount</TableHead>
                <TableHead className="text-right text-muted-foreground">Value</TableHead>
                {!cryptocurrency && <TableHead className="text-right text-muted-foreground">Price</TableHead>}

              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  {!cryptocurrency && <TableCell >
                    <Avatar>
                      <AvatarImage src={transaction.cryptocurrency.image} />
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                  </TableCell>
                  }
                  <TableCell className="font-medium">{transaction.transaction_type.toUpperCase()}</TableCell>
                  {!cryptocurrency && <TableCell className="font-medium">{transaction.cryptocurrency.abbreviation.toUpperCase()}</TableCell>}
                  <TableCell className="font-medium">{new Date(transaction.created_at).toLocaleDateString('en-CA')}</TableCell>
                  <TableCell className="text-right">{transaction.crypto_amount}</TableCell>
                  <TableCell className="text-right">${transaction.usd_amount}</TableCell>
                  {!cryptocurrency && <TableCell className="text-right">${transaction.price_per_unit}</TableCell>}

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
