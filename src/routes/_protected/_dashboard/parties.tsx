import { createFileRoute, Outlet } from '@tanstack/react-router'
import PartiesLayout from '@/app/routes/parties'

export const Route = createFileRoute('/_protected/_dashboard/parties')({
    component: () => (
        <PartiesLayout>
            <Outlet />
        </PartiesLayout>
    )
})
