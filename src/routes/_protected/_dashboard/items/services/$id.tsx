import { createFileRoute } from '@tanstack/react-router'
import ServiceDetailPage from '@/app/routes/items/services/[id]'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/services/$id'
)({
    component: ServiceDetailPage
})
