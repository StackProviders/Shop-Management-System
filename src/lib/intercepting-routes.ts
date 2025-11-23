import { useRouter } from 'next/navigation'
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
 * const search = useSearchParams()
 * const { handleClose } = useInterceptingRoute(search.get('modal') === 'true', '/parties')
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

    const handleClose = useCallback(() => {
        if (isIntercepting) {
            router.back()
        } else {
            router.push(fallbackPath)
        }
    }, [isIntercepting, router, fallbackPath])

    return { handleClose, isIntercepting }
}

/**
 * Type-safe navigation helpers for intercepting routes
 */
export function useInterceptingNavigate() {
    const router = useRouter()

    return {
        // Parties
        toNewParty: useCallback(
            (asModal = true) =>
                router.push(`/parties/new${asModal ? '?fromParties=true' : ''}`),
            [router]
        ),
        toEditParty: useCallback(
            (id: string, asModal = true) =>
                router.push(
                    `/parties/${id}/edit${asModal ? '?fromDetail=true' : ''}`
                ),
            [router]
        ),

        // Items
        toCreateItem: useCallback(
            (asModal = true) =>
                router.push(`/items/create${asModal ? '?fromItems=true' : ''}`),
            [router]
        )
    }
}
