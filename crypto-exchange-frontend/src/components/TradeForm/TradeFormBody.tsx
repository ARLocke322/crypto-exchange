import {
    CardContent
} from "@/components/ui/card"
import { FieldGroup } from "../ui/field"
import TransactionTypeField from "./Fields/TransactionTypeField"
import CryptocurrencyField from "./Fields/CryptocurrencyField"
import CryptocurrencyAmountField from "./Fields/CryptocurrencyAmountField"
import type { CryptocurrencyData } from "@/types"
import type { UseFormReturn } from "react-hook-form"
import type { TradeSchemaData } from "@/types/tradeSchema"

type TradeFormBodyProps = {
    form: UseFormReturn<TradeSchemaData>
    usd_amount: number
    cryptocurrencies: CryptocurrencyData[]
    priceMessage: string
    balanceMessage: string
    onSubmit: (data: TradeSchemaData) => void | Promise<void>
}

const TradeFormBody = (
    { form, usd_amount, cryptocurrencies, priceMessage, balanceMessage, onSubmit }: TradeFormBodyProps) =>

    <CardContent>
        <form id="trade-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <TransactionTypeField
                    control={form.control} />
                <CryptocurrencyField
                    control={form.control} cryptocurrencies={cryptocurrencies} />
                <CryptocurrencyAmountField
                    control={form.control}
                    usd_amount={usd_amount}
                    priceMessage={priceMessage}
                    balanceMessage={balanceMessage} />
            </FieldGroup>
        </form>
    </CardContent>

export default TradeFormBody