import { persist, createJSONStorage } from "zustand/middleware"
import type { PortfolioData } from "../types"
import { create } from "zustand"
import portfolioService from '../services/portfolio'

type PortfolioStore = {
    currentPortfolio: PortfolioData | null
    fetchPortfolio: () => void
    clearPortfolio: () => void
}

const usePortfolioStore = create<PortfolioStore>()(
    persist(
        (set) => ({
            currentPortfolio: null,
            fetchPortfolio: async () => {
                const portfolio = await portfolioService.getPortfolio()
                return set({ currentPortfolio: portfolio})
            },
            clearPortfolio: () => set({ currentPortfolio: null })
        }),
        {
            name: 'current-portfolio',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default usePortfolioStore
