import { Button } from '@/components/ui/button'
import {
    ErrorView,
    ErrorIcon,
    ErrorCode,
    ErrorHeader,
    ErrorDescription,
    ErrorActions
} from '@/features/errors/error-base'
import { useNavigate } from 'react-router'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFoundErrorPage() {
    const navigate = useNavigate()
    return (
        <ErrorView variant="info">
            <ErrorIcon>
                <div className="rounded-full bg-muted p-3">
                    <Search className="h-6 w-6 text-muted-foreground" />
                </div>
            </ErrorIcon>
            <div className="space-y-2">
                <ErrorCode>404 Error</ErrorCode>
                <ErrorHeader>Page not found</ErrorHeader>
                <ErrorDescription>
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </ErrorDescription>
            </div>
            <ErrorActions>
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go back
                </Button>
                <Button
                    onClick={() => navigate('/')}
                    className="w-full sm:w-auto"
                >
                    <Home className="mr-2 h-4 w-4" />
                    Go home
                </Button>
            </ErrorActions>
        </ErrorView>
    )
}

// Necessary for react router to lazy load.
export const Component = NotFoundErrorPage
