import { User } from '../types'
import {
    sendOTP as sendOTPService,
    verifyOTP as verifyOTPService,
    loginWithTrustedDevice,
    checkDeviceAndLogin as checkDeviceService,
    logout as logoutService,
    initAuth as initAuthService
} from '@/services/auth'

export const authApi = {
    sendOTP: async (
        identifier: string,
        type: 'email' | 'phone'
    ): Promise<void> => {
        return sendOTPService(identifier, type)
    },

    verifyOTP: async (
        identifier: string,
        otp: string,
        trustDevice?: boolean
    ): Promise<User> => {
        return verifyOTPService(identifier, otp, trustDevice)
    },

    checkDeviceAndLogin: async (identifier: string): Promise<User | null> => {
        return checkDeviceService(identifier)
    },

    loginWithTrustedDevice: async (): Promise<User | null> => {
        return loginWithTrustedDevice()
    },

    logout: async (revokeDevice?: boolean): Promise<void> => {
        return logoutService(revokeDevice)
    },

    initAuth: async (): Promise<void> => {
        return initAuthService()
    }
}
