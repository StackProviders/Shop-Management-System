import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Type-safe navigation helpers
 */

export function useTypedNavigate() {
    const router = useRouter()

    return {
        toHome: useCallback(() => router.push('/'), [router]),
        toAuth: useCallback(() => router.push('/auth'), [router]),
        toShops: useCallback(() => router.push('/shops'), [router]),
        toParties: useCallback(() => router.push('/parties'), [router]),
        toParty: useCallback(
            (id: string) => router.push(`/parties/${id}`),
            [router]
        ),
        toPartyEdit: useCallback(
            (id: string, asModal = false) =>
                router.push(
                    `/parties/${id}/edit${asModal ? '?fromDetail=true' : ''}`
                ),
            [router]
        ),
        toNewParty: useCallback(
            (asModal = false) =>
                router.push(
                    `/parties/new${asModal ? '?fromParties=true' : ''}`
                ),
            [router]
        ),
        toItems: useCallback(() => router.push('/items'), [router]),
        toCreateItem: useCallback(
            (asModal = false) =>
                router.push(`/items/create${asModal ? '?fromItems=true' : ''}`),
            [router]
        ),
        toProduct: useCallback(
            (id: string) => router.push(`/items/products/${id}`),
            [router]
        ),
        toService: useCallback(
            (id: string) => router.push(`/items/services/${id}`),
            [router]
        ),
        toCategory: useCallback(
            (id: string) => router.push(`/items/category/${id}`),
            [router]
        ),
        toUnit: useCallback(
            (id: string) => router.push(`/items/units/${id}`),
            [router]
        ),
        toTodos: useCallback(() => router.push('/todos'), [router]),
        toSettings: useCallback(() => router.push('/settings'), [router]),
        toScanner: useCallback(() => router.push('/scanner'), [router]),
        back: useCallback(() => router.back(), [router])
    }
}

/**
 * Route path constants for consistency
 */
export const ROUTES = {
    HOME: '/',
    AUTH: '/auth',
    SHOPS: '/shops',
    PARTIES: '/parties',
    PARTY_DETAIL: '/parties/$id',
    PARTY_EDIT: '/parties/$id/edit',
    PARTY_NEW: '/parties/new',
    ITEMS: '/items',
    ITEM_CREATE: '/items/create',
    PRODUCT_DETAIL: '/items/products/$id',
    SERVICE_DETAIL: '/items/services/$id',
    CATEGORY_DETAIL: '/items/category/$id',
    UNIT_DETAIL: '/items/units/$id',
    TODOS: '/todos',
    SETTINGS: '/settings',
    SCANNER: '/scanner'
} as const
