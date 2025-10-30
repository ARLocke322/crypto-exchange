import type { CryptocurrencyData } from "@/types"
import { Loading } from "../Loading"
import usePortfolioStore from "@/hooks/usePortfolioStore"
import TradeForm from "./TradeForm"


const TradeContainer = ({ cryptocurrencies, onSuccess }: {cryptocurrencies: CryptocurrencyData[], onSuccess: () => void }) => {
    const portfolio = usePortfolioStore(state => state.currentPortfolio)

    if (!portfolio) return <Loading />

    return <TradeForm cryptocurrencies={cryptocurrencies} portfolio={portfolio} onSuccess={onSuccess} />
}

export default TradeContainer 