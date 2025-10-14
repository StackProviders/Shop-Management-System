import { useEffect } from 'react'
import { useIsAuthenticated } from '@/hooks/use-user'

export function HomePage() {
    const isAuthenticated = useIsAuthenticated()

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect authenticated users to shops
            window.location.href = '/shops'
        } else {
            // Redirect unauthenticated users to auth
            window.location.href = '/auth'
        }
    }, [isAuthenticated])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Shop Management System
                </h1>
                <p className="text-xl text-gray-600 mb-8">Redirecting...</p>
            </div>
        </div>
    )
}

// Necessary for react router to lazy load.
export const Component = HomePage
