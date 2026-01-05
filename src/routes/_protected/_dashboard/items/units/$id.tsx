import { createFileRoute } from '@tanstack/react-router'
import { UnitDetailPage } from '@/features/items/components/UnitDetailPage'

export const Route = createFileRoute('/_protected/_dashboard/items/units/$id')({
    component: UnitDetailPage
})
