import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react'
import { mobileUpdater, MobileUpdaterState } from '@/services/mobile-updater'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Download,
    CheckCircle,
    AlertCircle,
    Loader2,
    Smartphone,
    ExternalLink,
    WifiOff
} from 'lucide-react'
import { APP_VERSION } from '@/lib/config'

interface MobileUpdaterContextType {
    state: MobileUpdaterState
    checkForUpdates: () => Promise<void>
    downloadAndInstall: () => Promise<void>
    installUpdate: () => Promise<void>
    setEnabled: (enabled: boolean) => void
    clearDownloadedState: () => void
    isChecking: boolean
    isDownloading: boolean
    isInstalling: boolean
    hasUpdate: boolean
    isDownloaded: boolean
    hasError: boolean
    isUpToDate: boolean
}

const MobileUpdaterContext = createContext<
    MobileUpdaterContextType | undefined
>(undefined)

interface MobileUpdaterProviderProps {
    children: ReactNode
}

export function MobileUpdaterProvider({
    children
}: MobileUpdaterProviderProps) {
    const [state, setState] = useState<MobileUpdaterState>(
        mobileUpdater.getCurrentState()
    )
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    useEffect(() => {
        // Subscribe to updater state changes
        const unsubscribe = mobileUpdater.subscribe((newState) => {
            setState(newState)
        })

        // Listen for online/offline events
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        // Check if app was updated on mount
        mobileUpdater.showUpdateSuccessMessage()

        // Enable auto-check on mount only if online
        if (isOnline) {
            mobileUpdater.setEnabled(true)
        } else {
            mobileUpdater.setEnabled(false)
        }

        return () => {
            unsubscribe()
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [isOnline])

    const checkForUpdates = async () => {
        try {
            await mobileUpdater.checkForUpdates()
        } catch (error) {
            console.error('Failed to check for updates:', error)
        }
    }

    const downloadAndInstall = async () => {
        try {
            await mobileUpdater.downloadUpdate()
        } catch (error) {
            console.error('Failed to download update:', error)
        }
    }

    const installUpdate = async () => {
        try {
            await mobileUpdater.installUpdate()
        } catch (error) {
            console.error('Failed to install update:', error)
        }
    }

    const setEnabled = (enabled: boolean) => {
        mobileUpdater.setEnabled(enabled)
    }

    const clearDownloadedState = () => {
        mobileUpdater.clearDownloadedState()
    }

    const contextValue: MobileUpdaterContextType = {
        state,
        checkForUpdates,
        downloadAndInstall,
        installUpdate,
        setEnabled,
        clearDownloadedState,
        isChecking: state.status === 'checking',
        isDownloading: state.status === 'downloading',
        isInstalling: state.status === 'installing',
        hasUpdate: state.status === 'available',
        isDownloaded: state.status === 'downloaded',
        hasError: state.status === 'error',
        isUpToDate: state.status === 'up-to-date'
    }

    // Helper functions for UI
    const getStatusIcon = () => {
        if (state.status === 'checking')
            return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        if (state.status === 'available')
            return <Download className="h-5 w-5 text-orange-500" />
        if (state.status === 'downloading')
            return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        if (state.status === 'downloaded')
            return <CheckCircle className="h-5 w-5 text-green-500" />
        if (state.status === 'installing')
            return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        if (state.status === 'error')
            return <AlertCircle className="h-5 w-5 text-red-500" />
        return <Smartphone className="h-5 w-5 text-blue-500" />
    }

    const getStatusText = () => {
        if (state.status === 'checking') return 'Checking for updates...'
        if (state.status === 'available')
            return `Update available: v${state.update?.version}`
        if (state.status === 'downloading')
            return `Downloading update... ${state.progress || 0}%`
        if (state.status === 'downloaded')
            return `Ready to install v${state.downloadedVersion || state.update?.version}`
        if (state.status === 'installing') return 'Installing update...'
        if (state.status === 'error') return `Error: ${state.error}`
        return 'App Updates'
    }

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        } catch {
            return dateString
        }
    }

    const isButtonDisabled =
        state.status === 'checking' ||
        state.status === 'downloading' ||
        state.status === 'installing'

    // Only show UI when updates are available, downloading, downloaded, or installing
    // Don't show when up-to-date, idle, or offline
    const shouldShowUI =
        (state.status === 'available' ||
            state.status === 'downloading' ||
            state.status === 'downloaded' ||
            state.status === 'installing' ||
            state.status === 'error') &&
        isOnline

    return (
        <MobileUpdaterContext.Provider value={contextValue}>
            {children}

            {/* Mobile Updater UI - Only shows when updates are available */}
            {shouldShowUI && (
                <div className="fixed bottom-4 left-4 right-4 z-40 max-w-sm mx-auto">
                    <Card className="w-full shadow-lg border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Smartphone className="h-4 w-4 text-blue-500" />
                                    <div>
                                        <CardTitle className="text-sm">
                                            App Updates
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            Update available
                                        </CardDescription>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                    v{APP_VERSION}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3">
                            {/* Status display */}
                            <div className="flex items-center space-x-2 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800">
                                {getStatusIcon()}
                                <div className="flex-1">
                                    <p className="text-xs font-medium">
                                        {getStatusText()}
                                    </p>
                                    {state.progress !== undefined &&
                                        state.status === 'downloading' && (
                                            <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                                                <div
                                                    className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: `${state.progress}%`
                                                    }}
                                                />
                                            </div>
                                        )}
                                </div>
                            </div>

                            {/* Update information - compact version */}
                            {state.status === 'available' && state.update && (
                                <div className="text-xs text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 p-2 rounded border border-orange-200 dark:border-orange-800">
                                    <p className="font-medium">
                                        New version: v{state.update.version}
                                    </p>
                                    <p className="text-xs text-orange-600 dark:text-orange-400">
                                        {formatDate(state.update.pub_date)}
                                    </p>
                                </div>
                            )}

                            {/* Installation success message - compact */}
                            {state.status === 'downloaded' && (
                                <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                                    <p className="font-medium">
                                        ✓ Ready to install v
                                        {state.downloadedVersion ||
                                            state.update?.version}
                                    </p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400">
                                        {state.downloadedFilePath
                                            ? 'File ready - click Install to auto-install'
                                            : 'Update downloaded successfully'}
                                    </p>
                                </div>
                            )}

                            {/* Error message - compact */}
                            {state.status === 'error' && (
                                <div className="text-xs text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                                    <p className="font-medium">Update Error</p>
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                        {state.error}
                                    </p>
                                </div>
                            )}

                            {/* Action buttons - compact */}
                            <div className="flex gap-2">
                                {(state.status === 'available' ||
                                    state.status === 'downloading') && (
                                    <Button
                                        onClick={downloadAndInstall}
                                        disabled={isButtonDisabled}
                                        size="sm"
                                        className="flex-1 text-xs"
                                    >
                                        {state.status === 'downloading' ? (
                                            <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                        ) : (
                                            <Download className="h-3 w-3 mr-1" />
                                        )}
                                        {state.status === 'downloading'
                                            ? `${state.progress || 0}%`
                                            : 'Download'}
                                    </Button>
                                )}

                                {(state.status === 'downloaded' ||
                                    state.status === 'installing') && (
                                    <>
                                        <Button
                                            onClick={installUpdate}
                                            disabled={isButtonDisabled}
                                            size="sm"
                                            className="flex-1 text-xs"
                                        >
                                            {state.status === 'installing' ? (
                                                <Loader2 className="h-3 w-3 animate-spin mr-1" />
                                            ) : (
                                                <ExternalLink className="h-3 w-3 mr-1" />
                                            )}
                                            {state.status === 'installing'
                                                ? 'Installing...'
                                                : 'Install'}
                                        </Button>
                                        {state.status === 'downloaded' && (
                                            <Button
                                                onClick={clearDownloadedState}
                                                disabled={isButtonDisabled}
                                                variant="outline"
                                                size="sm"
                                                className="text-xs"
                                            >
                                                Dismiss
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Offline indicator - only show when offline and no updates are available */}
            {!isOnline && !shouldShowUI && (
                <div className="fixed top-4 left-4 right-4 z-40 max-w-xs mx-auto">
                    <Card className="w-full shadow-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900">
                        <CardContent className="p-2">
                            <div className="flex items-center space-x-2">
                                <WifiOff className="h-3 w-3 text-gray-500" />
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Offline mode - Updates will be checked when
                                    online
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </MobileUpdaterContext.Provider>
    )
}

export function useMobileUpdaterContext() {
    const context = useContext(MobileUpdaterContext)
    if (context === undefined) {
        throw new Error(
            'useMobileUpdaterContext must be used within a MobileUpdaterProvider'
        )
    }
    return context
}
