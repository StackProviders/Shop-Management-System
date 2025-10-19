import { shopsRepo, shopMembersRepo, usersRepo } from '@/lib/db'
import type { ShopData, ShopMemberData } from '@/lib/db'
import {
    Shop,
    ShopMember,
    ShopMemberWithUser,
    ShopRole,
    ShopPermission,
    UserShopAccess,
    ShopStatus
} from '@/types/shop'

export const createShop = async (
    userId: string,
    shopData: Omit<
        Shop,
        'id' | 'created_userId' | 'createdAt' | 'updatedAt' | 'status'
    >
): Promise<Shop> => {
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

    await shopsRepo.set(newShop)

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

    await shopMembersRepo.set(ownerMember)

    return newShop
}

export const getShop = async (shopId: string): Promise<Shop | null> => {
    return await shopsRepo.get({ id: shopId })
}

export const getUserShops = async (
    userId: string
): Promise<UserShopAccess[]> => {
    const members = await shopMembersRepo.list()
    const userMembers = members.filter((m) => m.userId === userId)
    const userShops: UserShopAccess[] = []

    for (const member of userMembers) {
        const shop = await shopsRepo.get({ id: member.shopId })
        if (shop) {
            userShops.push({
                shopId: shop.id,
                shopName: shop.shopname,
                role: member.role,
                permissions: member.permissions,
                isOwner: shop.created_userId === userId,
                logoUrl: shop.logo_url,
                shopCategory: shop.shop_category,
                shopAddress: shop.shop_address
            })
        }
    }

    return userShops
}

export const addMemberToShop = async (
    shopId: string,
    userId: string,
    memberData: Omit<
        ShopMember,
        'id' | 'shopId' | 'userId' | 'joinedAt' | 'createdAt' | 'updatedAt'
    >
): Promise<void> => {
    const shop = await shopsRepo.get({ id: shopId })
    if (!shop) throw new Error('Shop not found')

    const now = new Date()
    await shopMembersRepo.set({
        id: crypto.randomUUID(),
        shopId,
        userId,
        ...memberData,
        joinedAt: now,
        createdAt: now,
        updatedAt: now
    })
}

export const updateMemberRole = async (
    shopId: string,
    userId: string,
    newRole: ShopRole,
    newPermissions: ShopPermission[]
): Promise<void> => {
    const members = await shopMembersRepo.list()
    const member = members.find(
        (m) => m.shopId === shopId && m.userId === userId
    )
    if (!member) throw new Error('Member not found')

    await shopMembersRepo.set({
        ...member,
        role: newRole,
        permissions: newPermissions,
        updatedAt: new Date()
    })
}

export const removeMemberFromShop = async (
    shopId: string,
    userId: string
): Promise<void> => {
    const members = await shopMembersRepo.list()
    const member = members.find(
        (m) => m.shopId === shopId && m.userId === userId
    )
    if (!member) throw new Error('Member not found')

    await shopMembersRepo.delete({ id: member.id })
}

export const updateShop = async (
    shopId: string,
    updates: Partial<Shop>
): Promise<void> => {
    const shop = await shopsRepo.get({ id: shopId })
    if (!shop) throw new Error('Shop not found')

    await shopsRepo.set({
        ...shop,
        ...updates,
        updatedAt: new Date()
    })
}

export const deleteShop = async (shopId: string): Promise<void> => {
    await shopsRepo.delete({ id: shopId })

    const members = await shopMembersRepo.list()
    const shopMembers = members.filter((m) => m.shopId === shopId)
    if (shopMembers.length > 0) {
        await shopMembersRepo.batchDelete(shopMembers)
    }
}

export const getShopMembers = async (shopId: string): Promise<ShopMember[]> => {
    const members = await shopMembersRepo.list()
    return members.filter((m) => m.shopId === shopId)
}

export const getShopMembersWithUserData = async (
    shopId: string
): Promise<ShopMemberWithUser[]> => {
    const members = await getShopMembers(shopId)
    const membersWithUser: ShopMemberWithUser[] = []

    for (const member of members) {
        const user = await usersRepo.get({ id: member.userId })
        membersWithUser.push({
            ...member,
            email: user?.email,
            displayName: user?.displayName,
            photoURL: user?.photoURL
        })
    }

    return membersWithUser
}
