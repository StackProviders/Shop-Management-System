import { useState } from 'react'
import { toast } from 'sonner'
import { partiesApi } from '../api/parties.api'
import { CreatePartyData, UpdatePartyData } from '../types'

export function usePartyActions(shopId: string) {
    const [loading, setLoading] = useState(false)

    const createParty = async (data: CreatePartyData) => {
        setLoading(true)
        try {
            const party = await partiesApi.create(shopId, data)
            toast.success('Party created successfully')
            return party
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to create party'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateParty = async (id: string, data: UpdatePartyData) => {
        setLoading(true)
        try {
            const party = await partiesApi.update(id, data)
            toast.success('Party updated successfully')
            return party
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to update party'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteParty = async (id: string) => {
        setLoading(true)
        try {
            await partiesApi.delete(id)
            toast.success('Party deleted successfully')
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : 'Failed to delete party'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        createParty,
        updateParty,
        deleteParty,
        loading
    }
}
