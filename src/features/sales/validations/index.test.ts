import { describe, it, expect } from 'vitest'
import { saleSchema } from './index'

describe('saleSchema', () => {
    const validItem = {
        itemId: 'item-1',
        itemName: 'Test Item',
        quantity: 1,
        price: 100,
        total: 100
    }

    const baseSale = {
        invoiceNumber: 'INV-123456',
        paymentStatus: 'paid',
        paidAmount: 100,
        roundOff: 0,
        discount: 0,
        items: []
    }

    it('should validate a standard valid sale', () => {
        const result = saleSchema.safeParse({
            ...baseSale,
            items: [validItem]
        })
        expect(result.success).toBe(true)
    })

    it('should filter out null items', () => {
        const result = saleSchema.safeParse({
            ...baseSale,
            items: [validItem, null]
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.items).toHaveLength(1)
            expect(result.data.items[0].itemId).toBe('item-1')
        }
    })

    it('should filter out empty objects (no itemId)', () => {
        const result = saleSchema.safeParse({
            ...baseSale,
            items: [validItem, {}]
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.items).toHaveLength(1)
        }
    })

    it('should filter out items with empty itemId', () => {
        const result = saleSchema.safeParse({
            ...baseSale,
            items: [validItem, { itemId: '' }]
        })
        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data.items).toHaveLength(1)
        }
    })

    it('should fail if all items are filtered out', () => {
        const result = saleSchema.safeParse({
            ...baseSale,
            items: [null, {}, { itemId: '' }]
        })
        expect(result.success).toBe(false)
        if (!result.success) {
            expect(result.error.issues[0].message).toBe(
                'At least one item is required'
            )
        }
    })
})
