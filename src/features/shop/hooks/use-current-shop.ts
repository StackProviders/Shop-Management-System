import { useState, useEffect, useCallback } from 'react'
import { shopStore, STORE_KEYS, storeHelpers } from '@/lib/store'
import type { UserShopAccess } from '../types'

export function useCurrentShop(userShops: UserShopAccess[]) {
    const [currentShop, setCurrentShopState] = useState<UserShopAccess | null>(
        null
    )

    useEffect(() => {
        if (!currentShop && userShops.length > 0) {
            storeHelpers
                .get<string>(shopStore, STORE_KEYS.CURRENT_SHOP_ID)
                .then((savedShopId) => {
                    const shop = savedShopId
                        ? userShops.find((s) => s.shopId === savedShopId)
                        : userShops[0]
                    if (shop) setCurrentShopState(shop)
                })
        }
    }, [userShops, currentShop])

    useEffect(() => {
        if (currentShop && userShops.length > 0) {
            const updatedShop = userShops.find(
                (s) => s.shopId === currentShop.shopId
            )
            if (
                updatedShop &&
                JSON.stringify(updatedShop) !== JSON.stringify(currentShop)
            ) {
                setCurrentShopState(updatedShop)
            }
        }
    }, [userShops, currentShop])

    useEffect(() => {
        if (currentShop) {
            storeHelpers.set(
                shopStore,
                STORE_KEYS.CURRENT_SHOP_ID,
                currentShop.shopId
            )
        }
    }, [currentShop])

    const setCurrentShop = useCallback((shop: UserShopAccess | null) => {
        setCurrentShopState(shop)
    }, [])

    return {
        currentShop,
        setCurrentShop
    }
}
