import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'

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
    notFoundComponent: () => {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">404 - Not Found</h1>
                <p className="text-muted-foreground mt-2">
                    The page you&apos;re looking for doesn&apos;t exist.
                </p>
            </div>
        )
    }
})
