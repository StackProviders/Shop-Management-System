import {
    updateUserProfile,
    uploadUserPhoto,
    getUserById
} from '@/services/auth/user.service'
import type { User } from '@/services/auth/types'

export const userApi = {
    async getById(userId: string): Promise<User | null> {
        return await getUserById(userId)
    },

    async updateProfile(
        userId: string,
        name?: string,
        photo?: string
    ): Promise<void> {
        await updateUserProfile(userId, name, photo)
    },

    async uploadPhoto(userId: string, file: File): Promise<string> {
        return await uploadUserPhoto(userId, file)
    }
}
