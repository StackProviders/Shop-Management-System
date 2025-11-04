import { useFirestore } from 'reactfire'
import { collection, doc, Timestamp } from 'firebase/firestore'
import {
    setDocWithTimeout,
    updateDocWithTimeout,
    deleteDocWithTimeout
} from '@/lib/firestore-utils'
import { toast } from 'sonner'

export function useCrudOperations<T>(collectionName: string, shopId: string) {
    const firestore = useFirestore()

    const create = async (
        data: Omit<T, 'id' | 'shopId' | 'createdAt' | 'updatedAt'>
    ) => {
        const toastId = toast.loading('Creating...')
        try {
            const newDocRef = doc(collection(firestore, collectionName))
            await setDocWithTimeout(newDocRef, {
                ...data,
                shopId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })
            toast.success('Created successfully', { id: toastId })
            return newDocRef.id
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    const update = async (id: string, data: Partial<T>) => {
        const toastId = toast.loading('Updating...')
        try {
            await updateDocWithTimeout(doc(firestore, collectionName, id), {
                ...data,
                updatedAt: Timestamp.now()
            })
            toast.success('Updated successfully', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    const remove = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            await deleteDocWithTimeout(doc(firestore, collectionName, id))
            toast.success('Deleted successfully', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    return { create, update, remove }
}
