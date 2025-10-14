import { ReactNode } from 'react'
import { useIsAuthenticated, useAuthLoading } from '@/hooks/use-user'
import { AuthPage } from '@/components/auth/auth-page'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
    children: ReactNode
    fallback?: ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
    const isAuthenticated = useIsAuthenticated()
    const loading = useAuthLoading()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return fallback || <AuthPage />
    }

    return <>{children}</>
}

interface RoleProtectedRouteProps extends ProtectedRouteProps {
    requiredRole?: string[]
    currentRole?: string
    shopId?: string
}

export function RoleProtectedRoute({
    children,
    requiredRole,
    currentRole,
    fallback
}: RoleProtectedRouteProps) {
    const isAuthenticated = useIsAuthenticated()
    const loading = useAuthLoading()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return fallback || <AuthPage />
    }

    // Check role permissions if required
    if (requiredRole && currentRole && !requiredRole.includes(currentRole)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Access Denied
                    </h1>
                    <p className="text-gray-600">
                        You don&apos;t have permission to access this page.
                    </p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
