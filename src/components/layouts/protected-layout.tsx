import { ProtectedRoute } from '@/components/auth/auth-guard'
import { Outlet } from 'react-router'

export function ProtectedLayout() {
    return (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
}
