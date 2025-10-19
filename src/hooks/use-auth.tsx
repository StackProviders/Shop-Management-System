import { createContext, useContext, useEffect, ReactNode } from 'react'
import { onAuthStateChange, initAuth, initSession } from '@/services/auth/index'
import { useAuthStore } from '@/stores/auth-store'
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'

const AuthContext = createContext<ReturnType<typeof useAuthActions> | null>(
    null
)

export function AuthProvider({ children }: { children: ReactNode }) {
    const { setUser, setLoading } = useAuthStore()
    const authActions = useAuthActions()

    useEffect(() => {
        let mounted = true
        let initialized = false

        const unsubscribe = onAuthStateChange((user) => {
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
