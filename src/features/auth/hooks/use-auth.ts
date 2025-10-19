import { useAuthStore } from '@/stores/auth-store'
import { authApi, userApi } from '../api'
import { setCurrentUser } from '@/services/auth/session.service'
import { setLogoutFlag } from '@/services/auth/storage.service'
import {
    clearDeviceSession,
    revokeDevice
} from '@/services/auth/device.service'

export const useAuth = () => {
    const { setError, reset } = useAuthStore()

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
            const user = await authApi.checkDeviceAndLogin(identifier)
            if (user) setCurrentUser(user)
            return user
        } catch (error) {
            console.error('Device check failed:', error)
            return null
        }
    }

    const logout = async (shouldRevokeDevice: boolean = false) => {
        try {
            reset()
            if (shouldRevokeDevice) {
                const user = useAuthStore.getState().user
                if (user) await revokeDevice(user.uid)
            }
            await clearDeviceSession()
            await setLogoutFlag()
            setCurrentUser(null)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Logout failed')
            throw error
        }
    }

    const updateProfile = async (name?: string, photo?: string) => {
        try {
            await userApi.updateProfile(name, photo)
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
            return await userApi.uploadPhoto(file)
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
