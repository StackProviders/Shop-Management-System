import { useEffect, useState } from 'react'
import { shopMembersRepo, shopsRepo } from '@/lib/db'
import type { UserShopAccess } from '../types'

export function useUserShops(userId: string | undefined) {
    const [userShops, setUserShops] = useState<UserShopAccess[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) {
            setUserShops([])
            setLoading(false)
            return
        }

        const unsubscribe = shopMembersRepo.subscribe(async (members) => {
            try {
                const userMembers = members.filter((m) => m.userId === userId)
                const shops: UserShopAccess[] = []

                for (const member of userMembers) {
                    const shop = await shopsRepo.get({ id: member.shopId })
                    if (shop) {
                        shops.push({
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

                setUserShops(shops)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        })

        return () => unsubscribe()
    }, [userId])

    return {
        userShops,
        loading,
        error,
        refreshShops: () => {}
    }
}
