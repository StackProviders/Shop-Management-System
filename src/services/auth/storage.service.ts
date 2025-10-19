import { authStore, STORE_KEYS, storeHelpers } from '@/lib/store'
import { User } from './types'

export const saveUserSession = async (user: User): Promise<void> => {
    await storeHelpers.set(authStore, STORE_KEYS.USER_SESSION, user)
}

export const getUserSession = async (): Promise<User | null> => {
    return await storeHelpers.get<User>(authStore, STORE_KEYS.USER_SESSION)
}

export const clearUserSession = async (): Promise<void> => {
    await storeHelpers.delete(authStore, STORE_KEYS.USER_SESSION)
}

export const setLogoutFlag = async (): Promise<void> => {
    await storeHelpers.set(authStore, STORE_KEYS.LOGOUT_FLAG, true)
}

export const getLogoutFlag = async (): Promise<boolean> => {
    return (
        (await storeHelpers.get<boolean>(authStore, STORE_KEYS.LOGOUT_FLAG)) ||
        false
    )
}

export const clearLogoutFlag = async (): Promise<void> => {
    await storeHelpers.delete(authStore, STORE_KEYS.LOGOUT_FLAG)
}

export const saveLastLoginType = async (
    type: 'email' | 'phone'
): Promise<void> => {
    await storeHelpers.set(authStore, STORE_KEYS.LAST_LOGIN_TYPE, type)
}

export const getLastLoginType = async (): Promise<'email' | 'phone'> => {
    return (
        (await storeHelpers.get<'email' | 'phone'>(
            authStore,
            STORE_KEYS.LAST_LOGIN_TYPE
        )) || 'phone'
    )
}
