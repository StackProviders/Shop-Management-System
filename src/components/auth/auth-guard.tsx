import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/features/auth'
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
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading) {
            if (requireAuth && !isAuthenticated) {
                router.push(redirectTo || '/auth')
            } else if (!requireAuth && isAuthenticated) {
                router.push(redirectTo || '/shops')
            }
        }
    }, [loading, isAuthenticated, requireAuth, redirectTo, router])

    if (loading) {
        return <Spinner className="size-8" fullScreen />
    }

    if (requireAuth && !isAuthenticated) {
        return null // or a loading state while redirecting
    }

    if (!requireAuth && isAuthenticated) {
        return null // or a loading state while redirecting
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
