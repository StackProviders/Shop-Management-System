import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ProtectedRoute } from '@/components/auth/auth-guard'

export const Route = createFileRoute('/_protected')({
    component: () => (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
})
