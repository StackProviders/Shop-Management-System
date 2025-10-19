import { useState, useEffect, useCallback } from 'react'
import {
    getUserShops,
    createShop,
    updateShop,
    deleteShop
} from '@/services/shop'
import { Shop, UserShopAccess } from '@/types/shop'
import { toast } from 'sonner'

export const useShops = (userId: string | undefined) => {
    const [shops, setShops] = useState<UserShopAccess[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchShops = useCallback(async () => {
        if (!userId) {
            setShops([])
            setLoading(false)
            return
        }

        try {
            setLoading(true)
            setError(null)
            const data = await getUserShops(userId)
            setShops(data)
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to fetch shops'
            )
            toast.error('Failed to load shops')
        } finally {
            setLoading(false)
        }
    }, [userId])

    useEffect(() => {
        fetchShops()
    }, [fetchShops])

    const create = async (
        shopData: Omit<
            Shop,
            'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
        >
    ) => {
        if (!userId) throw new Error('User not authenticated')

        const newShop = await createShop(userId, shopData)
        await fetchShops()
        return newShop
    }

    const update = async (shopId: string, updates: Partial<Shop>) => {
        await updateShop(shopId, updates)
        await fetchShops()
    }

    const remove = async (shopId: string) => {
        await deleteShop(shopId)
        await fetchShops()
    }

    return {
        shops,
        loading,
        error,
        refresh: fetchShops,
        create,
        update,
        remove
    }
}
