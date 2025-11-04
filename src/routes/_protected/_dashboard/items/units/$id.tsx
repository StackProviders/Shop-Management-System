import { createFileRoute } from '@tanstack/react-router'
import UnitDetailPage from '@/app/routes/items/units/[id]'

export const Route = createFileRoute('/_protected/_dashboard/items/units/$id')({
    component: UnitDetailPage
})
