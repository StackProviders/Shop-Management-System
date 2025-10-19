import { useAuthStore } from '@/stores/auth-store'
import { authApi, deviceApi, userApi } from '../api'
import { setCurrentUser } from '@/services/auth/session.service'
import { setLogoutFlag } from '@/services/auth/storage.service'

export const useAuth = () => {
    const { setUser, setError, reset } = useAuthStore()

    const sendOTP = async (identifier: string, type: 'email' | 'phone') => {
        try {
            await authApi.sendOTP(identifier, type)
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to send OTP'
            setError(message)
            throw error
        }
    }

    const verifyOTP = async (
        identifier: string,
        otp: string,
        trustDevice: boolean = false
    ) => {
        try {
            const user = await authApi.verifyOTP(identifier, otp, trustDevice)
            setCurrentUser(user)
            return user
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Invalid OTP'
            setError(message)
            throw error
        }
    }

    const checkDeviceAndLogin = async (identifier: string) => {
        try {
            const user = await authApi.checkTrustedDevice(identifier)
            if (user) setCurrentUser(user)
            return user
        } catch (error) {
            console.error('Device check failed:', error)
            return null
        }
    }

    const logout = async (revokeDevice: boolean = false) => {
        try {
            reset()
            if (revokeDevice) {
                const user = useAuthStore.getState().user
                if (user) await deviceApi.revoke(user.uid)
            }
            await deviceApi.clearSession()
            await setLogoutFlag()
            setCurrentUser(null)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Logout failed')
            throw error
        }
    }

    const updateProfile = async (name?: string, photo?: string) => {
        try {
            const user = useAuthStore.getState().user
            if (!user) throw new Error('User not authenticated')
            await userApi.updateProfile(user.uid, name, photo)
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to update profile'
            setError(message)
            throw error
        }
    }

    const uploadPhoto = async (file: File) => {
        try {
            const user = useAuthStore.getState().user
            if (!user) throw new Error('User not authenticated')
            return await userApi.uploadPhoto(user.uid, file)
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to upload photo'
            setError(message)
            throw error
        }
    }

    return {
        sendOTP,
        verifyOTP,
        checkDeviceAndLogin,
        logout,
        updateProfile,
        uploadPhoto
    }
}
