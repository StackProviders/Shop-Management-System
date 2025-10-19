import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    Query,
    DocumentData,
    writeBatch
} from 'firebase/firestore'
import { db } from '../firebase'

export class Repository<T extends { id: string }> {
    constructor(private collectionName: string) {}

    async get(filter: { id: string }): Promise<T | null> {
        const docRef = doc(db, this.collectionName, filter.id)
        const docSnap = await getDoc(docRef)
        return docSnap.exists()
            ? ({ id: docSnap.id, ...docSnap.data() } as T)
            : null
    }

    async list(q?: Query<DocumentData>): Promise<T[]> {
        const querySnapshot = await getDocs(
            q || collection(db, this.collectionName)
        )
        return querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() }) as T
        )
    }

    async set(data: T): Promise<void> {
        const docRef = doc(db, this.collectionName, data.id)
        await setDoc(docRef, data)
    }

    async delete(filter: { id: string }): Promise<void> {
        const docRef = doc(db, this.collectionName, filter.id)
        await deleteDoc(docRef)
    }

    async batchDelete(items: { id: string }[]): Promise<void> {
        const batch = writeBatch(db)
        items.forEach((item) => {
            const docRef = doc(db, this.collectionName, item.id)
            batch.delete(docRef)
        })
        await batch.commit()
    }
}
