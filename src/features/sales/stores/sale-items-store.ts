import { create } from 'zustand'
import type { SaleItem } from '../types'
import { getSerialNumbersByItem } from '@/features/items/api/serial-numbers.api'

interface SaleItemRow extends SaleItem {
    serialNo?: string | string[]
    colour?: string
    material?: string
    unit?: string
}

interface SaleItemsState {
    items: SaleItemRow[]
    serialNumbersCache: Record<string, string[]>
    addItem: () => void
    removeItem: (index: number) => void
    updateItem: (
        index: number,
        field: keyof SaleItemRow,
        value: SaleItemRow[keyof SaleItemRow]
    ) => void
    clearItems: () => void
    fetchSerialNumbers: (shopId: string, itemId: string) => Promise<void>
    getSerialNumbers: (itemId: string) => string[]
}

export const useSaleItemsStore = create<SaleItemsState>((set, get) => ({
    items: [],
    serialNumbersCache: {},
    addItem: () =>
        set((state) => ({
            items: [
                ...state.items,
                {
                    itemId: '',
                    itemName: '',
                    quantity: 1,
                    price: 0,
                    total: 0,
                    serialNo: '',
                    colour: '',
                    material: '',
                    unit: 'NONE'
                }
            ]
        })),
    removeItem: (index) =>
        set((state) => ({
            items: state.items.filter((_, i) => i !== index)
        })),
    updateItem: (index, field, value) =>
        set((state) => {
            const items = [...state.items]
            items[index] = { ...items[index], [field]: value }

            const item = items[index]
            if (field === 'quantity' || field === 'price') {
                item.total = item.quantity * item.price
            }

            return { items }
        }),
    clearItems: () => set({ items: [], serialNumbersCache: {} }),
    fetchSerialNumbers: async (shopId, itemId) => {
        const cache = get().serialNumbersCache
        if (cache[itemId]) return

        try {
            const serials = await getSerialNumbersByItem(shopId, itemId)
            const availableSerials = serials
                .filter((s) => !s.isSold)
                .map((s) => s.serialNo)
            set((state) => ({
                serialNumbersCache: {
                    ...state.serialNumbersCache,
                    [itemId]: availableSerials
                }
            }))
        } catch (error) {
            console.error('Failed to fetch serial numbers:', error)
        }
    },
    getSerialNumbers: (itemId) => get().serialNumbersCache[itemId] || []
}))
