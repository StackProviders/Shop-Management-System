import { createFileRoute } from '@tanstack/react-router'
import { ProductDetailPage } from '@/features/items/components/ProductDetailPage'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/products/$id'
)({
    component: ProductDetailPage
})
