import { createFileRoute } from '@tanstack/react-router'
import NewPartyPage from '@/app/routes/parties/new'

export const Route = createFileRoute('/_protected/_dashboard/parties/new')({
    component: NewPartyPage
})
