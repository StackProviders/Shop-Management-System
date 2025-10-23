import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Party, CreatePartyData, UpdatePartyData } from '../types'

const COLLECTION = 'parties'

export const partiesApi = {
    getAll: async (shopId: string): Promise<Party[]> => {
        const q = query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId)
        )
        const snapshot = await getDocs(q)
        const parties = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate()
        })) as Party[]

        return parties.sort((a, b) => a.name.localeCompare(b.name))
    },

    getById: async (id: string): Promise<Party> => {
        const docRef = doc(db, COLLECTION, id)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
            throw new Error('Party not found')
        }
        return {
            id: docSnap.id,
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt?.toDate(),
            updatedAt: docSnap.data().updatedAt?.toDate()
        } as Party
    },

    create: async (shopId: string, data: CreatePartyData): Promise<Party> => {
        const now = Timestamp.now()
        const partyData = {
            shopId,
            type: data.type,
            name: data.name,
            contactInfo: data.contactInfo || {},
            balance: data.balance || 0,
            status: data.status || 'active',
            createdAt: now,
            updatedAt: now
        }
        const docRef = await addDoc(collection(db, COLLECTION), partyData)
        return {
            id: docRef.id,
            ...partyData,
            createdAt: now.toDate(),
            updatedAt: now.toDate()
        } as Party
    },

    update: async (id: string, data: UpdatePartyData): Promise<Party> => {
        const docRef = doc(db, COLLECTION, id)
        const updateData = {
            ...data,
            updatedAt: Timestamp.now()
        }
        await updateDoc(docRef, updateData)
        return partiesApi.getById(id)
    },

    delete: async (id: string): Promise<void> => {
        const docRef = doc(db, COLLECTION, id)
        await deleteDoc(docRef)
    }
}
