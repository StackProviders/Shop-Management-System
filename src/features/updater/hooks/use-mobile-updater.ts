import { useState, useCallback, useEffect } from 'react'
import { mobileUpdater, MobileUpdaterState } from '../services/mobile-updater'

export function useMobileUpdater() {
    const [state, setState] = useState<MobileUpdaterState>(() =>
        mobileUpdater.getCurrentState()
    )

    useEffect(() => {
        const unsubscribe = mobileUpdater.subscribe((newState) => {
            setState(newState)
        })

        return unsubscribe
    }, [])

    const checkForUpdates = useCallback(async () => {
        try {
            await mobileUpdater.checkForUpdates()
        } catch (error) {
            console.error('Error checking for updates:', error)
            throw error
        }
    }, [])

    const downloadAndInstall = useCallback(async () => {
        try {
            await mobileUpdater.downloadUpdate()
        } catch (error) {
            console.error('Error downloading/installing update:', error)
            throw error
        }
    }, [])

    const setEnabled = useCallback((enabled: boolean) => {
        mobileUpdater.setEnabled(enabled)
    }, [])

    return {
        state,
        checkForUpdates,
        downloadAndInstall,
        setEnabled,
        isChecking: state.status === 'checking',
        isDownloading: state.status === 'downloading',
        isInstalling: state.status === 'installing',
        hasUpdate: state.status === 'available',
        isDownloaded: state.status === 'downloaded',
        hasError: state.status === 'error',
        isUpToDate: state.status === 'up-to-date'
    }
}
