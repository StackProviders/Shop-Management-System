import { useAuthStore } from '@/stores/auth-store'

export const useCurrentUser = () => {
    return useAuthStore((state) => state.user)
}
