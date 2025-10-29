export * from './schema'
export * from './queries'
export { Repository } from './repositories'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getApp } from 'firebase/app'

export const getDatabase = () => getFirestore(getApp())
export const getStorageInstance = () => getStorage(getApp())

import { Repository } from './repositories'
import type {
    UserData,
    ShopData,
    ShopMemberData,
    DeviceData,
    OTPData
} from './schema'

export const usersRepo = new Repository<UserData & { id: string }>('users')
export const shopsRepo = new Repository<ShopData & { id: string }>('shops')
export const shopMembersRepo = new Repository<ShopMemberData & { id: string }>(
    'shop_members'
)
export const devicesRepo = new Repository<DeviceData & { id: string }>(
    'devices'
)
export const otpsRepo = new Repository<OTPData & { id: string }>('otps')
