import { collection, doc, Timestamp } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'
import {
    setDocWithTimeout,
    updateDocWithTimeout,
    deleteDocWithTimeout
} from '@/lib/firestore-utils'
import { CreatePartyData, UpdatePartyData } from '../types'

export function usePartyMutations(shopId: string) {
    const firestore = useFirestore()

    const createParty = async (data: CreatePartyData) => {
        const toastId = toast.loading('Creating party...')
        try {
            const newDocRef = doc(collection(firestore, 'parties'))
            await setDocWithTimeout(newDocRef, {
                shopId,
                type: data.type,
                name: data.name,
                contactInfo: data.contactInfo || {},
                balance: data.balance || 0,
                status: data.status || 'active',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })
            toast.success('Party created', { id: toastId })
            return newDocRef.id
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to create',
                { id: toastId }
            )
            throw error
        }
    }

    const updateParty = async (partyId: string, data: UpdatePartyData) => {
        const toastId = toast.loading('Updating party...')
        try {
            await updateDocWithTimeout(doc(firestore, 'parties', partyId), {
                ...data,
                updatedAt: Timestamp.now()
            })
            toast.success('Party updated', { id: toastId })
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to update',
                { id: toastId }
            )
            throw error
        }
    }

    const deleteParty = async (partyId: string) => {
        const toastId = toast.loading('Deleting party...')
        try {
            await deleteDocWithTimeout(doc(firestore, 'parties', partyId))
            toast.success('Party deleted', { id: toastId })
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to delete',
                { id: toastId }
            )
            throw error
        }
    }

    return { createParty, updateParty, deleteParty }
}
