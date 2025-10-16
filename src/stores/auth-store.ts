import { create } from 'zustand'
import { User } from '@/services/auth/types'

interface AuthStore {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    setUser: (user) => set({ user, isAuthenticated: !!user, error: null }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    reset: () =>
        set({ user: null, isAuthenticated: false, loading: false, error: null })
}))
