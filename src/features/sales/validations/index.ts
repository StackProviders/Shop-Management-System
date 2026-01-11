import { z } from 'zod'

// Helper to transform empty strings to undefined
const optionalString = z
    .string()
    .transform((e) => (e === '' ? undefined : e))
    .optional()

export const saleItemSchema = z.object({
    itemId: z.string().min(1, 'Item is required'),
    itemName: z.string(),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price must be positive'),
    discount: z.number().min(0).optional(),
    taxRate: z.number().min(0).max(100).optional(),
    total: z.number(),
    // Allow single string or array of strings for serial numbers
    serialNo: z.union([z.string(), z.array(z.string())]).optional(),
    colour: optionalString,
    material: optionalString,
    unit: optionalString,
    warranty: z
        .object({
            label: z.string(),
            days: z.number()
        })
        .optional()
})

export const saleSchema = z.object({
    invoiceNumber: z.string().min(1, 'Invoice number is required'),
    partyId: optionalString,
    partyName: optionalString,
    items: z.array(saleItemSchema).min(1, 'At least one item is required'),
    discount: z.number().min(0),
    discountType: z.enum(['percent', 'flat']),
    taxRate: z.number().min(0).optional(),
    paymentStatus: z.enum(['paid', 'unpaid', 'partial']),
    paymentMethod: z.enum(['cash', 'card', 'upi', 'other']).optional(),
    paidAmount: z.number().min(0),
    roundOff: z.number(),
    notes: optionalString,
    customerPhone: optionalString,
    billingAddress: optionalString
})

export type SaleFormData = z.infer<typeof saleSchema>
export type SaleItemRow = z.infer<typeof saleItemSchema> & { id: string }
