import * as z from 'zod'
import { ShopStatus, ShopRole } from '@/types/shop'

export const shopSchema = z.object({
    shopname: z
        .string()
        .min(1, 'Shop name is required')
        .min(3, 'Shop name must be at least 3 characters')
        .max(100, 'Shop name must be at most 100 characters')
        .trim(),
    logo_url: z.string().url('Invalid URL').optional().or(z.literal('')),
    phone_number: z.string().optional(),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    shop_type: z.string().optional(),
    shop_category: z.string().optional(),
    shop_address: z.string().optional(),
    signature: z.string().optional(),
    status: z.nativeEnum(ShopStatus)
})

export const shopMemberSchema = z.object({
    role: z.nativeEnum(ShopRole),
    permissions: z.array(
        z.object({
            resource: z.string(),
            actions: z.array(z.enum(['read', 'write', 'delete']))
        })
    )
})

export type ShopFormData = z.infer<typeof shopSchema>
export type ShopMemberFormData = z.infer<typeof shopMemberSchema>
