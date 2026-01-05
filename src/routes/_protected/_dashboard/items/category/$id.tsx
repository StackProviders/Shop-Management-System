import { createFileRoute } from '@tanstack/react-router'
import { CategoryDetailPage } from '@/features/items/components/CategoryDetailPage'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/category/$id'
)({
    component: CategoryDetailPage
})
