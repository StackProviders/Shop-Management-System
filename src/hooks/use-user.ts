import { useAuth } from '@/hooks/use-auth'
import { UserShopAccess } from '@/types/shop'

export function useCurrentUser() {
    const { authState } = useAuth()
    return authState.user
}

export function useAuthLoading() {
    const { authState } = useAuth()
    return authState.loading
}

export function useAuthError() {
    const { authState } = useAuth()
    return authState.error
}

export function useIsAuthenticated() {
    const { authState } = useAuth()
    return !!authState.user && !authState.loading
}

export function useUserShops() {
    // This would be implemented with a shop service
    // For now, returning empty array
    return [] as UserShopAccess[]
}

export function useCurrentShop() {
    const shops = useUserShops()
    // This would get the currently selected shop from context/state
    // For now, returning the first shop or null
    return shops.length > 0 ? shops[0] : null
}
