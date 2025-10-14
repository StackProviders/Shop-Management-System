import { LoginForm } from './auth-forms'

export function AuthPage() {
    const handleAuthSuccess = () => {
        // Redirect to shop selection or dashboard
        window.location.href = '/shops'
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <LoginForm onSuccess={handleAuthSuccess} />
            </div>
        </div>
    )
}

// Export default for React Router lazy loading
export default AuthPage
