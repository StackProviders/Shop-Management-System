import { createFileRoute } from '@tanstack/react-router'
import PartiesEmptyState from '@/app/routes/parties/empty'

export const Route = createFileRoute('/_protected/_dashboard/parties/')({
    component: PartiesEmptyState
})
