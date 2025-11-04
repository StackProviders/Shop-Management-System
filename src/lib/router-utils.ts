import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'

/**
 * Type-safe navigation helpers
 */

export function useTypedNavigate() {
    const navigate = useNavigate()

    return {
        toHome: useCallback(() => navigate({ to: '/' }), [navigate]),
        toAuth: useCallback(() => navigate({ to: '/auth' }), [navigate]),
        toShops: useCallback(() => navigate({ to: '/shops' }), [navigate]),
        toParties: useCallback(() => navigate({ to: '/parties' }), [navigate]),
        toParty: useCallback(
            (id: string) => navigate({ to: '/parties/$id', params: { id } }),
            [navigate]
        ),
        toPartyEdit: useCallback(
            (id: string, asModal = false) =>
                navigate({
                    to: '/parties/$id/edit',
                    params: { id },
                    search: asModal ? { fromDetail: true } : undefined
                }),
            [navigate]
        ),
        toNewParty: useCallback(
            (asModal = false) =>
                navigate({
                    to: '/parties/new',
                    search: asModal ? { fromParties: true } : undefined
                }),
            [navigate]
        ),
        toItems: useCallback(() => navigate({ to: '/items' }), [navigate]),
        toCreateItem: useCallback(
            (asModal = false) =>
                navigate({
                    to: '/items/create',
                    search: asModal ? { fromItems: true } : undefined
                }),
            [navigate]
        ),
        toProduct: useCallback(
            (id: string) =>
                navigate({ to: '/items/products/$id', params: { id } }),
            [navigate]
        ),
        toService: useCallback(
            (id: string) =>
                navigate({ to: '/items/services/$id', params: { id } }),
            [navigate]
        ),
        toCategory: useCallback(
            (id: string) =>
                navigate({ to: '/items/category/$id', params: { id } }),
            [navigate]
        ),
        toUnit: useCallback(
            (id: string) =>
                navigate({ to: '/items/units/$id', params: { id } }),
            [navigate]
        ),
        toTodos: useCallback(() => navigate({ to: '/todos' }), [navigate]),
        toSettings: useCallback(
            () => navigate({ to: '/settings' }),
            [navigate]
        ),
        toScanner: useCallback(() => navigate({ to: '/scanner' }), [navigate]),
        back: useCallback(() => navigate({ to: '..' }), [navigate])
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
