
import {
    Card,
} from "@/components/ui/card"
import { useState } from "react";
import type { CryptocurrencyData, PortfolioData } from "@/types"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod";

import tradesService from '../../services/trades'
import type { AxiosError } from "axios"
import usePortfolioStore from "@/hooks/usePortfolioStore"
import useTransactionsStore from "@/hooks/useTransactionsStore"

import { createTradeSchema, type TradeSchemaData } from "@/types/tradeSchema"
import { useTradeCalculations } from "@/hooks/useTradeCalculations"
import TradeFormHeader from "./TradeFormHeader";
import TradeFormBody from "./TradeFormBody";
import TradeFormFooter from "./TradeFormFooter";

const TradeForm = ({ cryptocurrencies, portfolio, onSuccess }: { cryptocurrencies: CryptocurrencyData[], portfolio: PortfolioData, onSuccess: ()=>void}) => {
    const [tradeError, setTradeError] = useState<string | null>(null);
    
    const form = useForm<TradeSchemaData>({
        resolver: zodResolver(createTradeSchema(cryptocurrencies, portfolio)) ,
        mode: "onSubmit",
        defaultValues: { cryptocurrency_id: '', crypto_amount: 0, transaction_type: 'buy' }
    })

    const { priceMessage, balanceMessage } = useTradeCalculations(form.watch() as TradeSchemaData, portfolio, cryptocurrencies)

    const onSubmit = async (data: TradeSchemaData) => {
        try {
            setTradeError(null);
            await tradesService.postTrade(portfolio.wallet.id, data.transaction_type, parseInt(data.cryptocurrency_id), data.crypto_amount);
            usePortfolioStore.getState().fetchPortfolio();
            useTransactionsStore.getState().fetchTransactions();
            onSuccess()
        } catch (e) {
            const error = e as AxiosError<{ error: string }>
            setTradeError(error.response?.data?.error || "Invalid Trade")
        }
    };


    return (
        <Card className="w-full sm:max-w-md">
            <TradeFormHeader />
            <TradeFormBody
                form={form}
                usd_amount={portfolio.wallet.usd_amount}
                cryptocurrencies={cryptocurrencies}
                priceMessage={priceMessage}
                balanceMessage={balanceMessage}
                onSubmit={onSubmit}

            />
            <TradeFormFooter tradeError={tradeError} onReset={() => form.reset()} />

        </Card>
    )
}

export default TradeForm