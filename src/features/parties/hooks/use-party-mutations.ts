import { useCrudOperations } from '@/features/shared'
import type { Party } from '../types'

export function usePartyMutations(shopId: string) {
    const { create, update, remove } = useCrudOperations<Party>(
        'parties',
        shopId
    )

    return {
        createParty: create,
        updateParty: update,
        deleteParty: remove
    }
}
