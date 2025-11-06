import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'
import type { SerialNumber } from '../types'

export function useSerialNumbers(shopId: string, itemId: string) {
    const firestore = useFirestore()
    const q = query(
        collection(firestore, 'serialNumbers'),
        where('shopId', '==', shopId),
        where('itemId', '==', itemId || '__none__')
    )
    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })

    return {
        serialNumbers: itemId ? ((data as SerialNumber[]) ?? []) : [],
        isLoading: status === 'loading'
    }
}
