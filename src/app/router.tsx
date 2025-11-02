import { createBrowserRouter, RouterProvider } from 'react-router'
import { PublicRoute } from '@/components/auth/auth-guard'
import { ProtectedLayout } from '@/components/layouts/protected-layout'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import ShopsPage from '@/app/routes/shops'
import { Suspense } from 'react'
import AuthPage from '@/app/routes/auth'
import HomePage from '@/app/routes/home'
import PartiesLayout from '@/app/routes/parties'
import PartyDetailPage from '@/app/routes/parties/[id]'
import PartiesEmptyState from '@/app/routes/parties/empty'
import NewPartyPage from '@/app/routes/parties/new'
import TodosPage from '@/app/routes/todos'
import ItemsPage from '@/app/routes/items'
import ProductDetailPage from '@/app/routes/items/products/[id]'
import ServiceDetailPage from '@/app/routes/items/services/[id]'
import CategoryDetailPage from '@/app/routes/items/category/[id]'
import UnitDetailPage from '@/app/routes/items/units/[id]'
import CreateItemPage from './routes/items/create'

const createAppRouter = () =>
    createBrowserRouter([
        {
            path: '/auth',
            element: (
                <PublicRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AuthPage />
                    </Suspense>
                </PublicRoute>
            )
        },
        {
            element: <ProtectedLayout />,
            children: [
                {
                    path: '/shops',
                    element: <ShopsPage />
                },
                {
                    element: <DashboardLayout />,
                    children: [
                        {
                            path: '/',
                            element: <HomePage />
                        },
                        {
                            path: '/parties',
                            element: <PartiesLayout />,
                            children: [
                                {
                                    index: true,
                                    element: <PartiesEmptyState />
                                },
                                {
                                    path: 'new',
                                    element: <NewPartyPage />
                                },
                                {
                                    path: ':id',
                                    element: <PartyDetailPage />
                                },
                                {
                                    path: ':id/edit',
                                    element: <PartyDetailPage />
                                }
                            ]
                        },
                        {
                            path: '/settings',
                            lazy: () => import('@/app/routes/settings')
                        },
                        {
                            path: '/scanner',
                            lazy: () => import('@/app/routes/scanner')
                        },
                        {
                            path: '/todos',
                            element: <TodosPage />
                        },
                        {
                            path: '/items',
                            element: <ItemsPage />,
                            children: [
                                {
                                    path: 'products/:id',
                                    element: <ProductDetailPage />
                                },
                                {
                                    path: 'services/:id',
                                    element: <ServiceDetailPage />
                                },
                                {
                                    path: 'category/:id',
                                    element: <CategoryDetailPage />
                                },
                                {
                                    path: 'units/:id',
                                    element: <UnitDetailPage />
                                }
                            ]
                        },
                        {
                            path: '/items/create',
                            element: <CreateItemPage />
                        },
                        {
                            path: '*',
                            lazy: () => import('@/app/routes/not-found')
                        }
                    ]
                }
            ]
        },
        {
            path: '*',
            lazy: () => import('@/app/routes/not-found')
        }
    ])

export default function AppRouter() {
    return <RouterProvider router={createAppRouter()} />
}
