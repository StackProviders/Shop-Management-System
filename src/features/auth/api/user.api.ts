import { updateUserProfile, uploadUserPhoto, getCurrentUser } from '../services'

export const userApi = {
    updateProfile: async (name?: string, photo?: string): Promise<void> => {
        const user = getCurrentUser()
        if (!user) throw new Error('No user logged in')
        await updateUserProfile(user.uid, name, photo)
    },

    uploadPhoto: async (file: File): Promise<string> => {
        const user = getCurrentUser()
        if (!user) throw new Error('No user logged in')
        return uploadUserPhoto(user.uid, file)
    }
}
