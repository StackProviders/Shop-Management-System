import { createBrowserRouter, RouterProvider } from 'react-router'
import { PublicRoute } from '@/components/auth/auth-guard'
import { ProtectedLayout } from '@/components/layouts/protected-layout'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import ShopsPage from '@/app/routes/shops'
import { Suspense } from 'react'
import AuthPage from '@/app/routes/auth'
import HomePage from '@/app/routes/home'

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
                            path: '/settings',
                            lazy: () => import('@/app/routes/settings')
                        },
                        {
                            path: '/scanner',
                            lazy: () => import('@/app/routes/scanner')
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
