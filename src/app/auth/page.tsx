'use client'

import { LoginForm } from '@/features/auth/components'
import { useRouter } from 'next/navigation'
import { PublicRoute } from '@/components/auth/auth-guard'
import { Suspense } from 'react'

function AuthContent() {
    const router = useRouter()

    const handleAuthSuccess = () => {
        router.push('/shops')
    }

    return (
        <div className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <LoginForm onSuccess={handleAuthSuccess} />
            </div>
        </div>
    )
}

export default function AuthPage() {
    return (
        <PublicRoute>
            <Suspense fallback={<div>Loading...</div>}>
                <AuthContent />
            </Suspense>
        </PublicRoute>
    )
}
