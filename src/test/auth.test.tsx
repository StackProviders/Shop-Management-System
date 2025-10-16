import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth-store'

describe('Auth Store', () => {
    beforeEach(() => {
        useAuthStore.getState().reset()
    })

    it('should initialize with unauthenticated state', () => {
        useAuthStore.setState({ loading: true })
        const { isAuthenticated, user, loading } = useAuthStore.getState()
        expect(isAuthenticated).toBe(false)
        expect(user).toBeNull()
        expect(loading).toBe(true)
    })

    it('should set user and mark as authenticated', () => {
        const mockUser = {
            uid: 'test-uid',
            email: 'test@example.com',
            createdAt: new Date(),
            lastLoginAt: new Date()
        }

        useAuthStore.getState().setUser(mockUser)

        const { isAuthenticated, user } = useAuthStore.getState()
        expect(isAuthenticated).toBe(true)
        expect(user).toEqual(mockUser)
    })

    it('should reset state on logout', () => {
        const mockUser = {
            uid: 'test-uid',
            email: 'test@example.com',
            createdAt: new Date(),
            lastLoginAt: new Date()
        }

        useAuthStore.getState().setUser(mockUser)
        expect(useAuthStore.getState().isAuthenticated).toBe(true)

        useAuthStore.getState().reset()

        const { isAuthenticated, user, loading } = useAuthStore.getState()
        expect(isAuthenticated).toBe(false)
        expect(user).toBeNull()
        expect(loading).toBe(false)
    })

    it('should set loading state', () => {
        useAuthStore.getState().setLoading(true)
        expect(useAuthStore.getState().loading).toBe(true)

        useAuthStore.getState().setLoading(false)
        expect(useAuthStore.getState().loading).toBe(false)
    })

    it('should set error state', () => {
        const errorMessage = 'Test error'
        useAuthStore.getState().setError(errorMessage)
        expect(useAuthStore.getState().error).toBe(errorMessage)
    })
})
