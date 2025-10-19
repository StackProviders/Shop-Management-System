import { revokeDevice, clearDeviceSession } from '../services'

export const deviceApi = {
    async revoke(userId: string): Promise<void> {
        await revokeDevice(userId)
    },

    async clearSession(): Promise<void> {
        await clearDeviceSession()
    }
}
