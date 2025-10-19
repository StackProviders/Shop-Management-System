import useSWR from 'swr'
import { shopApi } from '../api'
import type { ShopMemberWithUser } from '../types'

export function useShopMembers(shopId: string | undefined) {
    const {
        data: members = [],
        error,
        isLoading,
        mutate
    } = useSWR<ShopMemberWithUser[]>(
        shopId ? ['shop-members', shopId] : null,
        () => shopApi.getShopMembersWithUserData(shopId!),
        { revalidateOnFocus: false }
    )

    return {
        members,
        loading: isLoading,
        error: error?.message ?? null,
        refreshMembers: mutate
    }
}
