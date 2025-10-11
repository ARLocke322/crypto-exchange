import { persist, createJSONStorage } from "zustand/middleware"
import type { User } from "../types"
import { create } from "zustand"

type UserStore = {
    currentUser: User | null
    setCurrentUser: (user: User) => void
    removeCurrentUser: () => void
}

const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            currentUser: null,
            setCurrentUser: (user: User) => set({ currentUser: user }),
            removeCurrentUser: () => set({ currentUser: null })
        }),
        {
            name: 'current-user',
            storage: createJSONStorage(() => sessionStorage)
        }
    ))

export default useUserStore