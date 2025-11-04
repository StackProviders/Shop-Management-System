import { ReactNode } from 'react'
import { Navigate } from '@tanstack/react-router'
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

    if (loading) {
        return <Spinner className="size-8" fullScreen />
    }

    if (requireAuth && !isAuthenticated) {
        return <Navigate to={redirectTo || '/auth'} replace />
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
