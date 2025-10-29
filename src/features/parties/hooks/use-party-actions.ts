import { useState } from 'react'
import { toast } from 'sonner'
import { partiesApi } from '../api/parties.api'
import { usePartyStore } from './use-party-store'
import { CreatePartyData, UpdatePartyData, Party } from '../types'
import { useOnline } from '@/hooks/use-online'

export function usePartyActions(shopId: string) {
    const [loading, setLoading] = useState(false)
    const { addItemOptimistic, updateItemOptimistic, deleteItemOptimistic } =
        usePartyStore()
    const isOnline = useOnline()

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

        if (isOnline) setLoading(true)
        addItemOptimistic(optimisticParty)
        const toastId = isOnline ? toast.loading('Creating party...') : null

        try {
            const result = await partiesApi.create(shopId, data)
            console.log({ result })

            if (isOnline) {
                toast.success('Party created', { id: toastId! })
            } else {
                toast.success('Party saved (will sync when online)')
            }
            return optimisticParty
        } catch (error) {
            deleteItemOptimistic(tempId)
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            if (isOnline) {
                toast.error(message, { id: toastId! })
            } else {
                toast.error(message)
            }
            throw error
        } finally {
            console.log('Finally Exgiqute')

            if (isOnline) setLoading(false)
        }
    }

    const updateParty = async (id: string, data: UpdatePartyData) => {
        const toastId = isOnline ? toast.loading('Updating...') : null
        updateItemOptimistic(id, data)

        try {
            const result = await partiesApi.update(id, data)
            console.log({ result })

            if (isOnline) {
                toast.success('Party updated', { id: toastId! })
            } else {
                toast.success('Party updated (will sync when online)')
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update'
            if (isOnline) {
                toast.error(message, { id: toastId! })
            } else {
                toast.error(message)
            }
            throw error
        }
    }

    const deleteParty = async (id: string) => {
        const toastId = isOnline ? toast.loading('Deleting...') : null
        deleteItemOptimistic(id)

        try {
            await partiesApi.delete(id)
            if (isOnline) {
                toast.success('Party deleted', { id: toastId! })
            } else {
                toast.success('Party deleted (will sync when online)')
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete'
            if (isOnline) {
                toast.error(message, { id: toastId! })
            } else {
                toast.error(message)
            }
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
