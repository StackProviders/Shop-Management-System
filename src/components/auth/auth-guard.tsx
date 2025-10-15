import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

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
    const { authState } = useAuth()
    const location = useLocation()

    if (authState.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (requireAuth && !authState.isAuthenticated) {
        return (
            <Navigate
                to={redirectTo || '/auth'}
                state={{ from: location }}
                replace
            />
        )
    }

    if (!requireAuth && authState.isAuthenticated) {
        return <Navigate to={redirectTo || '/shops'} replace />
    }

    return <>{children}</>
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
    return <AuthGuard requireAuth>{children}</AuthGuard>
}

export function PublicRoute({ children }: { children: ReactNode }) {
    return <AuthGuard requireAuth={false}>{children}</AuthGuard>
}
