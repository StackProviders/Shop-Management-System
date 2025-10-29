import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    deleteDoc,
    Query,
    DocumentData,
    writeBatch,
    onSnapshot,
    Firestore,
    getFirestore
} from 'firebase/firestore'
import { getApp } from 'firebase/app'

export class Repository<T extends { id: string }> {
    constructor(private collectionName: string) {}

    private getDb(): Firestore {
        return getFirestore(getApp())
    }

    async get(filter: { id: string }): Promise<T | null> {
        const db = this.getDb()
        const docRef = doc(db, this.collectionName, filter.id)
        const docSnap = await getDoc(docRef)
        return docSnap.exists()
            ? ({ id: docSnap.id, ...docSnap.data() } as T)
            : null
    }

    async list(q?: Query<DocumentData>): Promise<T[]> {
        const db = this.getDb()
        const querySnapshot = await getDocs(
            q || collection(db, this.collectionName)
        )
        return querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() }) as T
        )
    }

    subscribe(
        callback: (data: T[]) => void,
        q?: Query<DocumentData>
    ): () => void {
        const db = this.getDb()
        return onSnapshot(
            q || collection(db, this.collectionName),
            { includeMetadataChanges: true },
            (snapshot) => {
                const data = snapshot.docs.map(
                    (doc) => ({ id: doc.id, ...doc.data() }) as T
                )
                callback(data)
            }
        )
    }

    async set(data: T): Promise<void> {
        const db = this.getDb()
        const docRef = doc(db, this.collectionName, data.id)
        await setDoc(docRef, data, { merge: true })
    }

    async delete(filter: { id: string }): Promise<void> {
        const db = this.getDb()
        const docRef = doc(db, this.collectionName, filter.id)
        await deleteDoc(docRef)
    }

    async batchDelete(items: { id: string }[]): Promise<void> {
        const db = this.getDb()
        const batch = writeBatch(db)
        items.forEach((item) => {
            const docRef = doc(db, this.collectionName, item.id)
            batch.delete(docRef)
        })
        await batch.commit()
    }
}
