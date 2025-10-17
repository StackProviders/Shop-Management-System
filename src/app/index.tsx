import './global.css'

import AppRouter from '@/app/router'
import AppProvider from '@/app/provider'
import { useEffect, useMemo } from 'react'
import { checkForAppUpdates } from '@/lib/updater'
import { detectPlatform } from '@/utils/platform-detection'
import { MobileUpdaterProvider } from '@/components/providers/mobile-updater-provider'

export default function App() {
    const { isDesktop, isMobile } = useMemo(() => detectPlatform(), [])

    useEffect(() => {
        if (isDesktop) {
            checkForAppUpdates(false)
        }
    }, [isDesktop])

    const content = <AppRouter />

    return (
        <AppProvider>
            {isMobile ? (
                <MobileUpdaterProvider>{content}</MobileUpdaterProvider>
            ) : (
                content
            )}
        </AppProvider>
    )
}
