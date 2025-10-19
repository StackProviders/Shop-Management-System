import {
    condition as $,
    query,
    limit,
    orderBy
} from 'firestore-repository/query'
import {
    shopsCollection,
    shopMembersCollection,
    devicesCollection
} from './schema'

export const getUserShopsQuery = (userId: string) =>
    query(shopMembersCollection, $('userId', '==', userId))

export const getShopMembersQuery = (shopId: string) =>
    query(shopMembersCollection, $('shopId', '==', shopId))

export const getShopMemberQuery = (shopId: string, userId: string) =>
    query(
        shopMembersCollection,
        $('shopId', '==', shopId),
        $('userId', '==', userId),
        limit(1)
    )

export const getUserActiveShopsQuery = (userId: string) =>
    query(
        shopsCollection,
        $('created_userId', '==', userId),
        $('status', '==', 'active')
    )

export const getShopsByStatusQuery = (status: string) =>
    query(
        shopsCollection,
        $('status', '==', status),
        orderBy('createdAt', 'desc')
    )

export const getUserDevicesQuery = (userId: string) =>
    query(devicesCollection, $('userId', '==', userId))
