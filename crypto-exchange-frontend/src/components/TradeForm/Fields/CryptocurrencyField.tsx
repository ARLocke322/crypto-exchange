import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CryptocurrencyData } from "@/types";
import type { TradeSchemaData } from "@/types/tradeSchema";
import { Controller, type Control } from "react-hook-form";

type CryptocurrencyFieldProps = {
  cryptocurrencies: CryptocurrencyData[]
  control: Control<TradeSchemaData>
}

const CryptocurrencyField = ({ cryptocurrencies, control }: CryptocurrencyFieldProps) => (
    <Controller
        name="cryptocurrency_id"
        control={control}
        render={({ field, fieldState }) => {
            const selectedCrypto = cryptocurrencies.find(c => c.id === Number(field.value));
            return (
                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                    <FieldContent>
                        <FieldLabel>Cryptocurrency</FieldLabel>
                    </FieldContent>
                    <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                    >
                        <SelectTrigger
                            id="select-cryptocurrency"
                            aria-invalid={fieldState.invalid}
                            className="min-w-[120px]"
                        >
                            <SelectValue placeholder="Choose cryptocurrency" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                            {cryptocurrencies.map((cryptocurrency: CryptocurrencyData) =>
                                <SelectItem key={cryptocurrency.id} value={cryptocurrency.id.toString()}>{cryptocurrency.name}</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                    <FieldContent>
                        {selectedCrypto
                            ? <FieldDescription>Price: ${selectedCrypto.price_usd}</FieldDescription>
                            : <FieldDescription>Select cryptocurrency to trade.</FieldDescription>
                        }
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </FieldContent>
                </Field>
            )
        }}
    />
)

export default CryptocurrencyField