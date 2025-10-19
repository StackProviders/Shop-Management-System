import {
    condition as $,
    query,
    limit,
    orderBy,
    startAfter
} from 'firestore-repository/query'
import { shopsCollection, shopMembersCollection } from './schema'
import { ShopStatus, ShopRole } from '@/types/shop'

// Pagination queries
export const getShopsPaginated = (
    pageSize: number,
    lastShopCreatedAt?: Date
) => {
    const baseQuery = query(
        shopsCollection,
        orderBy('createdAt', 'desc'),
        limit(pageSize)
    )

    return lastShopCreatedAt
        ? query(baseQuery, startAfter(lastShopCreatedAt))
        : baseQuery
}

// Complex filtering
export const getActiveShopsByCategory = (category: string) =>
    query(
        shopsCollection,
        $('status', '==', ShopStatus.ACTIVE),
        $('shop_category', '==', category),
        orderBy('createdAt', 'desc')
    )

// Member role queries
export const getShopOwners = (shopId: string) =>
    query(
        shopMembersCollection,
        $('shopId', '==', shopId),
        $('role', '==', ShopRole.OWNER)
    )

export const getShopAdmins = (shopId: string) =>
    query(
        shopMembersCollection,
        $('shopId', '==', shopId),
        $('role', 'in', [ShopRole.OWNER, ShopRole.ADMIN])
    )

// User-specific queries
export const getUserOwnedShops = (userId: string) =>
    query(
        shopsCollection,
        $('created_userId', '==', userId),
        orderBy('createdAt', 'desc')
    )

export const getUserActiveShopMemberships = (userId: string) =>
    query(
        shopMembersCollection,
        $('userId', '==', userId),
        orderBy('joinedAt', 'desc')
    )

// Search queries (requires composite indexes)
export const searchShopsByNamePrefix = (prefix: string) =>
    query(
        shopsCollection,
        $('shopname', '>=', prefix),
        $('shopname', '<=', prefix + '\uf8ff'),
        limit(20)
    )

// Recent activity
export const getRecentlyUpdatedShops = (limitCount: number = 10) =>
    query(
        shopsCollection,
        $('status', '==', ShopStatus.ACTIVE),
        orderBy('updatedAt', 'desc'),
        limit(limitCount)
    )

// Member invitation queries
export const getMembersInvitedBy = (inviterId: string, shopId: string) =>
    query(
        shopMembersCollection,
        $('shopId', '==', shopId),
        $('invitedBy', '==', inviterId)
    )
