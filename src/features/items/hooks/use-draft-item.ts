import { useState, useEffect } from 'react'
import { useShopContext } from '@/features/shop'
import type { ItemFormData } from '../validations/item.validation'

interface DraftItem {
    images: string[]
    formData?: Partial<ItemFormData>
}

export function useDraftItem(itemId?: string) {
    const { currentShop } = useShopContext()
    const draftKey = `draft-item-${currentShop?.shopId || 'temp'}-${itemId || 'new'}`

    const [draftImages, setDraftImages] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem(draftKey)
        if (saved) {
            try {
                const draft: DraftItem = JSON.parse(saved)
                setDraftImages(draft.images || [])
            } catch (e) {
                console.error('Failed to load draft:', e)
            }
        }
    }, [draftKey])

    const saveDraftImages = (images: string[]) => {
        setDraftImages(images)
        const draft: DraftItem = { images }
        localStorage.setItem(draftKey, JSON.stringify(draft))
    }

    const clearDraft = () => {
        localStorage.removeItem(draftKey)
        setDraftImages([])
    }

    return {
        draftImages,
        saveDraftImages,
        clearDraft
    }
}
