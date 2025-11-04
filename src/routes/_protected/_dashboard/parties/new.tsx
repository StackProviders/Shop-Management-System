import { createFileRoute } from '@tanstack/react-router'
import NewPartyPage from '@/app/pages/parties/new'
import { z } from 'zod'

const searchSchema = z.object({
    fromParties: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/parties/new')({
    validateSearch: searchSchema,
    component: NewPartyPage
})
