import { createLazyFileRoute } from '@tanstack/react-router'
import { SettingsPage } from '@/app/pages/settings'

export const Route = createLazyFileRoute('/_protected/_dashboard/settings')({
    component: SettingsPage
})
