import { ProtectedRoute } from '@/components/auth/auth-guard'
import { ReactNode } from 'react'

interface ProtectedLayoutProps {
    children?: ReactNode
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return <ProtectedRoute>{children}</ProtectedRoute>
}
