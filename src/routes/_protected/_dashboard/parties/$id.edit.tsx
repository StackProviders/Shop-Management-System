import { createFileRoute } from '@tanstack/react-router'
import PartyDetailPage from '@/app/routes/parties/[id]'

export const Route = createFileRoute('/_protected/_dashboard/parties/$id/edit')(
    {
        component: PartyDetailPage
    }
)
