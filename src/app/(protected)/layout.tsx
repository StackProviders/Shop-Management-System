'use client'

import { ProtectedRoute } from '@/components/auth/auth-guard'

export default function Layout({ children }: { children: React.ReactNode }) {
    return <ProtectedRoute>{children}</ProtectedRoute>
}
