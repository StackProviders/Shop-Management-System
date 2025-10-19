import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { usersRepo, userIdentifiersRepo } from '@/lib/db'
import type { UserData, UserIdentifierData } from '@/lib/db'
import { User } from './types'
import { v4 as uuidv4 } from 'uuid'

export const ensureUserExists = async (
    identifier: string,
    type: 'email' | 'phone'
): Promise<string> => {
    const indexDoc = await userIdentifiersRepo.get({ id: identifier })

    if (indexDoc) {
        return indexDoc.uid
    }

    const uid = uuidv4()
    const now = new Date()

    const newUser: UserData & { id: string } = {
        id: uid,
        email: type === 'email' ? identifier : undefined,
        phone: type === 'phone' ? identifier : undefined,
        name: undefined,
        photo: undefined,
        createdAt: now,
        lastLoginAt: undefined
    }

    await usersRepo.set(newUser)

    const userIdentifier: UserIdentifierData & { id: string } = {
        id: identifier,
        uid
    }

    await userIdentifiersRepo.set(userIdentifier)

    return uid
}

export const getUserById = async (userId: string): Promise<User | null> => {
    const user = await usersRepo.get({ id: userId })
    if (!user) return null

    return {
        uid: userId,
        email: user.email,
        phone: user.phone,
        name: user.name,
        photo: user.photo,
        createdAt:
            user.createdAt instanceof Date
                ? user.createdAt
                : new Date(user.createdAt),
        lastLoginAt: user.lastLoginAt
            ? user.lastLoginAt instanceof Date
                ? user.lastLoginAt
                : new Date(user.lastLoginAt)
            : new Date()
    }
}

export const updateUserLastLogin = async (userId: string): Promise<void> => {
    const user = await usersRepo.get({ id: userId })
    if (user) {
        await usersRepo.set({ ...user, lastLoginAt: new Date() })
    }
}

export const updateUserProfile = async (
    userId: string,
    name?: string,
    photo?: string
): Promise<void> => {
    const user = await usersRepo.get({ id: userId })
    if (user) {
        const updates: Partial<typeof user> = {}
        if (name !== undefined) updates.name = name
        if (photo !== undefined) updates.photo = photo
        await usersRepo.set({ ...user, ...updates })
    }
}

export const uploadUserPhoto = async (
    userId: string,
    file: File
): Promise<string> => {
    const storageRef = ref(storage, `profile-photos/${userId}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
}
