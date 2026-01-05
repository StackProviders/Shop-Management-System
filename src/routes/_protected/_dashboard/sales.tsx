import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_protected/_dashboard/sales')({
    component: SalesRouteComponent
})

function SalesRouteComponent() {
    const navigate = useNavigate()

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Sales</h1>
                <Button onClick={() => navigate({ to: '/sales/create' })}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Sale
                </Button>
            </div>
            <div className="flex-1 overflow-auto">
                <Suspense fallback={<Skeleton className="h-full w-full" />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}
