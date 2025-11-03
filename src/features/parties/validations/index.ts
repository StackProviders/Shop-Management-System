import { z } from 'zod'

export const partyFormSchema = z.object({
    type: z.enum(['customer', 'supplier']),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().optional(),
    email: z
        .union([z.string().email('Invalid email'), z.literal('')])
        .optional(),
    address: z.string().optional(),
    balance: z.number(),
    status: z.enum(['active', 'inactive'])
})

export type PartyFormData = z.infer<typeof partyFormSchema>
