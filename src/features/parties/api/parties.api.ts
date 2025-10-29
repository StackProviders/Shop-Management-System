import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { createFirestoreApi } from '@/features/shared'
import { Party, CreatePartyData, UpdatePartyData } from '../types'

const COLLECTION = 'parties'
const baseApi = createFirestoreApi<Party>(COLLECTION)

export const partyQueries = {
    byShop: (shopId: string) =>
        query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            orderBy('name', 'asc')
        ),

    byShopAndType: (shopId: string, type: 'customer' | 'supplier') =>
        query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            where('type', '==', type),
            orderBy('name', 'asc')
        )
}

export const partiesApi = {
    subscribe: baseApi.subscribe,

    create: async (shopId: string, data: CreatePartyData) => {
        return await baseApi.create({
            shopId,
            type: data.type,
            name: data.name,
            contactInfo: data.contactInfo || {},
            balance: data.balance || 0,
            status: data.status || 'active'
        } as Omit<Party, 'id' | 'createdAt' | 'updatedAt'>)
    },

    update: async (id: string, data: UpdatePartyData) => {
        return baseApi.update(id, data)
    },

    delete: async (id: string) => {
        return baseApi.delete(id)
    }
}
