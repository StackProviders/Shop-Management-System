import { LazyStore } from '@tauri-apps/plugin-store'
import { User } from './types'
import { STORE_FILE, STORE_KEYS } from './constants'

const store = new LazyStore(STORE_FILE)

export const saveUserSession = async (user: User): Promise<void> => {
    await store.set(STORE_KEYS.USER_SESSION, user)
    await store.save()
}

export const getUserSession = async (): Promise<User | null> => {
    return (await store.get<User>(STORE_KEYS.USER_SESSION)) || null
}

export const clearUserSession = async (): Promise<void> => {
    await store.delete(STORE_KEYS.USER_SESSION)
    await store.save()
}

export const setLogoutFlag = async (): Promise<void> => {
    await store.set(STORE_KEYS.LOGOUT_FLAG, true)
    await store.save()
}

export const getLogoutFlag = async (): Promise<boolean> => {
    return (await store.get<boolean>(STORE_KEYS.LOGOUT_FLAG)) || false
}

export const clearLogoutFlag = async (): Promise<void> => {
    await store.delete(STORE_KEYS.LOGOUT_FLAG)
    await store.save()
}

export const saveLastLoginType = async (
    type: 'email' | 'phone'
): Promise<void> => {
    await store.set(STORE_KEYS.LAST_LOGIN_TYPE, type)
    await store.save()
}

export const getLastLoginType = async (): Promise<'email' | 'phone'> => {
    return (
        (await store.get<'email' | 'phone'>(STORE_KEYS.LAST_LOGIN_TYPE)) ||
        'phone'
    )
}
