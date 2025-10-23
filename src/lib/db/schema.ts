import { mapTo, data, rootCollection } from 'firestore-repository/schema'
import type { ShopStatus, ShopRole, ShopPermission } from '@/types/shop'

export type ShopData = Record<string, unknown> & {
    shopname: string
    logo_url?: string
    phone_number?: string
    email?: string
    shop_type?: string
    shop_category?: string
    shop_address?: string
    signature?: string
    status: ShopStatus
    created_userId: string
    createdAt: Date
    updatedAt: Date
}

export type ShopMemberData = Record<string, unknown> & {
    shopId: string
    userId: string
    role: ShopRole
    permissions: ShopPermission[]
    invitedBy: string
    joinedAt: Date
    createdAt: Date
    updatedAt: Date
}

export const shopsCollection = rootCollection({
    name: 'shops',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<ShopData>()
})

export const shopMembersCollection = rootCollection({
    name: 'shop_members',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<ShopMemberData>()
})

export type UserData = Record<string, unknown> & {
    email?: string
    displayName?: string
    photoURL?: string
    phone?: string
    name?: string
    photo?: string
    createdAt: Date
    lastLoginAt?: Date
}

export const usersCollection = rootCollection({
    name: 'users',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<UserData>()
})

export type UserIdentifierData = Record<string, unknown> & {
    uid: string
}

export const userIdentifiersCollection = rootCollection({
    name: 'user_identifiers',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<UserIdentifierData>()
})

export type OTPRequestData = Record<string, unknown> & {
    otpHash: string
    expiresAt: Date
    attempts: number
    createdAt: Date
}

export const otpRequestsCollection = rootCollection({
    name: 'otp_requests',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<OTPRequestData>()
})

export type TrustedDeviceData = Record<string, unknown> & {
    deviceTokenHash: string
    deviceInfo: string
    createdAt: Date
    expiresAt: Date
    revoked: boolean
}

export const trustedDevicesCollection = rootCollection({
    name: 'trusted_devices',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<TrustedDeviceData>()
})

export type DeviceData = Record<string, unknown> & {
    userId: string
    deviceId: string
    deviceName?: string
    trusted: boolean
    lastUsed: Date
    expiresAt: Date
    createdAt: Date
}

export const devicesCollection = rootCollection({
    name: 'devices',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<DeviceData>()
})

export type OTPData = Record<string, unknown> & {
    userId: string
    code: string
    expiresAt: Date
    verified: boolean
    createdAt: Date
}

export type PartyType = 'customer' | 'supplier'
export type PartyStatus = 'active' | 'inactive'

export type PartyData = Record<string, unknown> & {
    shopId: string
    type: PartyType
    name: string
    contactInfo: {
        phone?: string
        email?: string
        address?: string
    }
    balance: number
    status: PartyStatus
    createdAt: Date
    updatedAt: Date
}

export const partiesCollection = rootCollection({
    name: 'parties',
    id: mapTo('id'),
    // @ts-expect-error - firestore-repository DocumentData constraint issue
    data: data<PartyData>()
})
