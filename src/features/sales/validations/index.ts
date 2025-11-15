import { z } from 'zod'

export const saleItemSchema = z.object({
    itemId: z.string().min(1, 'Item is required'),
    itemName: z.string(),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be positive'),
    discount: z.number().min(0).optional(),
    taxRate: z.number().min(0).max(100).optional(),
    total: z.number()
})

export const saleSchema = z.object({
    partyId: z.string().optional(),
    partyName: z.string().optional(),
    items: z.array(saleItemSchema).min(1, 'At least one item is required'),
    discount: z.number().min(0).default(0),
    paymentStatus: z.enum(['paid', 'unpaid', 'partial']),
    paymentMethod: z.enum(['cash', 'card', 'upi', 'other']).optional(),
    notes: z.string().optional()
})

export type SaleFormData = z.infer<typeof saleSchema>
