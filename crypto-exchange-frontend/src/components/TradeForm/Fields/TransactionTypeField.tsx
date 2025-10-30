import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { TradeSchemaData } from "@/types/tradeSchema"
import { Controller, type Control } from "react-hook-form"

type TransactionTypeFieldProps = {
  control: Control<TradeSchemaData>
}

const TransactionTypeField = ({ control }: TransactionTypeFieldProps) =>
    <Controller
        name="transaction_type"
        control={control}
        render={({ field }) => {
            return (
                <RadioGroup value={field.value} onValueChange={field.onChange} defaultValue="buy">
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="buy" id="r1" />
                        <Label htmlFor="r1">Buy</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="sell" id="r2" />
                        <Label htmlFor="r2">Sell</Label>
                    </div>
                </RadioGroup>
            )
        }}
    />

export default TransactionTypeField



