import { createFileRoute } from '@tanstack/react-router'
import UnitDetailPage from '@/app/pages/items/units/detail'

export const Route = createFileRoute('/_protected/_dashboard/items/units/$id')({
    component: UnitDetailPage
})
