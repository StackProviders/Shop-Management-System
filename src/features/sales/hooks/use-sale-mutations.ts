import { useCrudOperations } from '@/features/shared'
import type { Sale, CreateSaleData } from '../types'

export function useSaleMutations(shopId: string) {
    const { create, update, remove } = useCrudOperations<Sale>('sales', shopId)

    const createSale = async (data: CreateSaleData) => {
        // Invoice number is now passed from the form data
        const invoiceNumber =
            data.invoiceNumber ||
            `INV-${Math.floor(100000 + Math.random() * 900000)}`
        const items = data.items
        const subtotal = items.reduce((sum, item) => sum + item.total, 0)
        const discount = data.discount || 0
        const tax = items.reduce((sum, item) => {
            const taxAmount = item.total * ((item.taxRate || 0) / 100)
            return sum + taxAmount
        }, 0)
        const total = subtotal - discount + tax

        return create({
            ...data,
            invoiceNumber,
            subtotal,
            discount,
            tax,
            total
        })
    }

    return { createSale, updateSale: update, deleteSale: remove }
}
