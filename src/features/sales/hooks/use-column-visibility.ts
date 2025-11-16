import { useState, useEffect } from 'react'
import { saleStore, STORE_KEYS, storeHelpers } from '@/lib/store'
import type { ItemSettings } from '@/features/items/types/settings'

export interface ColumnVisibility {
    [key: string]: boolean
}

export function useColumnVisibility(shopId: string, settings: ItemSettings) {
    const [visibility, setVisibility] = useState<ColumnVisibility>({})
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const loadVisibility = async () => {
            const stored = await storeHelpers.get<
                Record<string, ColumnVisibility>
            >(saleStore, STORE_KEYS.SALE_COLUMN_VISIBILITY)
            setVisibility(stored?.[shopId] || {})
            setIsLoaded(true)
        }
        loadVisibility()
    }, [shopId])

    useEffect(() => {
        if (!isLoaded) return
        const saveVisibility = async () => {
            const allSettings =
                (await storeHelpers.get<Record<string, ColumnVisibility>>(
                    saleStore,
                    STORE_KEYS.SALE_COLUMN_VISIBILITY
                )) || {}
            await storeHelpers.set(
                saleStore,
                STORE_KEYS.SALE_COLUMN_VISIBILITY,
                {
                    ...allSettings,
                    [shopId]: visibility
                }
            )
        }
        saveVisibility()
    }, [visibility, shopId, isLoaded])

    const toggleColumn = (column: string) => {
        setVisibility((prev) => ({ ...prev, [column]: !prev[column] }))
    }

    const availableColumns = [
        ...(settings.customFieldNames?.map((f) => f.name.toLowerCase()) || []),
        ...(settings.customFieldSettings.warranty ? ['warranty'] : [])
    ]

    return { visibility, toggleColumn, availableColumns }
}
