import { createFileRoute } from '@tanstack/react-router'
import CategoryDetailPage from '@/app/pages/items/category/detail'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/category/$id'
)({
    component: CategoryDetailPage
})
