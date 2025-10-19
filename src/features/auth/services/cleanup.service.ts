import { devicesRepo } from '@/lib/db'

export const cleanupExpiredDevices = async (userId: string): Promise<void> => {
    const devices = await devicesRepo.list()
    const now = new Date()
    const expiredDevices = devices.filter(
        (d) => d.userId === userId && d.expiresAt < now
    )
    if (expiredDevices.length > 0) {
        await devicesRepo.batchDelete(expiredDevices)
    }
}
