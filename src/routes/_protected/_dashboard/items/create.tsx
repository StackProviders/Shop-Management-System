import { createFileRoute } from '@tanstack/react-router'
import CreateItemPage from '@/app/pages/items/create'

export const Route = createFileRoute('/_protected/_dashboard/items/create')({
    component: CreateItemPage
})
