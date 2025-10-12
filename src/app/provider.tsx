import { ReactNode, Suspense, useEffect } from 'react'
import AppErrorPage from '@/features/errors/app-error'
import { ErrorBoundary } from 'react-error-boundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { autoUpdater } from '@/features/updater/services/auto-updater'

export default function AppProvider({ children }: { children: ReactNode }) {
    useEffect(() => {
        // Initialize auto-updater when the app starts
        autoUpdater.initialize();

        // Cleanup on unmount
        return () => {
            autoUpdater.destroy();
        };
    }, []);

    return (
        <Suspense fallback={<>Loading...</>}>
            <ErrorBoundary FallbackComponent={AppErrorPage}>
                <TooltipProvider>{children}</TooltipProvider>
            </ErrorBoundary>
        </Suspense>
    )
}
