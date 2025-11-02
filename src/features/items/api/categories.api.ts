import {
    collection,
    query,
    where,
    orderBy,
    doc,
    serverTimestamp,
    getFirestore
} from 'firebase/firestore'
import {
    setDocWithTimeout,
    updateDocWithTimeout,
    deleteDocWithTimeout,
    waitForPendingWritesWithTimeout
} from '@/lib/firestore-utils'
import type { CreateCategoryData } from '../types'

const COLLECTION = 'categories'

export const categoriesQueries = {
    byShop: (shopId: string) => {
        const db = getFirestore()
        return query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            orderBy('sortOrder', 'asc')
        )
    }
}

export const categoriesApi = {
    create: async (
        shopId: string,
        data: CreateCategoryData
    ): Promise<string> => {
        const db = getFirestore()
        const newDocRef = doc(collection(db, COLLECTION))
        await setDocWithTimeout(newDocRef, {
            ...data,
            shopId,
            sortOrder: data.sortOrder || 0,
            createdAt: serverTimestamp()
        })
        return newDocRef.id
    },

    update: async (
        id: string,
        data: Partial<CreateCategoryData>
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
