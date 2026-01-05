import { createFileRoute } from '@tanstack/react-router'
import { PartyDetailPage } from '@/features/parties/components/PartyDetailPage'
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
