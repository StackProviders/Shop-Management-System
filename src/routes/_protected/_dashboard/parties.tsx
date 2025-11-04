import { createFileRoute, Outlet } from '@tanstack/react-router'
import PartiesPage from '@/app/pages/parties'

export const Route = createFileRoute('/_protected/_dashboard/parties')({
    component: () => (
        <PartiesPage>
            <Outlet />
        </PartiesPage>
    )
})
