import { create } from 'zustand'
import { User } from '@/features/auth/types'

type LoginType = 'email' | 'phone'

interface AuthStore {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    error: string | null
    lastLoginType: LoginType
    setUser: (user: User | null) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    setLastLoginType: (type: LoginType) => void
    reset: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    lastLoginType: 'phone',
    setUser: (user) => set({ user, isAuthenticated: !!user, error: null }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setLastLoginType: (type) => set({ lastLoginType: type }),
    reset: () =>
        set({ user: null, isAuthenticated: false, loading: false, error: null })
}))
