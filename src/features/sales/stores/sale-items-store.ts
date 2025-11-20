import { create } from 'zustand'
import type { SaleItemRow } from '../types'
import { getSerialNumbersByItem } from '@/features/items/api/serial-numbers.api'

interface SaleItemsState {
    items: SaleItemRow[]
    serialNumbersCache: Record<string, string[]>
    addItem: () => void
    addItemWithDetails: (item: Partial<SaleItemRow>) => void
    removeItem: (index: number) => void
    updateItem: (
        index: number,
        field: keyof SaleItemRow,
        value: SaleItemRow[keyof SaleItemRow]
    ) => void
    updateItemBatch: (index: number, updates: Partial<SaleItemRow>) => void
    reorderItems: (fromId: string, toId: string) => void
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
                    id: `item-${Date.now()}-${Math.random()}`,
                    itemId: '',
                    itemName: '',
                    quantity: 1,
                    price: 0,
                    total: 0,
                    serialNo: '',
                    colour: '',
                    material: '',
                    warranty: undefined,
                    unit: 'none'
                }
            ]
        })),
    addItemWithDetails: (item: Partial<SaleItemRow>) =>
        set((state) => ({
            items: [
                ...state.items,
                {
                    id: `item-${Date.now()}-${Math.random()}`,
                    itemId: '',
                    itemName: '',
                    quantity: 1,
                    price: 0,
                    total: 0,
                    serialNo: '',
                    colour: '',
                    material: '',
                    warranty: undefined,
                    unit: 'none',
                    ...item
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
    updateItemBatch: (index, updates) =>
        set((state) => {
            const items = [...state.items]
            items[index] = { ...items[index], ...updates }

            const item = items[index]
            if ('quantity' in updates || 'price' in updates) {
                item.total = item.quantity * item.price
            }

            return { items }
        }),
    reorderItems: (fromId, toId) =>
        set((state) => {
            const items = [...state.items]
            const fromIndex = items.findIndex((item) => item.id === fromId)
            const toIndex = items.findIndex((item) => item.id === toId)
            if (fromIndex === -1 || toIndex === -1) return state
            const [movedItem] = items.splice(fromIndex, 1)
            items.splice(toIndex, 0, movedItem)
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
