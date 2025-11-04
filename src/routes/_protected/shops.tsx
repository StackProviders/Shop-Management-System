import { createFileRoute } from '@tanstack/react-router'
import ShopsPage from '@/app/pages/shops'

export const Route = createFileRoute('/_protected/shops')({
    component: ShopsPage
})
