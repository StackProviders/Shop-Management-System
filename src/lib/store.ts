import { LazyStore } from '@tauri-apps/plugin-store'

// Global store instances
export const authStore = new LazyStore('auth.json')
export const shopStore = new LazyStore('shop-settings.json')
export const appStore = new LazyStore('app-settings.json')

// Store keys
export const STORE_KEYS = {
    // Auth keys
    DEVICE_ID: 'deviceId',
    DEVICE_TOKEN: 'deviceToken',
    USER_ID: 'userId',
    USER_SESSION: 'userSession',
    LOGOUT_FLAG: 'logoutFlag',
    LAST_LOGIN_TYPE: 'lastLoginType',

    // Shop keys
    CURRENT_SHOP_ID: 'currentShopId',

    // App settings keys
    THEME: 'theme',
    LANGUAGE: 'language',
    NOTIFICATIONS_ENABLED: 'notificationsEnabled'
} as const

// Helper functions
export const storeHelpers = {
    async get<T>(store: LazyStore, key: string): Promise<T | null> {
        return (await store.get<T>(key)) || null
    },

    async set<T>(store: LazyStore, key: string, value: T): Promise<void> {
        await store.set(key, value)
        await store.save()
    },

    async delete(store: LazyStore, key: string): Promise<void> {
        await store.delete(key)
        await store.save()
    },

    async clear(store: LazyStore): Promise<void> {
        await store.clear()
        await store.save()
    }
}
