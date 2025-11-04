import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import ItemsPage from '@/app/pages/items'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_protected/_dashboard/items')({
    component: () => (
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <ItemsPage>
                <Outlet />
            </ItemsPage>
        </Suspense>
    )
})
