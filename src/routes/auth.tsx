import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { PublicRoute } from '@/components/auth/auth-guard'
import { LoginForm } from '@/features/auth/components'
import { Suspense } from 'react'

export const Route = createFileRoute('/auth')({
    component: () => (
        <PublicRoute>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthPageComponent />
            </Suspense>
        </PublicRoute>
    )
})

function AuthPageComponent() {
    const navigate = useNavigate()

    const handleAuthSuccess = () => {
        navigate({ to: '/shops' })
    }

    return (
        <div className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <LoginForm onSuccess={handleAuthSuccess} />
            </div>
        </div>
    )
}
