import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth-store'

describe('Auth Logout Flow', () => {
    beforeEach(() => {
        useAuthStore.getState().reset()
    })

    it('should clear user on logout', () => {
        const mockUser = {
            uid: 'test-uid',
            email: 'test@example.com',
            createdAt: new Date(),
            lastLoginAt: new Date()
        }

        // Login
        useAuthStore.getState().setUser(mockUser)
        expect(useAuthStore.getState().isAuthenticated).toBe(true)
        expect(useAuthStore.getState().user).toEqual(mockUser)

        // Logout
        useAuthStore.getState().reset()
        expect(useAuthStore.getState().isAuthenticated).toBe(false)
        expect(useAuthStore.getState().user).toBeNull()
    })

    it('should not restore user after logout', () => {
        const mockUser = {
            uid: 'test-uid',
            email: 'test@example.com',
            createdAt: new Date(),
            lastLoginAt: new Date()
        }

        // Login
        useAuthStore.getState().setUser(mockUser)

        // Logout
        useAuthStore.getState().reset()

        // Verify state remains cleared
        expect(useAuthStore.getState().isAuthenticated).toBe(false)
        expect(useAuthStore.getState().user).toBeNull()
        expect(useAuthStore.getState().loading).toBe(false)
    })

    it('should handle multiple logout calls', () => {
        const mockUser = {
            uid: 'test-uid',
            email: 'test@example.com',
            createdAt: new Date(),
            lastLoginAt: new Date()
        }

        useAuthStore.getState().setUser(mockUser)

        // Multiple logouts
        useAuthStore.getState().reset()
        useAuthStore.getState().reset()
        useAuthStore.getState().reset()

        expect(useAuthStore.getState().isAuthenticated).toBe(false)
        expect(useAuthStore.getState().user).toBeNull()
    })
})
