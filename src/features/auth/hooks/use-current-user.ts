import { useAuthStore } from '@/stores/auth-store'

export function useCurrentUser() {
    const { user } = useAuthStore()
    return user
}

export function useAuthLoading() {
    const { loading } = useAuthStore()
    return loading
}

export function useAuthError() {
    const { error } = useAuthStore()
    return error
}

export function useIsAuthenticated() {
    const { user, loading } = useAuthStore()
    return !!user && !loading
}
