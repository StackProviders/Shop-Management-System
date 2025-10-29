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
            onData: (data: T[], hasPendingWrites: boolean) => void,
            onError?: (error: Error) => void,
            onHasPendingWrites?: (data: T[]) => void
        ) => {
            return onSnapshot(
                q,
                { includeMetadataChanges: true },
                (snapshot) => {
                    const data = snapshot.docs.map((docSnap) => ({
                        id: docSnap.id,
                        ...docSnap.data(),
                        createdAt:
                            docSnap.data().createdAt?.toDate?.() ?? new Date(),
                        updatedAt:
                            docSnap.data().updatedAt?.toDate?.() ?? new Date()
                    })) as T[]

                    const hasPending = snapshot.metadata.hasPendingWrites

                    if (hasPending && onHasPendingWrites) {
                        const changedDocs = snapshot
                            .docChanges()
                            .filter(
                                (change) => change.doc.metadata.hasPendingWrites
                            )
                            .map((change) => ({
                                id: change.doc.id,
                                ...change.doc.data(),
                                createdAt:
                                    change.doc.data().createdAt?.toDate?.() ??
                                    new Date(),
                                updatedAt:
                                    change.doc.data().updatedAt?.toDate?.() ??
                                    new Date()
                            })) as T[]
                        console.log({ changedDocs })

                        onHasPendingWrites(changedDocs)
                    }

                    onData(data, hasPending)
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
