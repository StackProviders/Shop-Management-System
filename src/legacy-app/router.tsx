import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'

export const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => (
        <div className="flex h-full items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
    ),
    defaultErrorComponent: ({ error }) => (
        <div className="flex h-full flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold text-destructive">
                Something went wrong
            </h2>
            <p className="text-muted-foreground mt-2">{error.message}</p>
        </div>
    )
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
