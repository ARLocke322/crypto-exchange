import type { CryptocurrencyData, PortfolioData } from "@/types";
import { validateTradeBalance } from "@/utils/validateTradeBalance";
import { z } from "zod";

export const createTradeSchema = (cryptocurrencies: CryptocurrencyData[], portfolio: PortfolioData) =>
    z.object({
        cryptocurrency_id: z.enum(cryptocurrencies.map((cryptocurrency) => cryptocurrency.id.toString())),
        crypto_amount: z.coerce.number<number>().min(0),
        transaction_type: z.enum(['buy', 'sell'])
    }).refine(data => validateTradeBalance(data, portfolio, cryptocurrencies), {
        message: "Insufficient balance",
        path: ["crypto_amount"]
    })

export type TradeSchemaData = {
  cryptocurrency_id: string;
  crypto_amount: number;
  transaction_type: 'buy' | 'sell';
}