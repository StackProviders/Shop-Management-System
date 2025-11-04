import { useCrudOperations } from '@/features/shared'
import type { Brand } from '../types/brand'

export function useBrandMutations(shopId: string) {
    const { create } = useCrudOperations<Brand>('brands', shopId)

    return { createBrand: create }
}
