import { usersRepo, getStorageInstance } from '@/lib/db'
import type { User } from '../types'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const normalizePhone = (phone: string): string => {
    return phone.replace(/\D/g, '')
}

export const ensureUserExists = async (
    identifier: string,
    type: 'email' | 'phone'
): Promise<string> => {
    const uid = crypto.randomUUID()
    const now = new Date()
    const existingUsers = await usersRepo.list()
    const user = existingUsers.find((u) => {
        if (type === 'email') return u.email === identifier
        return u.phone && normalizePhone(u.phone) === normalizePhone(identifier)
    })
    if (user) return user.id

    await usersRepo.set({
        id: uid,
        [type]: identifier,
        createdAt: now,
        lastLoginAt: now
    })
    return uid
}

export const getUserById = async (uid: string): Promise<User | null> => {
    console.log({ uid });
    const userData = await usersRepo.get({ id: uid })
    console.log({ userData });
    if (!userData) return null
    return {
        uid: userData.id,
        ...userData,
        lastLoginAt: userData.lastLoginAt || userData.createdAt
    }
}

export const updateUserLastLogin = async (uid: string): Promise<void> => {
    const user = await usersRepo.get({ id: uid })
    if (user) await usersRepo.set({ ...user, lastLoginAt: new Date() })
}

export const updateUserProfile = async (
    uid: string,
    name?: string,
    photo?: string
): Promise<void> => {
    const user = await usersRepo.get({ id: uid })
    if (!user) throw new Error('User not found')
    await usersRepo.set({
        ...user,
        ...(name !== undefined && { name }),
        ...(photo !== undefined && { photo })
    })
}

export const uploadUserPhoto = async (
    uid: string,
    file: File
): Promise<string> => {
    const storage = getStorageInstance()
    const storageRef = ref(storage, `users/${uid}/photo.jpg`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
}
