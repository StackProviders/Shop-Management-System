import { User } from './types'
import {
    sendOTP as sendOTPRequest,
    verifyOTP as verifyOTPRequest
} from './otp.service'
import {
    ensureUserExists,
    getUserById,
    updateUserLastLogin,
    updateUserProfile as updateUserProfileData,
    uploadUserPhoto
} from './user.service'
import {
    trustDevice,
    verifyTrustedDevice,
    revokeDevice,
    clearDeviceSession
} from './device.service'
import {
    setCurrentUser,
    getCurrentUser,
    onAuthStateChange,
    initSession
} from './session.service'
import { cleanupExpiredDevices } from './cleanup.service'

export const sendOTP = async (
    identifier: string,
    type: 'email' | 'phone'
): Promise<void> => {
    const uid = await ensureUserExists(identifier, type)
    await sendOTPRequest(identifier, uid)
}

export const verifyOTP = async (
    identifier: string,
    otp: string,
    shouldTrustDevice: boolean = false
): Promise<User> => {
    const type = identifier.includes('@') ? 'email' : 'phone'
    const uid = await ensureUserExists(identifier, type)
    await verifyOTPRequest(uid, otp)

    const user = await getUserById(uid)
    if (!user) throw new Error('User not found')

    await updateUserLastLogin(uid)
    cleanupExpiredDevices(uid).catch(console.error)

    if (shouldTrustDevice) {
        await trustDevice(uid)
    }

    setCurrentUser(user)
    return user
}

export const loginWithTrustedDevice = async (): Promise<User | null> => {
    const userId = await verifyTrustedDevice()
    if (!userId) return null

    const user = await getUserById(userId)
    if (!user) return null

    await updateUserLastLogin(userId)
    cleanupExpiredDevices(userId).catch(console.error)
    setCurrentUser(user)

    return user
}

export const checkDeviceAndLogin = async (
    identifier: string
): Promise<User | null> => {
    const type = identifier.includes('@') ? 'email' : 'phone'
    const uid = await ensureUserExists(identifier, type)

    const userId = await verifyTrustedDevice()
    if (!userId || userId !== uid) return null

    const user = await getUserById(userId)
    if (!user) return null

    await updateUserLastLogin(userId)
    cleanupExpiredDevices(userId).catch(console.error)
    setCurrentUser(user)

    return user
}

export const updateProfile = async (
    name?: string,
    photo?: string
): Promise<void> => {
    const user = getCurrentUser()
    if (!user) throw new Error('No user logged in')

    await updateUserProfileData(user.uid, name, photo)
    setCurrentUser({ ...user, name, photo })
}

export const uploadPhoto = async (file: File): Promise<string> => {
    const user = getCurrentUser()
    if (!user) throw new Error('No user logged in')

    const photoURL = await uploadUserPhoto(user.uid, file)
    await updateProfile(undefined, photoURL)

    return photoURL
}

export const logout = async (
    shouldRevokeDevice: boolean = false
): Promise<void> => {
    if (shouldRevokeDevice) {
        const user = getCurrentUser()
        if (user) {
            await revokeDevice(user.uid)
            await clearDeviceSession()
        }
    }

    setCurrentUser(null)
}

export const initAuth = async (): Promise<void> => {
    const cachedUser = await initSession()
    if (cachedUser) {
        setCurrentUser(cachedUser)
    }

    try {
        const user = await loginWithTrustedDevice()
        if (user && (!cachedUser || user.uid !== cachedUser.uid)) {
            setCurrentUser(user)
        }
    } catch (error) {
        console.error('Auto-login failed:', error)
        if (cachedUser) {
            setCurrentUser(null)
        }
    }
}

export { getCurrentUser, onAuthStateChange, initSession }
