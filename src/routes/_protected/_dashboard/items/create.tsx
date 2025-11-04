import { createFileRoute } from '@tanstack/react-router'
import CreateItemPage from '@/app/pages/items/create'
import { z } from 'zod'

const searchSchema = z.object({
    fromItems: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/items/create')({
    validateSearch: searchSchema,
    component: CreateItemPage
})
