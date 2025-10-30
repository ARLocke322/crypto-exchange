import type { CryptocurrencyData, PortfolioData } from "@/types"
import type { TradeSchemaData } from "@/types/tradeSchema"


export const validateTradeBalance = (data: TradeSchemaData, portfolio: PortfolioData, cryptocurrencies: CryptocurrencyData[]) => {
    const crypto = cryptocurrencies.find(c => c.id === parseInt(data.cryptocurrency_id))
    if (!crypto || !portfolio) return false

    if (data.transaction_type === 'buy') {
        return data.crypto_amount * crypto.price_usd <= portfolio.wallet.usd_amount
    }

    const holding = portfolio.holdings.find(h => h.cryptocurrency.id === parseInt(data.cryptocurrency_id))
    return holding && data.crypto_amount <= holding.crypto_amount
}