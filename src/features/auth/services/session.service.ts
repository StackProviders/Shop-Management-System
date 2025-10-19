import type { User } from '../types'

let currentUser: User | null = null
const listeners: ((user: User | null) => void)[] = []

export const setCurrentUser = (user: User | null): void => {
    currentUser = user
    listeners.forEach((listener) => listener(user))
    if (user) {
        localStorage.setItem('cached_user', JSON.stringify(user))
    } else {
        localStorage.removeItem('cached_user')
    }
}

export const getCurrentUser = (): User | null => {
    return currentUser
}

export const onAuthStateChange = (
    callback: (user: User | null) => void
): (() => void) => {
    listeners.push(callback)
    return () => {
        const index = listeners.indexOf(callback)
        if (index > -1) listeners.splice(index, 1)
    }
}

export const initSession = async (): Promise<User | null> => {
    const cached = localStorage.getItem('cached_user')
    if (cached) {
        try {
            currentUser = JSON.parse(cached)
            return currentUser
        } catch {
            return null
        }
    }
    return null
}

export const initAuth = async (): Promise<void> => {
    // Initialize auth state - placeholder for future auth initialization logic
}
