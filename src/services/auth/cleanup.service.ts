import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { COLLECTIONS } from './constants'

export const cleanupExpiredDevices = async (
    userId: string
): Promise<number> => {
    try {
        const devicesRef = collection(
            db,
            COLLECTIONS.USERS,
            userId,
            COLLECTIONS.TRUSTED_DEVICES
        )

        const q = query(
            devicesRef,
            where('revoked', '==', false),
            where('expiresAt', '<=', Timestamp.now())
        )

        const snapshot = await getDocs(q)
        let count = 0

        const updates = snapshot.docs.map((deviceDoc) =>
            updateDoc(deviceDoc.ref, { revoked: true }).then(() => count++)
        )

        await Promise.all(updates)
        return count
    } catch (error) {
        console.error('Failed to cleanup expired devices:', error)
        return 0
    }
}
