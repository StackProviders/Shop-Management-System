import { createFileRoute } from '@tanstack/react-router'
import PartyDetailPage from '@/app/pages/parties/detail'
import { z } from 'zod'

const searchSchema = z.object({
    fromDetail: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/parties/$id/edit')(
    {
        validateSearch: searchSchema,
        component: PartyDetailPage
    }
)
