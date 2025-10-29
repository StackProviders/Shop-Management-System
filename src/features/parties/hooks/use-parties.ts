import { useEffect } from 'react'
import { partiesApi, partyQueries } from '../api/parties.api'
import { usePartyStore } from './use-party-store'

export function useParties(shopId: string) {
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
                console.error('Party subscription error:', err)
                usePartyStore.getState().setError(err.message)
                usePartyStore.getState().setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [shopId])

    return {
        parties: items,
        isLoading,
        error
    }
}
