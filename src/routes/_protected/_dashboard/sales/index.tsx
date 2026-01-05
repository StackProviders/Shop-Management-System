import { createFileRoute } from '@tanstack/react-router'
import SalesPage from '@/app/pages/sales'

export const Route = createFileRoute('/_protected/_dashboard/sales/')({
    component: () => <SalesPage />
})
