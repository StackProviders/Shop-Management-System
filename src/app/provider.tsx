import { ReactNode, Suspense } from 'react'
import AppErrorPage from '@/features/errors/app-error'
import { ErrorBoundary } from 'react-error-boundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/hooks/use-auth'
import { ShopProvider } from '@/hooks/use-shop'
import { ThemeProvider } from '@/components/providers/theme-provider'

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ErrorBoundary FallbackComponent={AppErrorPage}>
                <TooltipProvider>
                    <ThemeProvider defaultTheme="system">
                        <AuthProvider>
                            <ShopProvider>{children}</ShopProvider>
                        </AuthProvider>
                    </ThemeProvider>
                </TooltipProvider>
            </ErrorBoundary>
        </Suspense>
    )
}
