import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react'
import {
    logout,
    sendOTP,
    verifyOTP,
    loginWithGoogle,
    onAuthStateChange
} from '@/services/auth'
import { User, AuthState } from '@/types/auth'

const AuthContext = createContext<{
    authState: AuthState
    logout: () => Promise<void>
    sendOTP: (email: string) => Promise<void>
    verifyOTP: (email: string, otp: string) => Promise<User>
    loginWithGoogle: () => Promise<void>
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null
    })

    useEffect(() => {
        const unsubscribe = onAuthStateChange((user) => {
            setAuthState((prev) => ({
                ...prev,
                user,
                loading: false,
                error: null
            }))
        })

        return unsubscribe
    }, [])

    const handleVerifyOTP = async (email: string, otp: string) => {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            const user = await verifyOTP(email, otp)
            setAuthState((prev) => ({
                ...prev,
                user,
                loading: false,
                error: null
            }))
            return user
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Invalid OTP. Please try again.'
            setAuthState((prev) => ({
                ...prev,
                loading: false,
                error: errorMessage
            }))
            throw error
        }
    }

    const handleLoginWithGoogle = async () => {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            await loginWithGoogle()
            setAuthState((prev) => ({ ...prev, loading: false }))
        } catch (error) {
            setAuthState((prev) => ({
                ...prev,
                loading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Google login failed'
            }))
            throw error
        }
    }

    const handleLogout = async () => {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            await logout()
            setAuthState((prev) => ({ ...prev, loading: false }))
        } catch (error) {
            setAuthState((prev) => ({
                ...prev,
                loading: false,
                error: error instanceof Error ? error.message : 'Logout failed'
            }))
            throw error
        }
    }

    const handleSendOTP = async (email: string) => {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }))
        try {
            await sendOTP(email)
            setAuthState((prev) => ({ ...prev, loading: false, error: null }))
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to send OTP. Please try again.'
            setAuthState((prev) => ({
                ...prev,
                loading: false,
                error: errorMessage
            }))
            throw error
        }
    }

    const value = {
        authState,
        logout: handleLogout,
        sendOTP: handleSendOTP,
        verifyOTP: handleVerifyOTP,
        loginWithGoogle: handleLoginWithGoogle
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
