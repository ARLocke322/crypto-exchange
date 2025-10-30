import { persist, createJSONStorage } from "zustand/middleware"
import type { TransactionData } from "../types"
import { create } from "zustand"
import transactionsService from '../services/transactions'

type TransactionsStore = {
    currentTransactions: TransactionData[] | null
    fetchTransactions: () => void
    clearTransactions: () => void
}

const useTransactionsStore = create<TransactionsStore>()(
    persist(
        (set) => ({
            currentTransactions: null,
            fetchTransactions: async () => {
                const transactions = await transactionsService.getTransactions()
                return set({ currentTransactions: transactions})
            },
            clearTransactions: () => set({ currentTransactions: null })
        }),
        {
            name: 'current-transactions',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useTransactionsStore
