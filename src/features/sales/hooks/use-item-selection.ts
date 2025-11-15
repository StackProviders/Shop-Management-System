import { useSaleItemsStore } from '../stores/sale-items-store'
import type { Item } from '@/features/items'

export function useItemSelection(shopId: string) {
    const { updateItem, fetchSerialNumbers } = useSaleItemsStore()

    const handleItemSelect = async (
        index: number,
        itemId: string,
        items: Item[]
    ) => {
        const selectedItem = items.find((i) => i.id === itemId)
        if (!selectedItem) return

        updateItem(index, 'itemId', itemId)
        updateItem(index, 'itemName', selectedItem.name)
        updateItem(index, 'price', selectedItem.salePrice)
        updateItem(index, 'unit', selectedItem.unit || 'NONE')

        const colourField = selectedItem.customFields?.find(
            (f) => f.name.toLowerCase() === 'colour'
        )
        const materialField = selectedItem.customFields?.find(
            (f) => f.name.toLowerCase() === 'material'
        )

        if (colourField) updateItem(index, 'colour', colourField.value)
        if (materialField) updateItem(index, 'material', materialField.value)

        await fetchSerialNumbers(shopId, itemId)
    }

    return { handleItemSelect }
}
