import {
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    Query,
    DocumentData,
    Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export interface FirestoreDocument {
    id: string
    createdAt: Date
    updatedAt: Date
}

export function createFirestoreApi<T extends FirestoreDocument>(
    collectionName: string
) {
    return {
        subscribe: (
            q: Query<DocumentData>,
            onData: (data: T[]) => void,
            onError?: (error: Error) => void
        ) => {
            return onSnapshot(
                q,
                (snapshot) => {
                    const data = snapshot.docs.map((docSnap) => ({
                        id: docSnap.id,
                        ...docSnap.data(),
                        createdAt:
                            docSnap.data().createdAt?.toDate?.() ?? new Date(),
                        updatedAt:
                            docSnap.data().updatedAt?.toDate?.() ?? new Date()
                    })) as T[]
                    onData(data)
                },
                onError
            )
        },

        create: async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
            const now = Timestamp.now()
            const id = doc(collection(db, collectionName)).id
            await setDoc(doc(db, collectionName, id), {
                ...data,
                createdAt: now,
                updatedAt: now
            })
            return id
        },

        update: async (
            id: string,
            data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
        ) => {
            await updateDoc(doc(db, collectionName, id), {
                ...data,
                updatedAt: Timestamp.now()
            })
        },

        delete: async (id: string) => {
            await deleteDoc(doc(db, collectionName, id))
        }
    }
}
