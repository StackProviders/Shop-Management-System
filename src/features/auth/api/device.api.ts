import {
    revokeDevice,
    clearDeviceSession
} from '@/services/auth/device.service'

export const deviceApi = {
    async revoke(userId: string): Promise<void> {
        await revokeDevice(userId)
    },

    async clearSession(): Promise<void> {
        await clearDeviceSession()
    }
}
