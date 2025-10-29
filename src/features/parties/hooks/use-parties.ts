import { useEffect } from 'react'
import { partiesApi, partyQueries } from '../api/parties.api'
import { usePartyStore } from './use-party-store'
import { Party } from '../types'

export function useParties(
    shopId: string,
    onSyncComplete?: (data: Party[]) => void
) {
    const items = usePartyStore((state) => state.items)
    const isLoading = usePartyStore((state) => state.isLoading)
    const error = usePartyStore((state) => state.error)

    useEffect(() => {
        if (!shopId) {
            usePartyStore.getState().setItems([])
            usePartyStore.getState().setLoading(false)
            return
        }

        usePartyStore.getState().setLoading(true)

        const unsubscribe = partiesApi.subscribe(
            partyQueries.byShop(shopId),
            (data) => {
                usePartyStore.getState().setItems(data)
                usePartyStore.getState().setLoading(false)
                usePartyStore.getState().setError(null)
            },
            (err) => {
                usePartyStore.getState().setError(err.message)
                usePartyStore.getState().setLoading(false)
            },
            onSyncComplete
        )

        return () => unsubscribe()
    }, [shopId, onSyncComplete])

    return {
        parties: items,
        isLoading,
        error
    }
}
