import type { User } from '../types'
import {
    sendOTP as sendOTPService,
    verifyOTP as verifyOTPService
} from './otp.service'
import {
    ensureUserExists,
    getUserById,
    updateUserLastLogin
} from './user.service'
import {
    trustDevice,
    verifyTrustedDevice,
    revokeDevice
} from './device.service'
import { setCurrentUser, initSession } from './session.service'

export const sendOTP = async (
    identifier: string,
    type: 'email' | 'phone'
): Promise<void> => {
    const uid = await ensureUserExists(identifier, type)
    await sendOTPService(identifier, uid)
}

const normalizePhone = (phone: string): string => {
    return phone.replace(/\D/g, '')
}

export const verifyOTP = async (
    identifier: string,
    otp: string,
    trustDeviceFlag = true
): Promise<User> => {
    const users = await import('@/lib/db').then((m) => m.usersRepo.list())
    const isEmail = identifier.includes('@')
    const user = users.find((u) => {
        if (isEmail) return u.email === identifier
        return u.phone && normalizePhone(u.phone) === normalizePhone(identifier)
    })
    if (!user) throw new Error('User not found')

    await verifyOTPService(user.id, otp)
    await updateUserLastLogin(user.id)

    if (trustDeviceFlag) await trustDevice(user.id)

    const userData = await getUserById(user.id)
    if (!userData) throw new Error('Failed to get user data')

    setCurrentUser(userData)
    return userData
}

export const checkDeviceAndLogin = async (
    identifier: string
): Promise<User | null> => {
    const userId = await verifyTrustedDevice()
    if (!userId) return null

    const user = await getUserById(userId)
    if (!user) return null

    const isEmail = identifier.includes('@')
    const matches = isEmail
        ? user.email === identifier
        : user.phone &&
          normalizePhone(user.phone) === normalizePhone(identifier)

    if (!matches) return null

    await updateUserLastLogin(userId)
    setCurrentUser(user)
    return user
}

export const loginWithTrustedDevice = async (): Promise<User | null> => {
    const userId = await verifyTrustedDevice()
    if (!userId) return null

    const user = await getUserById(userId)
    if (user) {
        await updateUserLastLogin(userId)
        setCurrentUser(user)
    }
    return user
}

export const logout = async (revokeDeviceFlag?: boolean): Promise<void> => {
    const user = await import('./session.service').then((m) =>
        m.getCurrentUser()
    )
    if (user && revokeDeviceFlag) {
        await revokeDevice(user.uid)
    }
    setCurrentUser(null)
}

export const initAuth = async (): Promise<void> => {
    await initSession()
}
