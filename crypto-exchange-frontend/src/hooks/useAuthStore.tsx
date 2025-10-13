import { persist, createJSONStorage } from "zustand/middleware"
import type { User } from "../types"
import { create } from "zustand"

type AuthStore = {
    currentUser: User | null
    currentToken: string | null
    setAuth: (user: User, token: string) => void
    clearAuth: () => void
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            currentUser: null,
            currentToken: null,

            setAuth: (user: User, token: string) => set({ currentUser: user, currentToken: token }),
            clearAuth: () => set({ currentUser: null, currentToken: null })
        }),
        {
            name: 'current-auth',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)

export default useAuthStore
