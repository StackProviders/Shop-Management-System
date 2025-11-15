import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'
import { useCrudOperations } from '@/features/shared'

export interface Unit {
    id: string
    fullName: string
    shortName: string
    shopId: string
    createdAt?: Date
    updatedAt?: Date
}

export function useUnits(shopId: string) {
    const firestore = useFirestore()
    const unitsRef = collection(firestore, 'units')
    const q = query(unitsRef, where('shopId', '==', shopId))

    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })

    return {
        units: (data as Unit[]) ?? [],
        isLoading: status === 'loading'
    }
}

export function useUnitMutations(shopId: string) {
    return useCrudOperations<Unit>('units', shopId)
}
