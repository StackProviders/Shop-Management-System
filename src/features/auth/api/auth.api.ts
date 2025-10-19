import {
    sendOTP as sendOTPService,
    verifyOTP as verifyOTPService
} from '@/services/auth/otp.service'
import {
    ensureUserExists,
    updateUserLastLogin
} from '@/services/auth/user.service'
import {
    trustDevice,
    verifyTrustedDevice
} from '@/services/auth/device.service'
import type { User } from '@/services/auth/types'

export const authApi = {
    async sendOTP(identifier: string, type: 'email' | 'phone'): Promise<void> {
        const uid = await ensureUserExists(identifier, type)
        await sendOTPService(identifier, uid)
    },

    async verifyOTP(
        identifier: string,
        otp: string,
        shouldTrustDevice: boolean = false
    ): Promise<User> {
        const uid = await ensureUserExists(
            identifier,
            identifier.includes('@') ? 'email' : 'phone'
        )
        await verifyOTPService(uid, otp)

        if (shouldTrustDevice) {
            await trustDevice(uid)
        }

        await updateUserLastLogin(uid)
        const { getUserById } = await import('@/services/auth/user.service')
        const user = await getUserById(uid)
        if (!user) throw new Error('User not found')
        return user
    },

    async checkTrustedDevice(identifier: string): Promise<User | null> {
        const userId = await verifyTrustedDevice()
        if (!userId) return null

        const { getUserById } = await import('@/services/auth/user.service')
        return await getUserById(userId)
    }
}
