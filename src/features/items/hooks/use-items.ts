import { useFirestoreCollectionData } from 'reactfire'
import { itemsQueries } from '../api/items.api'
import type { Item, ItemType } from '../types'

export function useItems(shopId: string, type?: ItemType) {
    const q = type
        ? itemsQueries.byType(shopId, type)
        : itemsQueries.byShop(shopId)

    const { status, data } = useFirestoreCollectionData(q, {
        idField: 'id'
    })

    return {
        items: (data as Item[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error'
    }
}
