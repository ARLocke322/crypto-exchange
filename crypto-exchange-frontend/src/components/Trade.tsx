import { Button } from "@/components/ui/button"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import type { CryptocurrencyData } from "@/types"

import { Controller, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import tradesService from '../services/trades'
import type { AxiosError } from "axios"
import usePortfolioStore from "@/hooks/usePortfolioStore"
import { Loading } from "./Loading"

const Trade = ({ cryptocurrencies }: { cryptocurrencies: CryptocurrencyData[] }) => {
    const portfolio = usePortfolioStore((state) => state.currentPortfolio)
    if (!portfolio) return <Loading />

    const tradeSchema = z
        .object({
            cryptocurrency_id: z
                .enum(cryptocurrencies.map((cryptocurrency) => cryptocurrency.id.toString())),
            crypto_amount: z
                .coerce
                .number()
                .min(0),
            transaction_type: z.enum(['buy', 'sell'])
        })
        .refine((data) => {
            console.log(data.cryptocurrency_id)
            console.log(portfolio.holdings)
            const cryptoSelected = cryptocurrencies.find(cryptocurrency => cryptocurrency.id === parseInt(data.cryptocurrency_id))
            const cryptoHeld = portfolio.holdings.find(holding => holding.cryptocurrency.id === parseInt(data.cryptocurrency_id))
            if (!cryptoSelected) return false
            if (data.transaction_type === 'buy') {

                const currentBalance = portfolio.wallet.usd_amount
                const cryptoPrice = cryptoSelected?.price_usd

                return data.crypto_amount * cryptoPrice <= currentBalance
            } else {
                
                if (!cryptoHeld) return false
                const cryptoAmount = cryptoHeld?.crypto_amount
                return data.crypto_amount <= cryptoAmount
            }
        }, {
            message: "Insufficient balance",
            path: ["crypto_amount"],
        });

    type TradeSchemaData = z.infer<typeof tradeSchema>;

    const [tradeError, setTradeError] = useState<string | null>(null);
    const navigate = useNavigate()

    const form = useForm<TradeSchemaData>({
        resolver: zodResolver(tradeSchema),
        mode: "onSubmit",
        defaultValues: { cryptocurrency_id: '', crypto_amount: 0, transaction_type: 'buy' }
    });

    const watchedValues = form.watch()

    const onSubmit = async (data: TradeSchemaData) => {

        try {
            setTradeError(null);
            await tradesService.postTrade(portfolio.wallet.id, data.transaction_type, parseInt(data.cryptocurrency_id), data.crypto_amount);
            usePortfolioStore.getState().fetchPortfolio();
            navigate('/portfolio')
        } catch (e) {
            const error = e as AxiosError<{ error: string }>
            setTradeError(error.response?.data?.error || "Invalid Trade")
        }
    };

    const getTradeMessages = () => {
        const selectedCrypto = cryptocurrencies.find(c => c.id === Number(watchedValues.cryptocurrency_id))
        const calculatedPrice = selectedCrypto !== undefined ? watchedValues.crypto_amount * selectedCrypto.price_usd : null
        let priceMessage, balanceMessage
        if (calculatedPrice !== null) {
            priceMessage = `Price: $${calculatedPrice.toFixed(2)}`
            const newWalletBalance = watchedValues.transaction_type === 'buy'
                ? (Number(portfolio.wallet.usd_amount) - calculatedPrice).toFixed(2)
                : (Number(portfolio.wallet.usd_amount) + calculatedPrice).toFixed(2)
            balanceMessage = `New Wallet Balance: $${newWalletBalance}`
        } else {
            priceMessage = ''
            balanceMessage = ''
        }
        return { priceMessage, balanceMessage }
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Execute Trade</CardTitle>
                <CardDescription>
                    Trade to and from various cryptocurrencies.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="trade-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="transaction_type"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                return (
                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        defaultValue="buy">
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
                        <Controller
                            name="cryptocurrency_id"
                            control={form.control}
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

                        <Controller
                            name="crypto_amount"
                            control={form.control}
                            render={({ field, fieldState }) => {
                                const { priceMessage, balanceMessage } = getTradeMessages()


                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Amount</FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-crypto-amount"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <FieldDescription>
                                            Current Wallet Balance: ${portfolio.wallet.usd_amount}
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
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    {tradeError && <div>{tradeError}</div>}
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="trade-form">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}



export default Trade