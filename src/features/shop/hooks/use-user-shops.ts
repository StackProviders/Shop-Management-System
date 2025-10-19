import useSWR from 'swr'
import { shopApi } from '../api'
import type { UserShopAccess } from '../types'

export function useUserShops(userId: string | undefined) {
    const {
        data: userShops = [],
        error,
        isLoading,
        mutate
    } = useSWR<UserShopAccess[]>(
        userId ? ['user-shops', userId] : null,
        () => shopApi.getUserShops(userId!),
        { revalidateOnFocus: true, revalidateOnReconnect: true }
    )

    return {
        userShops,
        loading: isLoading,
        error: error?.message ?? null,
        refreshShops: mutate
    }
}
