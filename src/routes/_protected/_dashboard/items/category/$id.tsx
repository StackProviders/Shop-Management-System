import { createFileRoute } from '@tanstack/react-router'
import CategoryDetailPage from '@/app/routes/items/category/[id]'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/category/$id'
)({
    component: CategoryDetailPage
})
