import { createFileRoute } from '@tanstack/react-router'
import { ServiceDetailPage } from '@/features/items/components/ServiceDetailPage'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/services/$id'
)({
    component: ServiceDetailPage
})
