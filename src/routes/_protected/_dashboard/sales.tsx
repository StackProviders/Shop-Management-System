import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import SalesPage from '@/app/pages/sales'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_protected/_dashboard/sales')({
    component: () => (
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <SalesPage>
                <Outlet />
            </SalesPage>
        </Suspense>
    )
})
