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
import type { CreateItemData } from '../types'

const COLLECTION = 'items'

export const itemsQueries = {
    byShop: (shopId: string) => {
        const db = getFirestore()
        return query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            orderBy('createdAt', 'desc')
        )
    },

    byType: (shopId: string, type: 'product' | 'service') => {
        const db = getFirestore()
        return query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            where('type', '==', type),
            orderBy('createdAt', 'desc')
        )
    },

    byCategory: (shopId: string, categoryId: string) => {
        const db = getFirestore()
        return query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            where('categories', 'array-contains', categoryId),
            orderBy('createdAt', 'desc')
        )
    }
}

export const itemsApi = {
    create: async (shopId: string, data: CreateItemData): Promise<string> => {
        const db = getFirestore()
        const newDocRef = doc(collection(db, COLLECTION))

        const itemData: Record<string, unknown> = {
            name: data.name,
            type: data.type,
            salePrice: data.salePrice,
            purchasePrice: data.purchasePrice,
            shopId,
            itemCode: data.itemCode || `ITEM-${Date.now()}`,
            categories: data.categories || [],
            images: [],
            stockManagement: data.stockManagement ?? true,
            currentStock: data.openingStock || 0,
            openingStock: data.openingStock || 0,
            minStockAlert: data.minStockAlert || 0,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        }

        if (data.mrp !== undefined) itemData.mrp = data.mrp
        if (data.unit) itemData.unit = data.unit
        if (data.description) itemData.description = data.description
        if (data.barcode) itemData.barcode = data.barcode
        if (data.taxRate !== undefined) itemData.taxRate = data.taxRate

        await setDocWithTimeout(newDocRef, itemData)
        await waitForPendingWritesWithTimeout(db)
        return newDocRef.id
    },

    update: async (
        id: string,
        data: Partial<CreateItemData>
    ): Promise<void> => {
        const db = getFirestore()
        await updateDocWithTimeout(doc(db, COLLECTION, id), {
            ...data,
            updatedAt: serverTimestamp()
        })
        await waitForPendingWritesWithTimeout(db)
    },

    delete: async (id: string): Promise<void> => {
        const db = getFirestore()
        await deleteDocWithTimeout(doc(db, COLLECTION, id))
        await waitForPendingWritesWithTimeout(db)
    }
}
