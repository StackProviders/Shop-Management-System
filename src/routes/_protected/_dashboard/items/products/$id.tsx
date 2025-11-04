import { createFileRoute } from '@tanstack/react-router'
import ProductDetailPage from '@/app/pages/items/products/detail'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/products/$id'
)({
    component: ProductDetailPage
})
