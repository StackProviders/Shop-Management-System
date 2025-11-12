import { useFirestoreDocData } from 'reactfire'
import { doc, getFirestore } from 'firebase/firestore'
import type { Category } from '../types'

export function useCategory(id: string) {
    const db = getFirestore()
    const docRef = doc(db, 'categories', id)

    const { status, data } = useFirestoreDocData(docRef, {
        idField: 'id'
    })

    return {
        category: data as Category | undefined,
        isLoading: status === 'loading',
        error: status === 'error'
    }
}
