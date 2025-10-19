import { User } from '../types'
import {
    ensureUserExists,
    getUserById,
    updateUserLastLogin,
    trustDevice,
    verifyTrustedDevice,
    cleanupExpiredDevices
} from '../services'
import {
    sendOTP as sendOTPRequest,
    verifyOTP as verifyOTPRequest
} from '../services/otp.service'

export const authServiceApi = {
    sendOTP: async (
        identifier: string,
        type: 'email' | 'phone'
    ): Promise<void> => {
        const uid = await ensureUserExists(identifier, type)
        await sendOTPRequest(identifier, uid)
    },

    verifyOTP: async (
        identifier: string,
        otp: string,
        shouldTrustDevice = false
    ): Promise<User> => {
        const type = identifier.includes('@') ? 'email' : 'phone'
        const uid = await ensureUserExists(identifier, type)
        await verifyOTPRequest(uid, otp)

        const user = await getUserById(uid)
        if (!user) throw new Error('User not found')

        await updateUserLastLogin(uid)
        cleanupExpiredDevices(uid).catch(console.error)

        if (shouldTrustDevice) {
            await trustDevice(uid)
        }

        return user
    },

    checkDeviceAndLogin: async (identifier: string): Promise<User | null> => {
        const type = identifier.includes('@') ? 'email' : 'phone'
        const uid = await ensureUserExists(identifier, type)

        const userId = await verifyTrustedDevice()
        if (!userId || userId !== uid) return null

        const user = await getUserById(userId)
        if (!user) return null

        await updateUserLastLogin(userId)
        cleanupExpiredDevices(userId).catch(console.error)

        return user
    },

    loginWithTrustedDevice: async (): Promise<User | null> => {
        const userId = await verifyTrustedDevice()
        if (!userId) return null

        const user = await getUserById(userId)
        if (!user) return null

        await updateUserLastLogin(userId)
        cleanupExpiredDevices(userId).catch(console.error)

        return user
    }
}
