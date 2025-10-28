import { useState } from 'react'
import { toast } from 'sonner'
import { partiesApi } from '../api/parties.api'
import { usePartyStore } from './use-party-store'
import { CreatePartyData, UpdatePartyData, Party } from '../types'

export function usePartyActions(shopId: string) {
    const [loading, setLoading] = useState(false)
    const { addItemOptimistic, updateItemOptimistic, deleteItemOptimistic } =
        usePartyStore()

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
        const toastId = toast.loading('Creating party...')

        try {
            await partiesApi.create(shopId, data)
            toast.success('Party created', { id: toastId })
            return optimisticParty
        } catch (error) {
            deleteItemOptimistic(tempId)
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            toast.error(message, { id: toastId })
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateParty = async (id: string, data: UpdatePartyData) => {
        const toastId = toast.loading('Updating...')
        updateItemOptimistic(id, data)

        try {
            await partiesApi.update(id, data)
            toast.success('Party updated', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    const deleteParty = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        deleteItemOptimistic(id)

        try {
            await partiesApi.delete(id)
            toast.success('Party deleted', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    return {
        createParty,
        updateParty,
        deleteParty,
        loading
    }
}
