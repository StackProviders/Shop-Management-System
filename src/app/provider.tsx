import { ReactNode, Suspense } from 'react'
import AppErrorPage from '@/features/errors/app-error'
import { ErrorBoundary } from 'react-error-boundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ShopProvider } from '@/features/shop'
import { AuthProvider } from '@/features/auth/components'

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<>Loading...</>}>
            <ErrorBoundary FallbackComponent={AppErrorPage}>
                <TooltipProvider>
                    <ThemeProvider defaultTheme="system">
                        <AuthProvider>
                            <ShopProvider>
                                {children}
                                <Toaster />
                            </ShopProvider>
                        </AuthProvider>
                    </ThemeProvider>
                </TooltipProvider>
            </ErrorBoundary>
        </Suspense>
    )
}
