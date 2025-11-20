import { useCallback } from 'react'
import { useSaleItemsStore } from '../stores/sale-items-store'
import type { Item } from '@/features/items'

export function useItemSelection(shopId: string) {
    const { updateItemBatch, fetchSerialNumbers } = useSaleItemsStore()

    const handleItemSelect = useCallback(
        async (index: number, itemId: string, items: Item[]) => {
            const selectedItem = items.find((i) => i.id === itemId)
            if (!selectedItem) return

            // Prepare batch updates with item defaults
            const updates: Record<string, unknown> = {
                itemId,
                itemName: selectedItem.name,
                price: selectedItem.salePrice ?? 0,
                unit: selectedItem.unit || 'none',
                quantity: 1
            }

            // Set warranty from direct field or customFields
            const directWarranty = (
                selectedItem as Item & {
                    warranty?: { label: string; days: number }
                }
            ).warranty
            if (directWarranty?.label && directWarranty?.days) {
                updates.warranty = directWarranty
            } else {
                const warrantyField = selectedItem.customFields?.find(
                    (f) => f.name.toLowerCase() === 'warranty'
                )
                if (warrantyField?.value) {
                    try {
                        const warranty =
                            typeof warrantyField.value === 'string'
                                ? JSON.parse(warrantyField.value)
                                : warrantyField.value
                        if (warranty?.label && warranty?.days) {
                            updates.warranty = warranty
                        }
                    } catch {
                        // Invalid warranty format, skip
                    }
                }
            }

            // Set other custom fields
            selectedItem.customFields?.forEach((field) => {
                const fieldName = field.name.toLowerCase()
                if (fieldName !== 'warranty' && field.value) {
                    updates[fieldName] = field.value
                }
            })

            // Apply all updates in one batch
            updateItemBatch(index, updates)

            // Fetch serial numbers if needed
            await fetchSerialNumbers(shopId, itemId)
        },
        [shopId, updateItemBatch, fetchSerialNumbers]
    )

    return { handleItemSelect }
}
