import { createBrowserRouter, RouterProvider } from 'react-router'
import { ProtectedRoute, PublicRoute } from '@/components/auth/auth-guard'
import { ShopSelectionPage } from '@/components/shop/shop-selection'
import { ShopDashboard } from '@/components/shop/shop-dashboard'
import { Suspense } from 'react'
import AuthPage from '@/components/auth/auth-page'
import AuthCallback from './routes/auth-callback'

const createAppRouter = () =>
    createBrowserRouter([
        {
            path: '/',
            lazy: () => import('@/app/routes/home')
        },
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
            path: '/auth/callback',
            element: (
                <PublicRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AuthCallback />
                    </Suspense>
                </PublicRoute>
            )
        },
        {
            path: '/shops',
            element: (
                <ProtectedRoute>
                    <ShopSelectionPage />
                </ProtectedRoute>
            )
        },
        {
            path: '/dashboard',
            element: (
                <ProtectedRoute>
                    <ShopDashboard />
                </ProtectedRoute>
            )
        },
        {
            path: '/todos',
            lazy: () => import('@/app/routes/todos')
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
            path: '*',
            lazy: () => import('@/app/routes/not-found')
        }
    ])

export default function AppRouter() {
    return <RouterProvider router={createAppRouter()} />
}
