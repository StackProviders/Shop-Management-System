import { useFirestoreCollectionData } from 'reactfire'
import { categoriesQueries } from '../api/categories.api'
import type { Category } from '../types'

export function useCategories(shopId: string) {
    const q = categoriesQueries.byShop(shopId)

    const { status, data } = useFirestoreCollectionData(q, {
        idField: 'id'
    })

    return {
        categories: (data as Category[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error'
    }
}
