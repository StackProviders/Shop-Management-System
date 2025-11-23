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
    useFirebaseApp,
    FirebaseAppProvider,
    FirestoreProvider,
    useInitFirestore
} from 'reactfire'
import { Spinner } from '@/components/ui/spinner'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from '@/lib/firebase'
import { initializeDesktop } from '@/lib/desktop'
import { getPlatform } from '@/utils/platform-detection'
import { checkForAppUpdates } from '@/lib/updater'
import { MobileUpdaterProvider } from '@/components/providers/mobile-updater-provider'
import { SafeAreaProvider } from '@/components/providers/safe-area-provider'
import {
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from 'firebase/firestore'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

function AppWithStorage({ children }: { children: ReactNode }) {
    const app = useFirebaseApp()
    return <StorageProvider sdk={getStorage(app)}>{children}</StorageProvider>
}

function FirestoreWrapper({ children }: { children: ReactNode }) {
    const { data: firestoreInstance } = useInitFirestore(
        async (firebaseApp) => {
            try {
                return initializeFirestore(firebaseApp, {
                    localCache: persistentLocalCache({
                        tabManager: persistentMultipleTabManager()
                    })
                })
            } catch {
                return getFirestore(firebaseApp)
            }
        }
    )

    return (
        <FirestoreProvider sdk={firestoreInstance}>
            {children}
        </FirestoreProvider>
    )
}

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
                                <FirestoreWrapper>
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
                                                            fullScreen={true}
                                                            className="size-7"
                                                        />
                                                    }
                                                    traceId="shop-init"
                                                >
                                                    <ShopProvider>
                                                        <AppWithStorage>
                                                            {children}
                                                            <Toaster
                                                                richColors
                                                            />
                                                        </AppWithStorage>
                                                    </ShopProvider>
                                                </SuspenseWithPerf>
                                            </AuthProvider>
                                        </SuspenseWithPerf>
                                    </PlatformInit>
                                </FirestoreWrapper>
                            </SuspenseWithPerf>
                        </ThemeProvider>
                    </TooltipProvider>
                </ErrorBoundary>
            </NuqsAdapter>
        </FirebaseAppProvider>
    )
}
