import { createFileRoute } from '@tanstack/react-router'
import EditItemPage from '@/app/pages/items/edit'
import { z } from 'zod'

const searchSchema = z.object({
    fromItems: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/items/$id/edit')({
    validateSearch: searchSchema,
    component: EditItemPage
})
