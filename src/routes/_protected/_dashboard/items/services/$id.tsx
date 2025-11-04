import { createFileRoute } from '@tanstack/react-router'
import ServiceDetailPage from '@/app/pages/items/services/detail'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/services/$id'
)({
    component: ServiceDetailPage
})
