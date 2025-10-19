import { runTransaction } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { shopsRepo, shopMembersRepo } from './repositories'
import type { ShopData, ShopMemberData } from './schema'
import { Shop, ShopRole, ShopStatus } from '@/types/shop'

/**
 * Create a shop with owner membership in a transaction
 */
export const createShopWithOwner = async (
    userId: string,
    shopData: Omit<
        Shop,
        'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
    >
) => {
    return await runTransaction(db, async (tx) => {
        const now = new Date()
        const shopId = crypto.randomUUID()

        const newShop: ShopData & { id: string } = {
            id: shopId,
            ...shopData,
            created_userId: userId,
            status: ShopStatus.ACTIVE,
            createdAt: now,
            updatedAt: now
        }

        const ownerMember: ShopMemberData & { id: string } = {
            id: crypto.randomUUID(),
            shopId,
            userId,
            role: ShopRole.OWNER,
            permissions: [],
            invitedBy: userId,
            joinedAt: now,
            createdAt: now,
            updatedAt: now
        }

        await shopsRepo.set(newShop, { tx })
        await shopMembersRepo.set(ownerMember, { tx })

        return newShop
    })
}

/**
 * Transfer shop ownership in a transaction
 */
export const transferShopOwnership = async (
    shopId: string,
    currentOwnerId: string,
    newOwnerId: string
) => {
    return await runTransaction(db, async (tx) => {
        const shop = await shopsRepo.get({ id: shopId }, { tx })
        if (!shop) throw new Error('Shop not found')
        if (shop.created_userId !== currentOwnerId) {
            throw new Error('Only current owner can transfer ownership')
        }

        // Update shop owner
        await shopsRepo.set(
            {
                ...shop,
                created_userId: newOwnerId,
                updatedAt: new Date()
            },
            { tx }
        )

        // Update current owner to admin
        const currentOwnerMemberships = await shopMembersRepo.list(
            query(
                shopMembersCollection,
                $('shopId', '==', shopId),
                $('userId', '==', currentOwnerId)
            )
        )
        if (currentOwnerMemberships.length > 0) {
            await shopMembersRepo.set(
                {
                    ...currentOwnerMemberships[0],
                    role: ShopRole.ADMIN,
                    updatedAt: new Date()
                },
                { tx }
            )
        }

        // Update new owner role
        const newOwnerMemberships = await shopMembersRepo.list(
            query(
                shopMembersCollection,
                $('shopId', '==', shopId),
                $('userId', '==', newOwnerId)
            )
        )
        if (newOwnerMemberships.length > 0) {
            await shopMembersRepo.set(
                {
                    ...newOwnerMemberships[0],
                    role: ShopRole.OWNER,
                    updatedAt: new Date()
                },
                { tx }
            )
        }
    })
}

/**
 * Bulk update shop status
 */
export const bulkUpdateShopStatus = async (
    shopIds: string[],
    status: ShopStatus
) => {
    const shops = await Promise.all(shopIds.map((id) => shopsRepo.get({ id })))

    const updates = shops
        .filter((shop): shop is NonNullable<typeof shop> => shop !== null)
        .map((shop) => ({
            ...shop,
            status,
            updatedAt: new Date()
        }))

    await shopsRepo.batchSet(updates)
}

/**
 * Get shop with all members in one call
 */
export const getShopWithMembers = async (shopId: string) => {
    const [shop, members] = await Promise.all([
        shopsRepo.get({ id: shopId }),
        shopMembersRepo.list(
            query(shopMembersCollection, $('shopId', '==', shopId))
        )
    ])

    return { shop, members }
}

/**
 * Check if user has permission in shop
 */
export const checkUserPermission = async (
    userId: string,
    shopId: string,
    requiredRole: ShopRole
): Promise<boolean> => {
    const members = await shopMembersRepo.list(
        query(
            shopMembersCollection,
            $('shopId', '==', shopId),
            $('userId', '==', userId)
        )
    )

    if (members.length === 0) return false

    const roleHierarchy: Record<ShopRole, number> = {
        [ShopRole.OWNER]: 5,
        [ShopRole.ADMIN]: 4,
        [ShopRole.MANAGER]: 3,
        [ShopRole.STAFF]: 2,
        [ShopRole.VIEWER]: 1
    }

    return (
        roleHierarchy[members[0].role as ShopRole] >=
        roleHierarchy[requiredRole]
    )
}

// Import for utils
import { query, condition as $ } from 'firestore-repository/query'
import { shopMembersCollection } from './schema'
