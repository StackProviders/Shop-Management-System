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
    orderBy,
    serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import {
    Shop,
    ShopMember,
    ShopRole,
    ShopPermission,
    UserShopAccess
} from '@/types/shop'

export const createShop = async (
    shopData: Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Shop> => {
    try {
        const shopRef = await addDoc(collection(db, 'shops'), {
            ...shopData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        })

        const shop: Shop = {
            id: shopRef.id,
            ...shopData,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        return shop
    } catch (error) {
        console.error('Error creating shop:', error)
        throw new Error('Failed to create shop')
    }
}

export const getShop = async (shopId: string): Promise<Shop | null> => {
    try {
        const shopDoc = await getDoc(doc(db, 'shops', shopId))
        if (!shopDoc.exists()) {
            return null
        }

        const data = shopDoc.data() as Omit<Shop, 'id'>
        return {
            id: shopDoc.id,
            ...data,
            createdAt:
                data.createdAt instanceof Date ? data.createdAt : new Date(),
            updatedAt:
                data.updatedAt instanceof Date ? data.updatedAt : new Date(),
            members:
                data.members?.map((member: ShopMember) => ({
                    ...member,
                    joinedAt:
                        member.joinedAt instanceof Date
                            ? member.joinedAt
                            : new Date()
                })) || []
        } as Shop
    } catch (error) {
        console.error('Error getting shop:', error)
        throw new Error('Failed to get shop')
    }
}

export const getUserShops = async (
    userId: string
): Promise<UserShopAccess[]> => {
    try {
        const shopsQuery = query(
            collection(db, 'shops'),
            where('members', 'array-contains', { userId })
        )

        const shopsSnapshot = await getDocs(shopsQuery)
        const userShops: UserShopAccess[] = []

        shopsSnapshot.forEach((doc) => {
            const data = doc.data()
            const member = data.members.find(
                (m: ShopMember) => m.userId === userId
            )

            if (member) {
                userShops.push({
                    shopId: doc.id,
                    shopName: data.name,
                    role: member.role,
                    permissions: member.permissions,
                    isOwner: data.ownerId === userId,
                    isAdmin:
                        member.role === ShopRole.ADMIN ||
                        data.ownerId === userId
                })
            }
        })

        return userShops
    } catch (error) {
        console.error('Error getting user shops:', error)
        throw new Error('Failed to get user shops')
    }
}

export const addMemberToShop = async (
    shopId: string,
    memberData: Omit<ShopMember, 'joinedAt'>
): Promise<void> => {
    try {
        const shopRef = doc(db, 'shops', shopId)
        const shopDoc = await getDoc(shopRef)

        if (!shopDoc.exists()) {
            throw new Error('Shop not found')
        }

        const shop = shopDoc.data() as Shop
        const newMember: ShopMember = {
            ...memberData,
            joinedAt: new Date()
        }

        const updatedMembers = [...shop.members, newMember]

        await updateDoc(shopRef, {
            members: updatedMembers,
            updatedAt: serverTimestamp()
        })
    } catch (error) {
        console.error('Error adding member to shop:', error)
        throw new Error('Failed to add member to shop')
    }
}

export const updateMemberRole = async (
    shopId: string,
    userId: string,
    newRole: ShopRole,
    newPermissions: ShopPermission[]
): Promise<void> => {
    try {
        const shopRef = doc(db, 'shops', shopId)
        const shopDoc = await getDoc(shopRef)

        if (!shopDoc.exists()) {
            throw new Error('Shop not found')
        }

        const shop = shopDoc.data() as Shop
        const updatedMembers = shop.members.map((member) =>
            member.userId === userId
                ? { ...member, role: newRole, permissions: newPermissions }
                : member
        )

        await updateDoc(shopRef, {
            members: updatedMembers,
            updatedAt: serverTimestamp()
        })
    } catch (error) {
        console.error('Error updating member role:', error)
        throw new Error('Failed to update member role')
    }
}

export const removeMemberFromShop = async (
    shopId: string,
    userId: string
): Promise<void> => {
    try {
        const shopRef = doc(db, 'shops', shopId)
        const shopDoc = await getDoc(shopRef)

        if (!shopDoc.exists()) {
            throw new Error('Shop not found')
        }

        const shop = shopDoc.data() as Shop
        const updatedMembers = shop.members.filter(
            (member) => member.userId !== userId
        )

        await updateDoc(shopRef, {
            members: updatedMembers,
            updatedAt: serverTimestamp()
        })
    } catch (error) {
        console.error('Error removing member from shop:', error)
        throw new Error('Failed to remove member from shop')
    }
}

export const updateShop = async (
    shopId: string,
    updates: Partial<Shop>
): Promise<void> => {
    try {
        const shopRef = doc(db, 'shops', shopId)
        await updateDoc(shopRef, {
            ...updates,
            updatedAt: serverTimestamp()
        })
    } catch (error) {
        console.error('Error updating shop:', error)
        throw new Error('Failed to update shop')
    }
}

export const deleteShop = async (shopId: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'shops', shopId))
    } catch (error) {
        console.error('Error deleting shop:', error)
        throw new Error('Failed to delete shop')
    }
}

export const searchShops = async (searchQuery: string): Promise<Shop[]> => {
    try {
        // This is a simplified search - in production, you'd use Algolia or similar
        const shopsQuery = query(collection(db, 'shops'), orderBy('name'))

        const shopsSnapshot = await getDocs(shopsQuery)
        const shops: Shop[] = []

        shopsSnapshot.forEach((doc) => {
            const data = doc.data() as Omit<Shop, 'id'>
            if (data.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                shops.push({
                    id: doc.id,
                    ...data,
                    createdAt:
                        data.createdAt instanceof Date
                            ? data.createdAt
                            : new Date(),
                    updatedAt:
                        data.updatedAt instanceof Date
                            ? data.updatedAt
                            : new Date(),
                    members:
                        data.members?.map((member: ShopMember) => ({
                            ...member,
                            joinedAt:
                                member.joinedAt instanceof Date
                                    ? member.joinedAt
                                    : new Date()
                        })) || []
                } as Shop)
            }
        })

        return shops
    } catch (error) {
        console.error('Error searching shops:', error)
        throw new Error('Failed to search shops')
    }
}
