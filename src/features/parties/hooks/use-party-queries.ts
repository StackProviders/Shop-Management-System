import { collection, query, where, doc, Timestamp } from 'firebase/firestore'
import {
    useFirestore,
    useFirestoreCollectionData,
    useFirestoreDocData
} from 'reactfire'
import { Party, PartyType } from '../types'

export function usePartiesByShop(shopId: string) {
    const firestore = useFirestore()
    const partiesQuery = query(
        collection(firestore, 'parties'),
        where('shopId', '==', shopId)
    )

    const { status, data } = useFirestoreCollectionData(partiesQuery, {
        idField: 'id'
    })

    const sortedParties = ((data as Party[]) ?? []).sort((a, b) => {
        const aTime =
            a.createdAt instanceof Date
                ? a.createdAt.getTime()
                : (a.createdAt as Timestamp).toMillis()
        const bTime =
            b.createdAt instanceof Date
                ? b.createdAt.getTime()
                : (b.createdAt as Timestamp).toMillis()
        return bTime - aTime
    })

    return {
        parties: sortedParties,
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load parties') : null
    }
}

export function usePartiesByType(shopId: string, type: PartyType) {
    const firestore = useFirestore()
    const partiesQuery = query(
        collection(firestore, 'parties'),
        where('shopId', '==', shopId),
        where('type', '==', type)
    )

    const { status, data } = useFirestoreCollectionData(partiesQuery, {
        idField: 'id'
    })

    const sortedParties = ((data as Party[]) ?? []).sort((a, b) => {
        const aTime =
            a.createdAt instanceof Date
                ? a.createdAt.getTime()
                : (a.createdAt as Timestamp).toMillis()
        const bTime =
            b.createdAt instanceof Date
                ? b.createdAt.getTime()
                : (b.createdAt as Timestamp).toMillis()
        return bTime - aTime
    })

    return {
        parties: sortedParties,
        isLoading: status === 'loading'
    }
}

export function usePartyById(partyId: string) {
    const firestore = useFirestore()
    const partyRef = doc(firestore, 'parties', partyId)

    const { status, data } = useFirestoreDocData(partyRef, { idField: 'id' })

    return {
        party: data as Party | undefined,
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load party') : null
    }
}
