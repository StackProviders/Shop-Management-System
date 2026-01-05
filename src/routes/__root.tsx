import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'
import NotFoundErrorPage from '@/components/common/NotFoundPage'

function RootComponent() {
    return (
        <>
            <NuqsAdapter>
                <Suspense
                    fallback={
                        <div className="flex h-screen items-center justify-center">
                            <Spinner className="size-8" />
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </NuqsAdapter>
            {import.meta.env.DEV && (
                <TanStackRouterDevtools position="bottom-right" />
            )}
        </>
    )
}

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: NotFoundErrorPage
})
