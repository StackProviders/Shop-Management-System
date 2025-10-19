import {
    updateProfile as updateProfileService,
    uploadPhoto as uploadPhotoService
} from '@/services/auth'

export const userApi = {
    updateProfile: async (name?: string, photo?: string): Promise<void> => {
        return updateProfileService(name, photo)
    },

    uploadPhoto: async (file: File): Promise<string> => {
        return uploadPhotoService(file)
    }
}
