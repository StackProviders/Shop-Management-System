import { createFileRoute } from '@tanstack/react-router'
import HomePage from '@/app/pages/home'

export const Route = createFileRoute('/_protected/_dashboard/')({
    component: HomePage
})
