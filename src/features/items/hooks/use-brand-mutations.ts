import { collection, doc, Timestamp } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'
import { setDocWithTimeout } from '@/lib/firestore-utils'
import type { CreateBrandData } from '../types/brand'

export function useBrandMutations(shopId: string) {
    const firestore = useFirestore()

    const createBrand = async (data: CreateBrandData) => {
        const toastId = toast.loading('Creating brand...')
        try {
            const newDocRef = doc(collection(firestore, 'brands'))
            await setDocWithTimeout(newDocRef, {
                ...data,
                shopId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })
            toast.success('Brand created', { id: toastId })
            return newDocRef.id
        } catch (error) {
            toast.error('Failed to create brand', { id: toastId })
            throw error
        }
    }

    return { createBrand }
}
