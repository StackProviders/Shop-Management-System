import './global.css'

import { RouterProvider } from '@tanstack/react-router'
import { router } from '@/app/router'
import AppProvider from '@/app/provider'
import { useEffect, useMemo } from 'react'
import { checkForAppUpdates } from '@/lib/updater'
import { getPlatform } from '@/utils/platform-detection'
import { MobileUpdaterProvider } from '@/components/providers/mobile-updater-provider'
import { SafeAreaProvider } from '@/components/providers/safe-area-provider'
import {
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from 'firebase/firestore'
import {
    FirestoreProvider,
    useInitFirestore,
    SuspenseWithPerf
} from 'reactfire'
import { Spinner } from '@/components/ui/spinner'

function AppContent() {
    const { isDesktop, isMobile } = useMemo(() => getPlatform(), [])

    useEffect(() => {
        if (isDesktop) {
            checkForAppUpdates(false)
        }
    }, [isDesktop])

    const content = <RouterProvider router={router} />

    return (
        <SafeAreaProvider>
            <AppProvider>
                {isMobile ? (
                    <MobileUpdaterProvider>{content}</MobileUpdaterProvider>
                ) : (
                    content
                )}
            </AppProvider>
        </SafeAreaProvider>
    )
}

function FirestoreWrapper() {
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
            <AppContent />
        </FirestoreProvider>
    )
}

export default function App() {
    return (
        <SuspenseWithPerf
            fallback={<Spinner fullScreen={true} className="size-6" />}
            traceId="app-init"
        >
            <FirestoreWrapper />
        </SuspenseWithPerf>
    )
}
