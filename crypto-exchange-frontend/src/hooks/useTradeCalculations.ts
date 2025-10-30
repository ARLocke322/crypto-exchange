import type { CryptocurrencyData, PortfolioData } from "@/types"
import type { TradeSchemaData } from "@/types/tradeSchema"

export const useTradeCalculations = (watchedValues:TradeSchemaData, portfolio:PortfolioData, cryptocurrencies:CryptocurrencyData[]) => {
    const selectedCrypto = cryptocurrencies.find(c => c.id === Number(watchedValues.cryptocurrency_id))
    const calculatedPrice = selectedCrypto ? watchedValues.crypto_amount * selectedCrypto.price_usd : null
    if (!calculatedPrice) return { priceMessage: '', balanceMessage: '' }

    const newBalance = watchedValues.transaction_type === 'buy'
        ? Number(portfolio.wallet.usd_amount) - calculatedPrice
        : Number(portfolio.wallet.usd_amount) + calculatedPrice

    return {
        priceMessage: `Price: $${calculatedPrice.toFixed(2)}`,
        balanceMessage: `New Wallet Balance: $${newBalance.toFixed(2)}`
    }
}