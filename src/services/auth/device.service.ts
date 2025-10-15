import { LazyStore } from '@tauri-apps/plugin-store'
import { v4 as uuidv4 } from 'uuid'
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { hashString } from './utils'
import {
    STORE_FILE,
    STORE_KEYS,
    COLLECTIONS,
    DEVICE_TRUST_DAYS
} from './constants'

const store = new LazyStore(STORE_FILE)

export const getDeviceId = async (): Promise<string> => {
    let deviceId = await store.get<string>(STORE_KEYS.DEVICE_ID)
    if (!deviceId) {
        deviceId = uuidv4()
        await store.set(STORE_KEYS.DEVICE_ID, deviceId)
        await store.save()
    }
    return deviceId
}

export const trustDevice = async (userId: string): Promise<void> => {
    const deviceId = await getDeviceId()
    const deviceToken = uuidv4()
    const deviceTokenHash = await hashString(deviceToken)

    await setDoc(
        doc(
            db,
            COLLECTIONS.USERS,
            userId,
            COLLECTIONS.TRUSTED_DEVICES,
            deviceId
        ),
        {
            deviceTokenHash,
            deviceInfo: navigator.userAgent,
            createdAt: Timestamp.now(),
            expiresAt: Timestamp.fromDate(
                new Date(Date.now() + DEVICE_TRUST_DAYS * 24 * 60 * 60 * 1000)
            ),
            revoked: false
        }
    )

    await store.set(STORE_KEYS.DEVICE_TOKEN, deviceToken)
    await store.set(STORE_KEYS.USER_ID, userId)
    await store.save()
}

export const verifyTrustedDevice = async (): Promise<string | null> => {
    const deviceToken = await store.get<string>(STORE_KEYS.DEVICE_TOKEN)
    const userId = await store.get<string>(STORE_KEYS.USER_ID)

    if (!deviceToken || !userId) return null

    const deviceId = await getDeviceId()
    const deviceDoc = await getDoc(
        doc(
            db,
            COLLECTIONS.USERS,
            userId,
            COLLECTIONS.TRUSTED_DEVICES,
            deviceId
        )
    )

    if (!deviceDoc.exists()) {
        await clearDeviceSession()
        return null
    }

    const deviceData = deviceDoc.data()
    if (deviceData.revoked || new Date() > deviceData.expiresAt.toDate()) {
        await clearDeviceSession()
        return null
    }

    const deviceTokenHash = await hashString(deviceToken)
    if (deviceData.deviceTokenHash !== deviceTokenHash) {
        await clearDeviceSession()
        return null
    }

    return userId
}

export const revokeDevice = async (userId: string): Promise<void> => {
    const deviceId = await getDeviceId()
    const deviceDoc = doc(
        db,
        COLLECTIONS.USERS,
        userId,
        COLLECTIONS.TRUSTED_DEVICES,
        deviceId
    )
    const docSnap = await getDoc(deviceDoc)
    if (docSnap.exists()) {
        await updateDoc(deviceDoc, { revoked: true })
    }
}

export const clearDeviceSession = async (): Promise<void> => {
    await store.delete(STORE_KEYS.DEVICE_TOKEN)
    await store.delete(STORE_KEYS.USER_ID)
    await store.save()
}
