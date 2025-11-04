import { createFileRoute } from '@tanstack/react-router'
import ProductDetailPage from '@/app/routes/items/products/[id]'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/products/$id'
)({
    component: ProductDetailPage
})
