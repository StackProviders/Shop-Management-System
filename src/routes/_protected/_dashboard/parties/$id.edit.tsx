import { createFileRoute } from '@tanstack/react-router'
import PartyDetailPage from '@/app/pages/parties/detail'

export const Route = createFileRoute('/_protected/_dashboard/parties/$id/edit')(
    {
        component: PartyDetailPage
    }
)
