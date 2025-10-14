import { ReactNode, Suspense } from 'react'
import AppErrorPage from '@/features/errors/app-error'
import { ErrorBoundary } from 'react-error-boundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { ShopProvider } from '@/hooks/use-shop'

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ErrorBoundary FallbackComponent={AppErrorPage}>
                <TooltipProvider>
                    <AuthProvider>
                        <ShopProvider>{children}</ShopProvider>
                    </AuthProvider>
                </TooltipProvider>
            </ErrorBoundary>
        </Suspense>
    )
}
