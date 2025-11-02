import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import type { Brand } from '../types/brand'

export function useBrands(shopId: string) {
    const firestore = useFirestore()
    const brandsQuery = query(
        collection(firestore, 'brands'),
        where('shopId', '==', shopId)
    )

    const { status, data } = useFirestoreCollectionData(brandsQuery, {
        idField: 'id'
    })

    return {
        brands: (data as Brand[]) ?? [],
        isLoading: status === 'loading'
    }
}
