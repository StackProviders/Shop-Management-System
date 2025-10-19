import { useCallback } from 'react'
import { authApi, userApi } from '../api'
import { useAuthStore } from '@/stores/auth-store'
import { User } from '../types'

export function useAuthActions() {
    const { setUser, setError, reset } = useAuthStore()

    const sendOTP = useCallback(
        async (identifier: string, type: 'email' | 'phone') => {
            try {
                await authApi.sendOTP(identifier, type)
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to send OTP'
                setError(errorMessage)
                throw error
            }
        },
        [setError]
    )

    const verifyOTP = useCallback(
        async (
            identifier: string,
            otp: string,
            trustDevice = true
        ): Promise<User> => {
            try {
                const user = await authApi.verifyOTP(
                    identifier,
                    otp,
                    trustDevice
                )
                setUser(user)
                return user
            } catch (error) {
                console.error('OTP verification failed:', error)
                const errorMessage =
                    error instanceof Error ? error.message : 'Invalid OTP'
                setError(errorMessage)
                throw error
            }
        },
        [setUser, setError]
    )

    const checkDeviceAndLogin = useCallback(
        async (identifier: string): Promise<User | null> => {
            try {
                const user = await authApi.checkDeviceAndLogin(identifier)
                if (user) setUser(user)
                return user
            } catch (error) {
                console.error('Device check failed:', error)
                return null
            }
        },
        [setUser]
    )

    const logout = useCallback(
        async (revokeDevice = false) => {
            try {
                reset()
                await authApi.logout(revokeDevice)
            } catch (error) {
                setError(
                    error instanceof Error ? error.message : 'Logout failed'
                )
                throw error
            }
        },
        [reset, setError]
    )

    const updateProfile = useCallback(
        async (name?: string, photo?: string) => {
            try {
                await userApi.updateProfile(name, photo)
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to update profile'
                setError(errorMessage)
                throw error
            }
        },
        [setError]
    )

    const uploadPhoto = useCallback(
        async (file: File): Promise<string> => {
            try {
                return await userApi.uploadPhoto(file)
            } catch (error) {
                const errorMessage =
                    error instanceof Error
                        ? error.message
                        : 'Failed to upload photo'
                setError(errorMessage)
                throw error
            }
        },
        [setError]
    )

    const isOTPRequired = useCallback(
        async (identifier: string): Promise<boolean> => {
            try {
                return await authApi.isOTPRequired(identifier)
            } catch (error) {
                console.error('Failed to check OTP requirement:', error)
                return true
            }
        },
        []
    )

    return {
        sendOTP,
        verifyOTP,
        checkDeviceAndLogin,
        isOTPRequired,
        logout,
        updateProfile,
        uploadPhoto
    }
}
