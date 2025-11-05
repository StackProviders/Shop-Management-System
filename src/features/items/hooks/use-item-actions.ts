import { useCrudOperations } from '@/features/shared'
import type { Item } from '../types'

export function useItemActions(shopId: string) {
    const { create, update, remove } = useCrudOperations<Item>('items', shopId)

    return {
        createItem: create,
        updateItem: update,
        deleteItem: remove
    }
}
