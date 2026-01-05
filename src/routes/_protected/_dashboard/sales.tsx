import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_dashboard/sales')({
    component: SalesRouteComponent
})

function SalesRouteComponent() {
    return (
        <div className="h-full flex flex-col">
            <Outlet />
        </div>
    )
}
