import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import type { TradeSchemaData } from "@/types/tradeSchema"
import { Controller, type Control } from "react-hook-form"

type CryptocurrencyAmountFieldProps = {
    control: Control<TradeSchemaData>
    usd_amount: number
    priceMessage: string
    balanceMessage: string
}

const CryptocurrencyAmountField = (
    { control, usd_amount, priceMessage, balanceMessage }: CryptocurrencyAmountFieldProps) =>
    <Controller
        name="crypto_amount"
        control={control}
        render={({ field, fieldState }) => {
            return (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Amount</FieldLabel>
                    <Input
                        {...field}
                        id="form-crypto-amount"
                        aria-invalid={fieldState.invalid}
                        value={String(field.value)}
                    />
                    <FieldDescription>
                        Current Wallet Balance: ${usd_amount}
                        <br />
                        {priceMessage}
                        <br />
                        {balanceMessage}
                    </FieldDescription>
                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                </Field>
            )
        }}
    />


export default CryptocurrencyAmountField