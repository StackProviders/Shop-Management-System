import { createFileRoute } from '@tanstack/react-router'
import { PublicRoute } from '@/components/auth/auth-guard'
import AuthPage from '@/app/pages/auth'
import { Suspense } from 'react'

export const Route = createFileRoute('/auth')({
    component: () => (
        <PublicRoute>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthPage />
            </Suspense>
        </PublicRoute>
    )
})
