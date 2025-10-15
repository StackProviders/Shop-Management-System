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
