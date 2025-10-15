import { User } from './types'
import {
    saveUserSession,
    getUserSession,
    clearUserSession
} from './storage.service'

let currentUser: User | null = null
const authListeners: ((user: User | null) => void)[] = []

export const setCurrentUser = (user: User | null): void => {
    currentUser = user
    if (user) {
        saveUserSession(user)
    } else {
        clearUserSession()
    }
    authListeners.forEach((cb) => cb(user))
}

export const getCurrentUser = (): User | null => currentUser

export const initSession = async (): Promise<User | null> => {
    if (!currentUser) {
        currentUser = await getUserSession()
    }
    return currentUser
}

export const onAuthStateChange = (
    callback: (user: User | null) => void
): (() => void) => {
    authListeners.push(callback)
    callback(currentUser)
    return () => {
        const index = authListeners.indexOf(callback)
        if (index > -1) authListeners.splice(index, 1)
    }
}
