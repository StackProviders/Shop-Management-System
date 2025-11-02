import { doc, Timestamp } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'
import { setDocWithTimeout } from '@/lib/firestore-utils'
import type { UpdateItemSettingsData } from '../types/settings'

export function useItemSettingsActions(shopId: string) {
    const firestore = useFirestore()

    const updateSettings = async (data: UpdateItemSettingsData) => {
        const toastId = toast.loading('Saving settings...')

        try {
            await setDocWithTimeout(
                doc(firestore, 'itemSettings', shopId),
                {
                    ...data,
                    shopId,
                    updatedAt: Timestamp.now()
                },
                { merge: true }
            )

            toast.success('Settings saved', { id: toastId })
        } catch (error) {
            toast.error('Failed to save settings', { id: toastId })
            throw error
        }
    }

    return { updateSettings }
}
