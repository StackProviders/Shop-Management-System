import { toast } from 'sonner'
import { partiesApi } from '../api/parties.api'
import { usePartyStore } from './use-party-store'
import { CreatePartyData, UpdatePartyData, Party } from '../types'
import { useState } from 'react'

export function usePartyActions(shopId: string) {
    const { addItemOptimistic, updateItemOptimistic, deleteItemOptimistic } =
        usePartyStore()
    const [loading, setLoading] = useState(false)

    const createParty = async (data: CreatePartyData) => {
        const tempId = `temp-${Date.now()}`
        const optimisticParty: Party = {
            id: tempId,
            shopId,
            type: data.type,
            name: data.name,
            contactInfo: data.contactInfo || {},
            balance: data.balance || 0,
            status: data.status || 'active',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        setLoading(true)
        addItemOptimistic(optimisticParty)

        try {
            await partiesApi.create(shopId, data)
            toast.success('Party created')
            return optimisticParty
        } catch (error) {
            deleteItemOptimistic(tempId)
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateParty = async (id: string, data: UpdatePartyData) => {
        setLoading(true)
        updateItemOptimistic(id, data)

        try {
            await partiesApi.update(id, data)
            toast.success('Party updated')
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteParty = async (id: string) => {
        setLoading(true)
        deleteItemOptimistic(id)

        try {
            await partiesApi.delete(id)
            toast.success('Party deleted')
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete'
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
