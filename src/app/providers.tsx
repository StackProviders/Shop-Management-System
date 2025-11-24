'use client'

import { ReactNode, useEffect, useMemo } from 'react'
import AppErrorPage from '@/features/errors/app-error'
import { ErrorBoundary } from 'react-error-boundary'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ShopProvider } from '@/features/shop'
import { AuthProvider } from '@/features/auth/components'
import {
    SuspenseWithPerf,
    StorageProvider,
    FirebaseAppProvider,
    FirestoreProvider,
    AuthProvider as ReactFireAuthProvider
} from 'reactfire'
import { Spinner } from '@/components/ui/spinner'
import { firebaseConfig, db, storage, auth } from '@/lib/firebase'
import { initializeDesktop } from '@/lib/desktop'
import { getPlatform } from '@/utils/platform-detection'
import { checkForAppUpdates } from '@/lib/updater'
import { MobileUpdaterProvider } from '@/components/providers/mobile-updater-provider'
import { SafeAreaProvider } from '@/components/providers/safe-area-provider'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

function PlatformInit({ children }: { children: ReactNode }) {
    const { isDesktop, isMobile } = useMemo(() => getPlatform(), [])

    useEffect(() => {
        if (isDesktop) {
            checkForAppUpdates(false)
        }
    }, [isDesktop])

    // Initialize desktop features once
    useEffect(() => {
        if (typeof window !== 'undefined' && '__TAURI__' in window) {
            initializeDesktop()
        }
    }, [])

    return (
        <SafeAreaProvider>
            {isMobile ? (
                <MobileUpdaterProvider>{children}</MobileUpdaterProvider>
            ) : (
                children
            )}
        </SafeAreaProvider>
    )
}

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
            <NuqsAdapter>
                <ErrorBoundary FallbackComponent={AppErrorPage}>
                    <TooltipProvider>
                        <ThemeProvider defaultTheme="system">
                            <SuspenseWithPerf
                                fallback={
                                    <Spinner
                                        fullScreen={true}
                                        className="size-7"
                                    />
                                }
                                traceId="app-init"
                            >
                                <FirestoreProvider sdk={db}>
                                    <StorageProvider sdk={storage}>
                                        <ReactFireAuthProvider sdk={auth}>
                                            <PlatformInit>
                                                <SuspenseWithPerf
                                                    fallback={
                                                        <Spinner
                                                            fullScreen={true}
                                                            className="size-7"
                                                        />
                                                    }
                                                    traceId="auth-init"
                                                >
                                                    <AuthProvider>
                                                        <SuspenseWithPerf
                                                            fallback={
                                                                <Spinner
                                                                    fullScreen={
                                                                        true
                                                                    }
                                                                    className="size-7"
                                                                />
                                                            }
                                                            traceId="shop-init"
                                                        >
                                                            <ShopProvider>
                                                                {children}
                                                                <Toaster
                                                                    richColors
                                                                />
                                                            </ShopProvider>
                                                        </SuspenseWithPerf>
                                                    </AuthProvider>
                                                </SuspenseWithPerf>
                                            </PlatformInit>
                                        </ReactFireAuthProvider>
                                    </StorageProvider>
                                </FirestoreProvider>
                            </SuspenseWithPerf>
                        </ThemeProvider>
                    </TooltipProvider>
                </ErrorBoundary>
            </NuqsAdapter>
        </FirebaseAppProvider>
    )
}
