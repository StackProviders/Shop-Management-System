import { v4 as uuidv4 } from 'uuid'
import { trustedDevicesRepo } from '@/lib/db'
import type { TrustedDeviceData } from '@/lib/db'
import { authStore, STORE_KEYS, storeHelpers } from '@/lib/store'
import { hashString } from './utils'
import { DEVICE_TRUST_DAYS } from './constants'

export const getDeviceId = async (): Promise<string> => {
    let deviceId = await storeHelpers.get<string>(
        authStore,
        STORE_KEYS.DEVICE_ID
    )
    if (!deviceId) {
        deviceId = uuidv4()
        await storeHelpers.set(authStore, STORE_KEYS.DEVICE_ID, deviceId)
    }
    return deviceId
}

export const trustDevice = async (userId: string): Promise<void> => {
    const deviceId = await getDeviceId()
    const deviceToken = uuidv4()
    const deviceTokenHash = await hashString(deviceToken)
    const now = new Date()

    const trustedDevice: TrustedDeviceData & { id: string } = {
        id: `${userId}_${deviceId}`,
        deviceTokenHash,
        deviceInfo: navigator.userAgent,
        createdAt: now,
        expiresAt: new Date(
            Date.now() + DEVICE_TRUST_DAYS * 24 * 60 * 60 * 1000
        ),
        revoked: false
    }

    await trustedDevicesRepo.set(trustedDevice)

    await storeHelpers.set(authStore, STORE_KEYS.DEVICE_TOKEN, deviceToken)
    await storeHelpers.set(authStore, STORE_KEYS.USER_ID, userId)
}

export const verifyTrustedDevice = async (): Promise<string | null> => {
    const deviceToken = await storeHelpers.get<string>(
        authStore,
        STORE_KEYS.DEVICE_TOKEN
    )
    const userId = await storeHelpers.get<string>(authStore, STORE_KEYS.USER_ID)

    if (!deviceToken || !userId) return null

    const deviceId = await getDeviceId()
    const device = await trustedDevicesRepo.get({ id: `${userId}_${deviceId}` })

    if (!device) {
        await clearDeviceSession()
        return null
    }

    const now = new Date()
    const expiresAt =
        device.expiresAt instanceof Date
            ? device.expiresAt
            : new Date(device.expiresAt)

    if (device.revoked || now > expiresAt) {
        await revokeExpiredDevice(userId, deviceId)
        await clearDeviceSession()
        return null
    }

    const deviceTokenHash = await hashString(deviceToken)
    if (device.deviceTokenHash !== deviceTokenHash) {
        await clearDeviceSession()
        return null
    }

    return userId
}

const revokeExpiredDevice = async (
    userId: string,
    deviceId: string
): Promise<void> => {
    try {
        const device = await trustedDevicesRepo.get({
            id: `${userId}_${deviceId}`
        })
        if (device) {
            await trustedDevicesRepo.set({ ...device, revoked: true })
        }
    } catch (error) {
        console.error('Failed to revoke expired device:', error)
    }
}

export const revokeDevice = async (userId: string): Promise<void> => {
    const deviceId = await getDeviceId()
    const device = await trustedDevicesRepo.get({ id: `${userId}_${deviceId}` })
    if (device) {
        await trustedDevicesRepo.set({ ...device, revoked: true })
    }
}

export const clearDeviceSession = async (): Promise<void> => {
    await storeHelpers.delete(authStore, STORE_KEYS.DEVICE_TOKEN)
    await storeHelpers.delete(authStore, STORE_KEYS.USER_ID)
}
