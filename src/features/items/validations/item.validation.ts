import { z } from 'zod'

export const itemSchema = z
    .object({
        name: z.string().min(1, 'Name is required'),
        type: z.enum(['product', 'service']),
        salePrice: z.number().min(0, 'Sale price must be positive'),
        purchasePrice: z.number().min(0, 'Purchase price must be positive'),
        wholesalePrice: z.number().optional(),
        minWholesaleQty: z.number().optional(),
        mrp: z.number().optional(),
        unit: z.string().optional(),
        categories: z.array(z.string()).optional(),
        description: z.string().optional(),
        itemCode: z.string().optional(),
        openingStock: z.number().optional(),
        minStockAlert: z.number().optional(),
        barcode: z.string().optional(),
        images: z.array(z.string()).optional(),
        brand: z.string().optional(),
        warranty: z
            .object({
                label: z.string(),
                days: z.number()
            })
            .nullable()
            .optional(),
        customFields: z
            .array(
                z.object({
                    name: z.string(),
                    value: z.string(),
                    printInInvoice: z.boolean()
                })
            )
            .optional(),
        status: z.enum(['draft', 'active', 'inactive']).optional()
    })
    .catchall(z.any())

export type ItemFormData = z.infer<typeof itemSchema>
