import {
    createShop as createShopService,
    getShop as getShopService,
    getUserShops as getUserShopsService,
    updateShop as updateShopService,
    deleteShop as deleteShopService,
    getShopMembers as getShopMembersService,
    getShopMembersWithUserData as getShopMembersWithUserDataService,
    addMemberToShop as addMemberService,
    updateMemberRole as updateMemberRoleService,
    removeMemberFromShop as removeMemberService
} from '@/services/shop'
import type {
    Shop,
    ShopMember,
    ShopMemberWithUser,
    UserShopAccess,
    ShopRole,
    ShopPermission
} from '../types'

export const shopApi = {
    createShop: async (
        userId: string,
        shopData: Omit<
            Shop,
            'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
        >
    ): Promise<Shop> => {
        return createShopService(userId, shopData)
    },

    getShop: async (shopId: string): Promise<Shop | null> => {
        return getShopService(shopId)
    },

    getUserShops: async (userId: string): Promise<UserShopAccess[]> => {
        return getUserShopsService(userId)
    },

    updateShop: async (
        shopId: string,
        updates: Partial<Shop>
    ): Promise<void> => {
        return updateShopService(shopId, updates)
    },

    deleteShop: async (shopId: string): Promise<void> => {
        return deleteShopService(shopId)
    },

    getShopMembers: async (shopId: string): Promise<ShopMember[]> => {
        return getShopMembersService(shopId)
    },

    getShopMembersWithUserData: async (
        shopId: string
    ): Promise<ShopMemberWithUser[]> => {
        return getShopMembersWithUserDataService(shopId)
    },

    addMember: async (
        shopId: string,
        userId: string,
        memberData: Omit<
            ShopMember,
            'id' | 'shopId' | 'userId' | 'joinedAt' | 'createdAt' | 'updatedAt'
        >
    ): Promise<void> => {
        return addMemberService(shopId, userId, memberData)
    },

    updateMemberRole: async (
        shopId: string,
        userId: string,
        newRole: ShopRole,
        newPermissions: ShopPermission[]
    ): Promise<void> => {
        return updateMemberRoleService(shopId, userId, newRole, newPermissions)
    },

    removeMember: async (shopId: string, userId: string): Promise<void> => {
        return removeMemberService(shopId, userId)
    }
}
