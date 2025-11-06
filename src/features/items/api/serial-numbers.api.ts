import {
    collection,
    addDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    serverTimestamp,
    getFirestore
} from 'firebase/firestore'
import { app } from '@/lib/firebase'
import type { SerialNumber } from '../types'

export async function createSerialNumbers(
    shopId: string,
    itemId: string,
    serialNumbers: string[]
): Promise<void> {
    const firestore = getFirestore(app)
    const batch = serialNumbers.map((serialNo) =>
        addDoc(collection(firestore, 'serialNumbers'), {
            shopId,
            itemId,
            serialNo,
            isSold: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })
    )
    await Promise.all(batch)
}

export async function deleteSerialNumbersByItem(
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
    const batch = snapshot.docs.map((doc) => deleteDoc(doc.ref))
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
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as SerialNumber[]
}
