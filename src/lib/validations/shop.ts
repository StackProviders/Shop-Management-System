import * as z from 'zod'

export const shopSchema = z.object({
    name: z
        .string()
        .min(1, 'Shop name is required')
        .min(3, 'Shop name must be at least 3 characters')
        .max(50, 'Shop name must be at most 50 characters')
        .trim()
})

export type ShopFormData = z.infer<typeof shopSchema>
