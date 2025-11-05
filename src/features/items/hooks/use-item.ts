import { useFirestoreDocData } from 'reactfire'
import { doc, getFirestore } from 'firebase/firestore'
import type { Item } from '../types'

export function useItem(itemId: string) {
    const db = getFirestore()
    const itemRef = doc(db, 'items', itemId)

    const { status, data } = useFirestoreDocData(itemRef, {
        idField: 'id'
    })

    return {
        item: data as Item | undefined,
        isLoading: status === 'loading',
        error: status === 'error'
    }
}
