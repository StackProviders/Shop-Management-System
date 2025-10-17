import './global.css'

import AppRouter from '@/app/router'
import AppProvider from '@/app/provider'
import { useEffect } from 'react'
import { checkForAppUpdates } from '@/lib/updater'
import { detectPlatform } from '@/utils/platform-detection'
import { MobileUpdaterProvider } from '@/components/providers/mobile-updater-provider'

export default function App() {
    const { isDesktop, isMobile } = detectPlatform()

    useEffect(() => {
        if (isDesktop) {
            checkForAppUpdates(false)
        }
    }, [])

    console.log({ isDesktop, isMobile })

    return (
        <AppProvider>
            <MobileUpdaterProvider>
                <AppRouter />
            </MobileUpdaterProvider>
        </AppProvider>
    )
}
