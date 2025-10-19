import { devicesRepo } from '@/lib/db'
import type { DeviceData } from '@/lib/db/schema'
import { getDeviceId, hashString } from './utils'
import { DEVICE_TRUST_DAYS } from './constants'

export const trustDevice = async (userId: string): Promise<void> => {
    const deviceId = await getDeviceId()
    const deviceTokenHash = await hashString(deviceId)
    const now = new Date()
    const devices = await devicesRepo.list()

    // Remove any existing device entries for this device (from other users)
    const otherUserDevices = devices.filter(
        (d) => d.deviceId === deviceTokenHash && d.userId !== userId
    )
    for (const device of otherUserDevices) {
        await devicesRepo.delete({ id: device.id })
    }

    // Check if device already exists for this user
    const existingDevice = devices.find(
        (d) => d.userId === userId && d.deviceId === deviceTokenHash
    )

    if (existingDevice) {
        // Update existing device
        await devicesRepo.set({
            ...existingDevice,
            trusted: true,
            lastUsed: now,
            expiresAt: new Date(
                Date.now() + DEVICE_TRUST_DAYS * 24 * 60 * 60 * 1000
            )
        })
    } else {
        // Create new device entry
        await devicesRepo.set({
            id: crypto.randomUUID(),
            userId,
            deviceId: deviceTokenHash,
            deviceName: navigator.userAgent,
            trusted: true,
            lastUsed: now,
            expiresAt: new Date(
                Date.now() + DEVICE_TRUST_DAYS * 24 * 60 * 60 * 1000
            ),
            createdAt: now
        })
    }
}

export const verifyTrustedDevice = async (): Promise<string | null> => {
    const deviceId = await getDeviceId()
    const deviceTokenHash = await hashString(deviceId)
    const devices = await devicesRepo.list()
    const device = devices.find(
        (d: DeviceData) => d.deviceId === deviceTokenHash && d.trusted
    )

    if (!device) return null
    if (new Date() > new Date(device.expiresAt)) return null

    await devicesRepo.set({ ...device, lastUsed: new Date() })
    return device.userId
}

export const revokeDevice = async (userId: string): Promise<void> => {
    const deviceId = await getDeviceId()
    const deviceTokenHash = await hashString(deviceId)
    const devices = await devicesRepo.list()
    const device = devices.find(
        (d) => d.userId === userId && d.deviceId === deviceTokenHash
    )
    if (device) await devicesRepo.delete({ id: device.id })
}

export const clearDeviceSession = async (): Promise<void> => {
    localStorage.removeItem('device_token')
}
