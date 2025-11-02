import { useState } from 'react'
import { toast } from 'sonner'
import { categoriesApi } from '../api/categories.api'
import { useShopContext } from '@/features/shop'

export function useCategoryActions() {
    const [loading, setLoading] = useState(false)
    const { currentShop } = useShopContext()

    const createCategory = async (data: {
        name: string
        description?: string
    }) => {
        if (!currentShop?.shopId) {
            toast.error('No shop selected')
            return
        }

        setLoading(true)
        const toastId = toast.loading('Creating category...')

        try {
            await categoriesApi.create(currentShop.shopId, data)
            toast.success('Category created', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            toast.error(message, { id: toastId })
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { createCategory, loading }
}
