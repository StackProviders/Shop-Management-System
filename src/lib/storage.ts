import {
    getStorage,
    ref,
    deleteObject,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage'
import { app } from './firebase'

const storage = getStorage(app)

/**
 * Deletes a single image from Firebase Storage
 */
export async function deleteImage(url: string): Promise<void> {
    try {
        const imageRef = ref(storage, url)
        await deleteObject(imageRef)
    } catch (error) {
        console.error('Failed to delete image:', error)
        throw error
    }
}

/**
 * Deletes multiple images from Firebase Storage
 */
export async function deleteImages(urls: string[]): Promise<void> {
    await Promise.allSettled(urls.map((url) => deleteImage(url)))
}

/**
 * Deletes unused images by comparing current and initial image lists
 */
export async function deleteUnusedImages(
    currentImages: string[],
    initialImages: string[]
): Promise<void> {
    const unusedImages = currentImages.filter(
        (img) => !initialImages.includes(img)
    )
    if (unusedImages.length > 0) {
        await deleteImages(unusedImages)
    }
}

/**
 * Uploads an image to Firebase Storage
 */
export async function uploadImage(file: File, path: string): Promise<string> {
    const imageRef = ref(storage, path)
    await uploadBytes(imageRef, file)
    return getDownloadURL(imageRef)
}

/**
 * Uploads multiple images to Firebase Storage
 */
export async function uploadImages(
    files: File[],
    basePath: string
): Promise<string[]> {
    const uploadPromises = files.map((file, index) => {
        const path = `${basePath}/${Date.now()}-${index}-${file.name}`
        return uploadImage(file, path)
    })
    return Promise.all(uploadPromises)
}
