'use client'

import { createContext, useContext } from 'react'
import type { UserShopAccess, Shop } from '../types'

export interface ShopContextType {
    userShops: UserShopAccess[]
    currentShop: UserShopAccess | null
    setCurrentShop: (shop: UserShopAccess | null) => void
    loading: boolean
    error: string | null
    refreshShops: () => Promise<void>
    createShop: (
        shopData: Omit<
            Shop,
            'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
        >
    ) => Promise<void>
}

export const ShopContext = createContext<ShopContextType | null>(null)

export function useShopContext() {
    const context = useContext(ShopContext)
    if (!context) {
        throw new Error('useShopContext must be used within a ShopProvider')
    }
    return context
}
