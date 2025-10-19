import { useCallback } from 'react'
import { shopApi } from '../api'
import type { Shop, ShopRole, ShopPermission, ShopMember } from '../types'

export function useShopActions() {
    const createShop = useCallback(
        async (
            userId: string,
            shopData: Omit<
                Shop,
                'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
            >
        ): Promise<Shop> => {
            return shopApi.createShop(userId, shopData)
        },
        []
    )

    const updateShop = useCallback(
        async (shopId: string, updates: Partial<Shop>): Promise<void> => {
            return shopApi.updateShop(shopId, updates)
        },
        []
    )

    const deleteShop = useCallback(async (shopId: string): Promise<void> => {
        return shopApi.deleteShop(shopId)
    }, [])

    const addMember = useCallback(
        async (
            shopId: string,
            userId: string,
            memberData: Omit<
                ShopMember,
                | 'id'
                | 'shopId'
                | 'userId'
                | 'joinedAt'
                | 'createdAt'
                | 'updatedAt'
            >
        ): Promise<void> => {
            return shopApi.addMember(shopId, userId, memberData)
        },
        []
    )

    const updateMemberRole = useCallback(
        async (
            shopId: string,
            userId: string,
            newRole: ShopRole,
            newPermissions: ShopPermission[]
        ): Promise<void> => {
            return shopApi.updateMemberRole(
                shopId,
                userId,
                newRole,
                newPermissions
            )
        },
        []
    )

    const removeMember = useCallback(
        async (shopId: string, userId: string): Promise<void> => {
            return shopApi.removeMember(shopId, userId)
        },
        []
    )

    return {
        createShop,
        updateShop,
        deleteShop,
        addMember,
        updateMemberRole,
        removeMember
    }
}
