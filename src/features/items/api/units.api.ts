import {
    collection,
    query,
    where,
    orderBy,
    addDoc,
    doc,
    serverTimestamp,
    getFirestore
} from 'firebase/firestore'
import {
    updateDocWithTimeout,
    deleteDocWithTimeout,
    waitForPendingWritesWithTimeout
} from '@/lib/firestore-utils'
import type { CreateUnitData } from '../types'

const COLLECTION = 'units'

export const unitsQueries = {
    byShop: (shopId: string) => {
        const db = getFirestore()
        return query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            orderBy('fullName', 'asc')
        )
    }
}

export const unitsApi = {
    create: async (shopId: string, data: CreateUnitData): Promise<string> => {
        const db = getFirestore()
        const docRef = await addDoc(collection(db, COLLECTION), {
            ...data,
            shopId,
            createdAt: serverTimestamp()
        })
        await waitForPendingWritesWithTimeout(db)
        return docRef.id
    },

    update: async (
        id: string,
        data: Partial<CreateUnitData>
    ): Promise<void> => {
        const db = getFirestore()
        await updateDocWithTimeout(doc(db, COLLECTION, id), data)
        await waitForPendingWritesWithTimeout(db)
    },

    delete: async (id: string): Promise<void> => {
        const db = getFirestore()
        await deleteDocWithTimeout(doc(db, COLLECTION, id))
        await waitForPendingWritesWithTimeout(db)
    }
}
