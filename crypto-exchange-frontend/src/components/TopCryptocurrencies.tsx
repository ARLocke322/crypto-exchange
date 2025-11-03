import { formatPrice } from "@/utils/formatPrice"
import type { CryptocurrencyData } from "../types"
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
import { Card } from "./ui/card"

type CryptoProps = {
  cryptocurrencies: CryptocurrencyData[]
}

const TopCryptocurrencies = ({ cryptocurrencies }: CryptoProps) => {
  const filteredCryptocurrencies = [...cryptocurrencies]
    .sort((a, b) => b.price_usd - a.price_usd)
    .slice(0, 5)
  return (
    <Card>
      <Table className="table-auto">
        <TableCaption>Top Cryptocurrencies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left"></TableHead>
            <TableHead className="w-[100px] text-muted-foreground">Abbreviation</TableHead>
            <TableHead className="text-right text-muted-foreground">Current price</TableHead>
            <TableHead className="text-right text-muted-foreground">P/L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCryptocurrencies.map((cryptocurrency) => (
            <TableRow>
              <TableCell >
                <Avatar>
                  <AvatarImage src={cryptocurrency.image} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{cryptocurrency.abbreviation.toUpperCase()}</TableCell>
              <TableCell className="text-right">${formatPrice(cryptocurrency.price_usd)}</TableCell>
              <TableCell className="text-right flex items-center justify-end gap-1">^5%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default TopCryptocurrencies
