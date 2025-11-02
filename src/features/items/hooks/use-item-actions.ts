import { useState } from 'react'
import { toast } from 'sonner'
import { itemsApi } from '../api/items.api'
import type { CreateItemData } from '../types'

export function useItemActions(shopId: string) {
    const [loading, setLoading] = useState(false)

    const createItem = async (data: CreateItemData) => {
        setLoading(true)
        const toastId = toast.loading('Creating item...')

        try {
            await itemsApi.create(shopId, data)
            toast.success('Item created successfully', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to create item'
            toast.error(message, { id: toastId })
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateItem = async (id: string, data: Partial<CreateItemData>) => {
        setLoading(true)
        const toastId = toast.loading('Updating item...')

        try {
            await itemsApi.update(id, data)
            toast.success('Item updated successfully', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update item'
            toast.error(message, { id: toastId })
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteItem = async (id: string) => {
        setLoading(true)
        const toastId = toast.loading('Deleting item...')

        try {
            await itemsApi.delete(id)
            toast.success('Item deleted successfully', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete item'
            toast.error(message, { id: toastId })
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        createItem,
        updateItem,
        deleteItem,
        loading
    }
}
