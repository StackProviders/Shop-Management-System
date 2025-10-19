import { createContext, useContext, useEffect, ReactNode } from 'react'
import { onAuthStateChange, initSession, initAuth } from '../services'
import { useAuthStore } from '@/stores/auth-store'
import { useAuthActions } from '../hooks/use-auth-actions'
import type { User } from '../types'

const AuthContext = createContext<ReturnType<typeof useAuthActions> | null>(
    null
)

export function AuthProvider({ children }: { children: ReactNode }) {
    const { setUser, setLoading } = useAuthStore()
    const authActions = useAuthActions()

    useEffect(() => {
        let mounted = true
        let initialized = false

        const unsubscribe = onAuthStateChange((user: User | null) => {
            if (mounted && initialized) {
                setUser(user)
                setLoading(false)
            }
        })

        const init = async () => {
            const cachedUser = await initSession()
            if (mounted) {
                setUser(cachedUser)
                setLoading(!cachedUser)
            }

            await initAuth()
            initialized = true
            if (mounted) {
                setLoading(false)
            }
        }

        init()

        return () => {
            mounted = false
            unsubscribe()
        }
    }, [setUser, setLoading])

    return (
        <AuthContext.Provider value={authActions}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    const authState = useAuthStore()
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return { ...context, authState }
}
