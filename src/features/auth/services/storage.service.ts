import { authStore, STORE_KEYS, storeHelpers } from '@/lib/store'

export const getLogoutFlag = async (): Promise<boolean> => {
    return (
        (await storeHelpers.get<boolean>(authStore, STORE_KEYS.LOGOUT_FLAG)) ??
        false
    )
}

export const setLogoutFlag = async (): Promise<void> => {
    await storeHelpers.set(authStore, STORE_KEYS.LOGOUT_FLAG, true)
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
        )) ?? 'email'
    )
}
