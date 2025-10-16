import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuthStore } from '@/stores/auth-store'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

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
    const { isAuthenticated, loading, user } = useAuthStore()
    const location = useLocation()

    console.log({ isAuthenticated, user })

    if (loading) {
        return <LoadingSpinner fullScreen />
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
