import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'

function AuthCallback() {
    const { verifyEmailLink } = useAuth()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
        'loading'
    )
    const [message, setMessage] = useState('')

    useEffect(() => {
        const handleEmailLink = async () => {
            try {
                const user = await verifyEmailLink()
                if (user) {
                    setStatus('success')
                    setMessage('Successfully signed in! Redirecting...')
                    setTimeout(() => {
                        window.location.href = '/shops'
                    }, 2000)
                } else {
                    setStatus('error')
                    setMessage('Invalid or expired verification link')
                }
            } catch (error) {
                setStatus('error')
                setMessage(
                    error instanceof Error
                        ? error.message
                        : 'Verification failed'
                )
            }
        }

        handleEmailLink()
    }, [verifyEmailLink])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                        {status === 'loading' && (
                            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                        )}
                        {status === 'success' && (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        )}
                        {status === 'error' && (
                            <XCircle className="h-6 w-6 text-red-600" />
                        )}
                    </div>
                    <CardTitle>
                        {status === 'loading' && 'Verifying your email...'}
                        {status === 'success' && 'Email verified!'}
                        {status === 'error' && 'Verification failed'}
                    </CardTitle>
                    <CardDescription>{message}</CardDescription>
                </CardHeader>
                <CardContent>
                    {status === 'error' && (
                        <div className="text-center">
                            <button
                                onClick={() => (window.location.href = '/auth')}
                                className="text-blue-600 hover:underline"
                            >
                                Back to login
                            </button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

// Export default for React Router lazy loading
export default AuthCallback
