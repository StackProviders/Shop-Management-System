import {
    collection,
    doc,
    query,
    where,
    getDocs,
    Timestamp
} from 'firebase/firestore'
import { setDocWithTimeout, deleteDocWithTimeout } from '@/lib/firestore-utils'
import type { SerialNumber } from '../types'
import { getFirestore } from 'firebase/firestore'
import { app } from '@/lib/firebase'

export async function createSerialNumbers(
    shopId: string,
    itemId: string,
    serialNumbers: string[]
): Promise<void> {
    const firestore = getFirestore(app)
    const batch = serialNumbers.map(async (serialNo) => {
        const newDocRef = doc(collection(firestore, 'serialNumbers'))
        await setDocWithTimeout(newDocRef, {
            shopId,
            itemId,
            serialNo,
            isSold: false,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        })
    })
    await Promise.all(batch)
}

export async function removeSerialNumbersByItem(
    shopId: string,
    itemId: string
): Promise<void> {
    const firestore = getFirestore(app)
    const q = query(
        collection(firestore, 'serialNumbers'),
        where('shopId', '==', shopId),
        where('itemId', '==', itemId)
    )
    const snapshot = await getDocs(q)
    const batch = snapshot.docs.map((docSnap) =>
        deleteDocWithTimeout(docSnap.ref)
    )
    await Promise.all(batch)
}

export async function getSerialNumbersByItem(
    shopId: string,
    itemId: string
): Promise<SerialNumber[]> {
    const firestore = getFirestore(app)
    const q = query(
        collection(firestore, 'serialNumbers'),
        where('shopId', '==', shopId),
        where('itemId', '==', itemId)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
    })) as SerialNumber[]
}
