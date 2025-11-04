import { useNavigate, useRouter } from '@tanstack/react-router'
import { useCallback } from 'react'

/**
 * Hook for handling intercepting routes with type-safe search params
 *
 * @param isIntercepting - Whether the route is being intercepted (from search params)
 * @param fallbackPath - Path to navigate to when not intercepting
 * @returns Object with handleClose function
 *
 * @example
 * ```tsx
 * const search = Route.useSearch()
 * const { handleClose } = useInterceptingRoute(search.modal === true, '/parties')
 *
 * return (
 *   <FormModal open onOpenChange={(open) => !open && handleClose()}>
 *     <Form />
 *   </FormModal>
 * )
 * ```
 */
export function useInterceptingRoute(
    isIntercepting: boolean,
    fallbackPath: string
) {
    const router = useRouter()
    const navigate = useNavigate()

    const handleClose = useCallback(() => {
        if (isIntercepting) {
            router.history.back()
        } else {
            navigate({ to: fallbackPath })
        }
    }, [isIntercepting, router, navigate, fallbackPath])

    return { handleClose, isIntercepting }
}

/**
 * Type-safe navigation helpers for intercepting routes
 */
export function useInterceptingNavigate() {
    const navigate = useNavigate()

    return {
        // Parties
        toNewParty: useCallback(
            (asModal = true) =>
                navigate({
                    to: '/parties/new',
                    search: asModal ? { fromParties: true } : undefined
                }),
            [navigate]
        ),
        toEditParty: useCallback(
            (id: string, asModal = true) =>
                navigate({
                    to: '/parties/$id/edit',
                    params: { id },
                    search: asModal ? { fromDetail: true } : undefined
                }),
            [navigate]
        ),

        // Items
        toCreateItem: useCallback(
            (asModal = true) =>
                navigate({
                    to: '/items/create',
                    search: asModal ? { fromItems: true } : undefined
                }),
            [navigate]
        )
    }
}
