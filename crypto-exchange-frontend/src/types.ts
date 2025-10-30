
export interface User {
    email: string
    username: string
}

export interface Holding {
    id: number
    crypto_amount: number
    cryptocurrency: {
        id: number
        name: string
        abbreviation: string
        image: string
        current_price_usd: number
        value_percentage_change: number

    }
}

export interface PortfolioData {
    wallet: {
        id: number
        usd_amount: number
    }
    holdings: Holding[]
}


export interface CryptocurrencyData {
    id: number
    name: string
    abbreviation: string
    image: string
    price_usd: number
}

interface TransactionCryptocurrency {
    id: number
    name: string
    abbreviation: string
    image: string
}

export interface TransactionData {
    id: number
    transaction_type: string
    crypto_amount: number
    price_per_unit: number
    usd_amount: number
    cryptocurrency: TransactionCryptocurrency
    created_at: Date
}
