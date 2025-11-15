import { create } from 'zustand'
import type { SaleItem } from '../types'

interface SaleItemRow extends SaleItem {
    serialNo?: string
    colour?: string
    material?: string
    unit?: string
}

interface SaleItemsState {
    items: SaleItemRow[]
    addItem: () => void
    removeItem: (index: number) => void
    updateItem: (index: number, field: keyof SaleItemRow, value: any) => void
    clearItems: () => void
}

export const useSaleItemsStore = create<SaleItemsState>((set) => ({
    items: [],
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
    clearItems: () => set({ items: [] })
}))
