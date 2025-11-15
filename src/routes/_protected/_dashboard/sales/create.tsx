import { createFileRoute } from '@tanstack/react-router'
import CreateSalePage from '@/app/pages/sales/create'

export const Route = createFileRoute('/_protected/_dashboard/sales/create')({
    component: CreateSalePage
})
