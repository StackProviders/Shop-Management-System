import { z } from 'zod'

export const brandSchema = z.object({
    name: z.string().min(1, 'Brand name is required'),
    logoUrl: z.string().url().optional().or(z.literal(''))
})

export type BrandFormData = z.infer<typeof brandSchema>
