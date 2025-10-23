import useSWR from 'swr'
import { partiesApi } from '../api/parties.api'
import { Party } from '../types'

export function useParties(shopId: string) {
    const { data, error, isLoading, mutate } = useSWR<Party[]>(
        shopId ? `/parties/${shopId}` : null,
        () => partiesApi.getAll(shopId)
    )

    return {
        parties: data ?? [],
        isLoading,
        error,
        refresh: mutate
    }
}
