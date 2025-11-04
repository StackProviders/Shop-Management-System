import { useCrudOperations } from '@/features/shared/hooks/use-crud-operations'
import type { Item } from '../types'

export function useItemMutations(shopId: string) {
    return useCrudOperations<Item>('items', shopId)
}
