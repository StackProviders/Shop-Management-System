import { useAuthStore } from '@/stores/auth-store'

export const useAuthState = () => {
    const { user, isAuthenticated, loading, error } = useAuthStore()

    return {
        user,
        isAuthenticated,
        loading,
        error
    }
}
