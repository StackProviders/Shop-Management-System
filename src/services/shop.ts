import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    where,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
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
    const shopRef = await addDoc(collection(db, 'shops'), {
        ...shopData,
        created_userId: userId,
        status: ShopStatus.ACTIVE,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })

    await addDoc(collection(db, 'shop_members'), {
        shopId: shopRef.id,
        userId,
        role: ShopRole.OWNER,
        permissions: [],
        invitedBy: userId,
        joinedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })

    return {
        id: shopRef.id,
        ...shopData,
        created_userId: userId,
        status: ShopStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}

export const getShop = async (shopId: string): Promise<Shop | null> => {
    const shopDoc = await getDoc(doc(db, 'shops', shopId))
    if (!shopDoc.exists()) return null

    const data = shopDoc.data()
    return {
        id: shopDoc.id,
        ...data,
        createdAt:
            data.createdAt instanceof Timestamp
                ? data.createdAt.toDate()
                : new Date(),
        updatedAt:
            data.updatedAt instanceof Timestamp
                ? data.updatedAt.toDate()
                : new Date()
    } as Shop
}

export const getUserShops = async (
    userId: string
): Promise<UserShopAccess[]> => {
    const membersQuery = query(
        collection(db, 'shop_members'),
        where('userId', '==', userId)
    )
    const membersSnapshot = await getDocs(membersQuery)

    const userShops: UserShopAccess[] = []

    for (const memberDoc of membersSnapshot.docs) {
        const memberData = memberDoc.data() as ShopMember
        const shopDoc = await getDoc(doc(db, 'shops', memberData.shopId))

        if (shopDoc.exists()) {
            const shopData = shopDoc.data()
            userShops.push({
                shopId: shopDoc.id,
                shopName: shopData.shopname,
                role: memberData.role,
                permissions: memberData.permissions,
                isOwner: shopData.created_userId === userId,
                logoUrl: shopData.logo_url,
                shopCategory: shopData.shop_category,
                shopAddress: shopData.shop_address
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
    const shopDoc = await getDoc(doc(db, 'shops', shopId))
    if (!shopDoc.exists()) throw new Error('Shop not found')

    await addDoc(collection(db, 'shop_members'), {
        shopId,
        userId,
        ...memberData,
        joinedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })
}

export const updateMemberRole = async (
    shopId: string,
    userId: string,
    newRole: ShopRole,
    newPermissions: ShopPermission[]
): Promise<void> => {
    const membersQuery = query(
        collection(db, 'shop_members'),
        where('shopId', '==', shopId),
        where('userId', '==', userId)
    )
    const membersSnapshot = await getDocs(membersQuery)

    if (membersSnapshot.empty) throw new Error('Member not found')

    const memberDoc = membersSnapshot.docs[0]
    await updateDoc(doc(db, 'shop_members', memberDoc.id), {
        role: newRole,
        permissions: newPermissions,
        updatedAt: serverTimestamp()
    })
}

export const removeMemberFromShop = async (
    shopId: string,
    userId: string
): Promise<void> => {
    const membersQuery = query(
        collection(db, 'shop_members'),
        where('shopId', '==', shopId),
        where('userId', '==', userId)
    )
    const membersSnapshot = await getDocs(membersQuery)

    if (membersSnapshot.empty) throw new Error('Member not found')

    await deleteDoc(doc(db, 'shop_members', membersSnapshot.docs[0].id))
}

export const updateShop = async (
    shopId: string,
    updates: Partial<Shop>
): Promise<void> => {
    await updateDoc(doc(db, 'shops', shopId), {
        ...updates,
        updatedAt: serverTimestamp()
    })
}

export const deleteShop = async (shopId: string): Promise<void> => {
    await deleteDoc(doc(db, 'shops', shopId))

    const membersQuery = query(
        collection(db, 'shop_members'),
        where('shopId', '==', shopId)
    )
    const membersSnapshot = await getDocs(membersQuery)

    for (const memberDoc of membersSnapshot.docs) {
        await deleteDoc(doc(db, 'shop_members', memberDoc.id))
    }
}

export const getShopMembers = async (shopId: string): Promise<ShopMember[]> => {
    const membersQuery = query(
        collection(db, 'shop_members'),
        where('shopId', '==', shopId)
    )
    const membersSnapshot = await getDocs(membersQuery)

    return membersSnapshot.docs.map((doc) => {
        const data = doc.data()
        return {
            id: doc.id,
            ...data,
            joinedAt:
                data.joinedAt instanceof Timestamp
                    ? data.joinedAt.toDate()
                    : new Date(),
            createdAt:
                data.createdAt instanceof Timestamp
                    ? data.createdAt.toDate()
                    : new Date(),
            updatedAt:
                data.updatedAt instanceof Timestamp
                    ? data.updatedAt.toDate()
                    : new Date()
        } as ShopMember
    })
}

export const getShopMembersWithUserData = async (
    shopId: string
): Promise<ShopMemberWithUser[]> => {
    const members = await getShopMembers(shopId)
    const membersWithUser: ShopMemberWithUser[] = []

    for (const member of members) {
        const userDoc = await getDoc(doc(db, 'users', member.userId))
        const userData = userDoc.exists() ? userDoc.data() : {}

        membersWithUser.push({
            ...member,
            email: userData.email,
            displayName: userData.displayName,
            photoURL: userData.photoURL
        })
    }

    return membersWithUser
}
