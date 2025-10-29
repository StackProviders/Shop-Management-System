import { ReactNode } from 'react'
import AppErrorPage from '@/features/errors/app-error'
import { ErrorBoundary } from 'react-error-boundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ShopProvider } from '@/features/shop'
import { AuthProvider } from '@/features/auth/components'
import { SuspenseWithPerf, StorageProvider, useFirebaseApp } from 'reactfire'
import { Spinner } from '@/components/ui/spinner'
import { getStorage } from 'firebase/storage'

function AppWithStorage({ children }: { children: ReactNode }) {
    const app = useFirebaseApp()
    return <StorageProvider sdk={getStorage(app)}>{children}</StorageProvider>
}

export default function AppProvider({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary FallbackComponent={AppErrorPage}>
            <TooltipProvider>
                <ThemeProvider defaultTheme="system">
                    <SuspenseWithPerf
                        fallback={
                            <Spinner fullScreen={true} className="size-7" />
                        }
                        traceId="auth-init"
                    >
                        <AuthProvider>
                            <SuspenseWithPerf
                                fallback={
                                    <Spinner
                                        fullScreen={true}
                                        className="size-7"
                                    />
                                }
                                traceId="shop-init"
                            >
                                <ShopProvider>
                                    <AppWithStorage>
                                        {children}
                                        <Toaster richColors />
                                    </AppWithStorage>
                                </ShopProvider>
                            </SuspenseWithPerf>
                        </AuthProvider>
                    </SuspenseWithPerf>
                </ThemeProvider>
            </TooltipProvider>
        </ErrorBoundary>
    )
}
