import { LoginForm, ProfileForm, useAuth } from '@/features/auth/components'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router'

export function AuthPage() {
    const navigate = useNavigate()

    const handleAuthSuccess = () => {
        navigate('/shops')
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="w-full max-w-md">
                <LoginForm onSuccess={handleAuthSuccess} />
            </div>
        </div>
    )
}

export function ProfilePage() {
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
        window.location.href = '/'
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <Button variant="outline" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
                <ProfileForm />
            </div>
        </div>
    )
}

export default AuthPage
