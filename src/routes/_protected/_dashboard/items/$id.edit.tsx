import { createFileRoute } from '@tanstack/react-router'
import { EditItemPage } from '@/features/items/components/EditItemPage'
import { z } from 'zod'

const searchSchema = z.object({
    fromItems: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/items/$id/edit')({
    validateSearch: searchSchema,
    component: EditItemPage
})
