'use client'

import { ReactNode } from 'react'
import { DashboardLayout } from '@/components/layouts/dashboard-layout'
import { ProtectedRoute } from '@/components/auth/auth-guard'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <ProtectedRoute>
            <DashboardLayout>{children}</DashboardLayout>
        </ProtectedRoute>
    )
}
