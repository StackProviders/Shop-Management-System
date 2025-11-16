import { useCrudOperations } from '@/features/shared'
import type { Item } from '../types'
import {
    createSerialNumbers,
    removeSerialNumbersByItem
} from '../api/serial-numbers.api'
import { createStockTransaction } from '../api/stock-transactions-mutations.api'

type ItemWithSerialNumbers = Omit<
    Item,
    'id' | 'shopId' | 'createdAt' | 'updatedAt'
> & { serialNumbers?: string[] }

export function useItemActions(shopId: string) {
    const { create, update, remove } = useCrudOperations<Item>('items', shopId)

    const createItem = async (
        data: ItemWithSerialNumbers
    ): Promise<string | undefined> => {
        const { serialNumbers, ...itemData } = data
        const itemId = await create(
            itemData as Omit<Item, 'id' | 'shopId' | 'createdAt' | 'updatedAt'>
        )

        if (itemId) {
            if (serialNumbers && serialNumbers.length > 0) {
                await createSerialNumbers(shopId, itemId, serialNumbers)
            }

            if (itemData.openingStock && itemData.openingStock > 0) {
                await createStockTransaction(
                    shopId,
                    itemId,
                    'Opening Stock',
                    itemData.openingStock,
                    itemData.purchasePrice
                )
            }
        }

        return itemId
    }

    const updateItem = async (
        id: string,
        data: Partial<ItemWithSerialNumbers>
    ): Promise<void> => {
        const { serialNumbers, ...itemData } = data
        await update(id, itemData)

        if (serialNumbers !== undefined) {
            await removeSerialNumbersByItem(shopId, id)
            if (serialNumbers.length > 0) {
                await createSerialNumbers(shopId, id, serialNumbers)
            }
        }
    }

    const deleteItem = async (id: string): Promise<void> => {
        await removeSerialNumbersByItem(shopId, id)
        await remove(id)
    }

    return {
        createItem,
        updateItem,
        deleteItem
    }
}
