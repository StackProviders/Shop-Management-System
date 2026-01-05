import { createFileRoute } from '@tanstack/react-router'
import { PartyDetailPage } from '@/features/parties/components/PartyDetailPage'

export const Route = createFileRoute('/_protected/_dashboard/parties/$id')({
    component: PartyDetailPage
})
