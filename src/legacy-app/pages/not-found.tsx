import { Button } from '@/components/ui/button'
import {
    ErrorView,
    ErrorIcon,
    ErrorCode,
    ErrorHeader,
    ErrorDescription,
    ErrorActions
} from '@/features/errors/error-base'
import { useRouter } from 'next/navigation'
import { Home, ArrowLeft, FileQuestion } from 'lucide-react'

export default function NotFoundErrorPage() {
    const router = useRouter()

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/')
        }
    }

    return (
        <ErrorView variant="info">
            <ErrorIcon>
                <div className="rounded-full bg-primary/10 p-4">
                    <FileQuestion className="h-12 w-12 text-primary" />
                </div>
            </ErrorIcon>
            <div className="space-y-3 text-center">
                <ErrorCode>404</ErrorCode>
                <ErrorHeader>Page Not Found</ErrorHeader>
                <ErrorDescription>
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved. Please check the URL or return to the homepage.
                </ErrorDescription>
            </div>
            <ErrorActions>
                <Button
                    onClick={handleBack}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>
                <Button
                    onClick={() => router.push('/')}
                    className="w-full sm:w-auto"
                >
                    <Home className="mr-2 h-4 w-4" />
                    Go Home
                </Button>
            </ErrorActions>
        </ErrorView>
    )
}

// Necessary for react router to lazy load.
export const Component = NotFoundErrorPage
