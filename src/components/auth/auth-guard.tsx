import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuthStore } from '@/stores/auth-store'
import { Spinner } from '../ui/spinner'

interface AuthGuardProps {
    children: ReactNode
    requireAuth?: boolean
    redirectTo?: string
}

export function AuthGuard({
    children,
    requireAuth = true,
    redirectTo
}: AuthGuardProps) {
    const { isAuthenticated, loading } = useAuthStore()
    const location = useLocation()

    if (loading) {
        return <Spinner className="size-8" fullScreen />
    }

    if (requireAuth && !isAuthenticated) {
        return (
            <Navigate
                to={redirectTo || '/auth'}
                state={{ from: location }}
                replace
            />
        )
    }

    if (!requireAuth && isAuthenticated) {
        return <Navigate to={redirectTo || '/shops'} replace />
    }

    return <>{children}</>
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
    return (
        <AuthGuard requireAuth redirectTo="/auth">
            {children}
        </AuthGuard>
    )
}

export function PublicRoute({ children }: { children: ReactNode }) {
    return (
        <AuthGuard requireAuth={false} redirectTo="/shops">
            {children}
        </AuthGuard>
    )
}
