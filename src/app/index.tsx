import './global.css'

import AppRouter from '@/app/router'
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
import { useMainWindowEventListeners } from '@/hooks/useMainWindowEventListeners'
import TitleBar from '@/components/titlebar/TitleBar'

function AppContent() {
    const { isDesktop, isMobile } = useMemo(() => getPlatform(), [])

    // Set up global event listeners (keyboard shortcuts, etc.)
    useMainWindowEventListeners()

    useEffect(() => {
        if (isDesktop) {
            checkForAppUpdates(false)
        }
    }, [isDesktop])

    const content = <AppRouter />

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
    const { isDesktop } = useMemo(() => getPlatform(), [])

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden">
            {isDesktop && <TitleBar title="Shop Management System" />}
            <div className="flex-1 overflow-hidden">
                <SuspenseWithPerf
                    fallback={<Spinner fullScreen={true} className="size-6" />}
                    traceId="app-init"
                >
                    <FirestoreWrapper />
                </SuspenseWithPerf>
            </div>
        </div>
    )
}
