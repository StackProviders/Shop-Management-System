import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    onSnapshot,
    Query,
    DocumentData
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
                { includeMetadataChanges: true },
                (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                        createdAt:
                            doc.data().createdAt?.toDate?.() || new Date(),
                        updatedAt:
                            doc.data().updatedAt?.toDate?.() || new Date()
                    })) as T[]
                    onData(data)
                },
                onError
            )
        },

        create: async (data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
            return docRef.id
        },

        update: async (
            id: string,
            data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
        ) => {
            return await updateDoc(doc(db, collectionName, id), {
                ...data,
                updatedAt: serverTimestamp()
            })
        },

        delete: async (id: string) => {
            await deleteDoc(doc(db, collectionName, id))
        }
    }
}
