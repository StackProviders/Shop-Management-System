'use client'

import { useEffect, useState } from 'react'
import { shopMembersRepo, usersRepo } from '@/lib/db'
import type { ShopMemberWithUser } from '../types'

export function useShopMembers(shopId: string | undefined) {
    const [members, setMembers] = useState<ShopMemberWithUser[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!shopId) {
            setMembers([])
            setLoading(false)
            return
        }

        const unsubscribe = shopMembersRepo.subscribe(async (allMembers) => {
            try {
                const shopMembers = allMembers.filter(
                    (m) => m.shopId === shopId
                )
                const membersWithUser: ShopMemberWithUser[] = []

                for (const member of shopMembers) {
                    const user = await usersRepo.get({ id: member.userId })
                    membersWithUser.push({
                        ...member,
                        email: user?.email,
                        displayName: user?.displayName,
                        photoURL: user?.photoURL
                    })
                }

                setMembers(membersWithUser)
                setError(null)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setLoading(false)
            }
        })

        return () => unsubscribe()
    }, [shopId])

    return {
        members,
        loading,
        error,
        refreshMembers: () => {}
    }
}
