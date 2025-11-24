'use client'

import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { shopApi } from '../api'
import type { Shop, ShopRole, ShopPermission, ShopMember } from '../types'

export function useShopActions() {
    const [loading, setLoading] = useState(false)

    const createShop = useCallback(
        async (
            userId: string,
            shopData: Omit<
                Shop,
                'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
            >
        ): Promise<Shop> => {
            setLoading(true)
            try {
                const shop = await shopApi.createShop(userId, shopData)
                toast.success('Shop created successfully')
                return shop
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Failed to create shop'
                )
                throw error
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const updateShop = useCallback(
        async (shopId: string, updates: Partial<Shop>): Promise<void> => {
            setLoading(true)
            try {
                await shopApi.updateShop(shopId, updates)
                toast.success('Shop updated successfully')
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Failed to update shop'
                )
                throw error
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const deleteShop = useCallback(async (shopId: string): Promise<void> => {
        setLoading(true)
        try {
            await shopApi.deleteShop(shopId)
            toast.success('Shop deleted successfully')
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to delete shop'
            )
            throw error
        } finally {
            setLoading(false)
        }
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
            setLoading(true)
            try {
                await shopApi.addMember(shopId, userId, memberData)
                toast.success('Member added successfully')
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Failed to add member'
                )
                throw error
            } finally {
                setLoading(false)
            }
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
            setLoading(true)
            try {
                await shopApi.updateMemberRole(
                    shopId,
                    userId,
                    newRole,
                    newPermissions
                )
                toast.success('Member role updated successfully')
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Failed to update member role'
                )
                throw error
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const removeMember = useCallback(
        async (shopId: string, userId: string): Promise<void> => {
            setLoading(true)
            try {
                await shopApi.removeMember(shopId, userId)
                toast.success('Member removed successfully')
            } catch (error) {
                toast.error(
                    error instanceof Error
                        ? error.message
                        : 'Failed to remove member'
                )
                throw error
            } finally {
                setLoading(false)
            }
        },
        []
    )

    return {
        createShop,
        updateShop,
        deleteShop,
        addMember,
        updateMemberRole,
        removeMember,
        loading
    }
}
