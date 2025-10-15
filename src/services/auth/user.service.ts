import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { User } from './types'
import { COLLECTIONS } from './constants'
import { v4 as uuidv4 } from 'uuid'

export const ensureUserExists = async (
    identifier: string,
    type: 'email' | 'phone'
): Promise<string> => {
    const indexDoc = await getDoc(doc(db, 'user_identifiers', identifier))

    if (indexDoc.exists()) {
        return indexDoc.data().uid
    }

    const uid = uuidv4()
    await setDoc(doc(db, COLLECTIONS.USERS, uid), {
        email: type === 'email' ? identifier : null,
        phone: type === 'phone' ? identifier : null,
        name: null,
        photo: null,
        createdAt: Timestamp.now(),
        lastLoginAt: null
    })

    await setDoc(doc(db, 'user_identifiers', identifier), { uid })

    return uid
}

export const getUserById = async (userId: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(db, COLLECTIONS.USERS, userId))
    if (!userDoc.exists()) return null

    const userData = userDoc.data()
    return {
        uid: userId,
        email: userData.email || undefined,
        phone: userData.phone || undefined,
        name: userData.name || undefined,
        photo: userData.photo || undefined,
        createdAt: userData.createdAt.toDate(),
        lastLoginAt: userData.lastLoginAt?.toDate() || new Date()
    }
}

export const updateUserLastLogin = async (userId: string): Promise<void> => {
    await updateDoc(doc(db, COLLECTIONS.USERS, userId), {
        lastLoginAt: Timestamp.now()
    })
}

export const updateUserProfile = async (
    userId: string,
    name?: string,
    photo?: string
): Promise<void> => {
    const updates: Record<string, string | null> = {}
    if (name !== undefined) updates.name = name
    if (photo !== undefined) updates.photo = photo

    await updateDoc(doc(db, COLLECTIONS.USERS, userId), updates)
}

export const uploadUserPhoto = async (
    userId: string,
    file: File
): Promise<string> => {
    const storageRef = ref(storage, `profile-photos/${userId}`)
    await uploadBytes(storageRef, file)
    return await getDownloadURL(storageRef)
}
