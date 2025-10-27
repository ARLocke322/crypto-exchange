
export interface User {
    email: string
    username: string
}

export interface Holding {
    id: number
    crypto_amount: number
    cryptocurrency:{
        id: number
        name: string
        abbreviation: string
        current_price_usd: number
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
    price_usd: number
}