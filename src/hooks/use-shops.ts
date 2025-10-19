import useSWR from 'swr'
import {
    getUserShops,
    createShop,
    updateShop,
    deleteShop
} from '@/services/shop'
import { Shop, UserShopAccess } from '@/types/shop'

const fetcher = (userId: string) => getUserShops(userId)

export const useShops = (userId: string | undefined) => {
    const { data, error, isLoading, mutate } = useSWR<UserShopAccess[]>(
        userId ? ['user-shops', userId] : null,
        () => fetcher(userId!),
        {
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 2000
        }
    )

    const create = async (
        shopData: Omit<
            Shop,
            'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
        >
    ) => {
        if (!userId) throw new Error('User not authenticated')
        const newShop = await createShop(userId, shopData)
        await mutate()
        return newShop
    }

    const update = async (shopId: string, updates: Partial<Shop>) => {
        await updateShop(shopId, updates)
        await mutate()
    }

    const remove = async (shopId: string) => {
        await deleteShop(shopId)
        await mutate()
    }

    return {
        shops: data ?? [],
        loading: isLoading,
        error: error?.message ?? null,
        refresh: mutate,
        create,
        update,
        remove
    }
}
