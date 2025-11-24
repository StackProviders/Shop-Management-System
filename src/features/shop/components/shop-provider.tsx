import { ReactNode, useCallback } from 'react'
import { ShopContext } from '../hooks/use-shop-context'
import { useUserShops, useCurrentShop, useShopActions } from '../hooks'
import { useAuth } from '@/features/auth'
import type { Shop } from '../types'

export function ShopProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()
    const { userShops, loading, error, refreshShops } = useUserShops(user?.uid)
    const { currentShop, setCurrentShop } = useCurrentShop(userShops)
    const { createShop: createShopAction } = useShopActions()

    const createShop = useCallback(
        async (
            shopData: Omit<
                Shop,
                'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
            >
        ) => {
            if (!user) throw new Error('User not authenticated')
            const newShop = await createShopAction(user.uid, shopData)
            await refreshShops()
            const shopAccess = userShops.find((s) => s.shopId === newShop.id)
            if (shopAccess) setCurrentShop(shopAccess)
        },
        [user, createShopAction, refreshShops, userShops, setCurrentShop]
    )

    const value = {
        userShops,
        currentShop,
        setCurrentShop,
        loading,
        error,
        refreshShops: async () => {
            await refreshShops()
        },
        createShop
    }

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
