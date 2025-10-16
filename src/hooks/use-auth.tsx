import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react'
import {
    logout,
    onAuthStateChange,
    sendOTP,
    verifyOTP,
    updateProfile,
    uploadPhoto,
    initAuth,
    initSession,
    checkDeviceAndLogin
} from '@/services/auth/index'
import { AuthState, User } from '@/services/auth/types'

const AuthContext = createContext<{
    authState: AuthState
    logout: (revokeDevice?: boolean) => Promise<void>
    sendOTP: (identifier: string, type: 'email' | 'phone') => Promise<void>
    verifyOTP: (
        identifier: string,
        otp: string,
        trustDevice?: boolean
    ) => Promise<User>
    checkDeviceAndLogin: (identifier: string) => Promise<User | null>
    updateProfile: (name?: string, photo?: string) => Promise<void>
    uploadPhoto: (file: File) => Promise<string>
} | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
        isAuthenticated: false
    })

    useEffect(() => {
        let mounted = true
        let initialized = false

        const unsubscribe = onAuthStateChange((user) => {
            if (mounted && initialized) {
                setAuthState({
                    user,
                    loading: false,
                    error: null,
                    isAuthenticated: !!user
                })
            }
        })

        const init = async () => {
            const cachedUser = await initSession()
            if (mounted) {
                setAuthState({
                    user: cachedUser,
                    loading: !cachedUser,
                    error: null,
                    isAuthenticated: !!cachedUser
                })
            }

            await initAuth()
            initialized = true
            if (mounted) {
                setAuthState((prev) => ({ ...prev, loading: false }))
            }
        }

        init()

        return () => {
            mounted = false
            unsubscribe()
        }
    }, [])

    const handleSendOTP = async (
        identifier: string,
        type: 'email' | 'phone'
    ) => {
        try {
            await sendOTP(identifier, type)
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Failed to send OTP'
            setAuthState((prev) => ({ ...prev, error: errorMessage }))
            throw error
        }
    }

    const handleLogout = async (revokeDevice: boolean = false) => {
        try {
            await logout(revokeDevice)
        } catch (error) {
            setAuthState((prev) => ({
                ...prev,
                error: error instanceof Error ? error.message : 'Logout failed'
            }))
            throw error
        }
    }

    const handleVerifyOTP = async (
        identifier: string,
        otp: string,
        trustDevice: boolean = false
    ) => {
        try {
            const user = await verifyOTP(identifier, otp, trustDevice)
            return user
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Invalid OTP'
            setAuthState((prev) => ({ ...prev, error: errorMessage }))
            throw error
        }
    }

    const handleUpdateProfile = async (name?: string, photo?: string) => {
        try {
            await updateProfile(name, photo)
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to update profile'
            setAuthState((prev) => ({ ...prev, error: errorMessage }))
            throw error
        }
    }

    const handleUploadPhoto = async (file: File) => {
        try {
            const photoURL = await uploadPhoto(file)
            return photoURL
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : 'Failed to upload photo'
            setAuthState((prev) => ({ ...prev, error: errorMessage }))
            throw error
        }
    }

    const handleCheckDeviceAndLogin = async (
        identifier: string
    ): Promise<User | null> => {
        try {
            return await checkDeviceAndLogin(identifier)
        } catch (error) {
            console.error('Device check failed:', error)
            return null
        }
    }

    const value = {
        authState,
        logout: handleLogout,
        sendOTP: handleSendOTP,
        verifyOTP: handleVerifyOTP,
        checkDeviceAndLogin: handleCheckDeviceAndLogin,
        updateProfile: handleUpdateProfile,
        uploadPhoto: handleUploadPhoto
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
