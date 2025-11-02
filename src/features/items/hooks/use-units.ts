import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { unitsQueries } from '../api/units.api'
import type { Unit } from '../types'

export function useUnits(shopId: string) {
    const firestore = useFirestore()
    const q = unitsQueries.byShop(shopId)

    const { status, data } = useFirestoreCollectionData(q, {
        idField: 'id'
    })

    return {
        units: (data as Unit[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error'
    }
}
