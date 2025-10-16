import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
    Download,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Loader2,
    Smartphone,
    ExternalLink
} from 'lucide-react'
import { useMobileUpdaterContext } from '../context/mobile-updater-context'
import { APP_VERSION } from '@/lib/config'

export function MobileUpdater() {
    const {
        state,
        checkForUpdates,
        downloadAndInstall,
        installUpdate,
        clearDownloadedState,
        isChecking,
        isDownloading,
        isInstalling,
        hasUpdate,
        isDownloaded,
        hasError,
        isUpToDate
    } = useMobileUpdaterContext()

    // Don't render anything if no update is available and not in any active state
    if (
        !hasUpdate &&
        !isChecking &&
        !hasError &&
        !isUpToDate &&
        !isDownloaded &&
        !isDownloading &&
        !isInstalling
    ) {
        return null
    }

    const getStatusIcon = () => {
        if (isChecking)
            return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        if (hasUpdate) return <Download className="h-5 w-5 text-orange-500" />
        if (isDownloading)
            return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        if (isDownloaded)
            return <CheckCircle className="h-5 w-5 text-green-500" />
        if (isInstalling)
            return <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
        if (hasError) return <AlertCircle className="h-5 w-5 text-red-500" />
        if (isUpToDate)
            return <CheckCircle className="h-5 w-5 text-green-500" />
        return <RefreshCw className="h-5 w-5 text-gray-500" />
    }

    const getStatusText = () => {
        if (isChecking) return 'Checking for updates...'
        if (hasUpdate) return `Update available: v${state.update?.version}`
        if (isDownloading)
            return `Downloading update... ${state.progress || 0}%`
        if (isDownloaded) return 'Update downloaded. Ready to install.'
        if (isInstalling) return 'Installing update...'
        if (hasError) return `Error: ${state.error}`
        if (isUpToDate)
            return `You're up to date! Latest version: v${state.update?.version}`
        return 'Check for updates'
    }

    const isButtonDisabled = isChecking || isDownloading || isInstalling

    const handleDownloadAndInstall = async () => {
        try {
            await downloadAndInstall()
        } catch (error) {
            console.error('Failed to download and install update:', error)
        }
    }

    const handleInstall = async () => {
        try {
            await installUpdate()
        } catch (error) {
            console.error('Failed to install update:', error)
        }
    }

    const handleDismiss = () => {
        clearDownloadedState()
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

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Smartphone className="h-6 w-6 text-blue-500" />
                        <div>
                            <CardTitle>App Updates</CardTitle>
                            <CardDescription>
                                Keep your app up to date with the latest
                                features and improvements using Tauri OS plugin
                            </CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                        v{APP_VERSION}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Status display */}
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    {getStatusIcon()}
                    <div className="flex-1">
                        <p className="text-sm font-medium">{getStatusText()}</p>
                        {state.progress !== undefined && isDownloading && (
                            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${state.progress}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Update information */}
                {hasUpdate && state.update && (
                    <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
                        <Download className="h-4 w-4 text-orange-600" />
                        <AlertDescription>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-orange-900 dark:text-orange-100">
                                        New version available: v
                                        {state.update.version}
                                    </h4>
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        {formatDate(state.update.pub_date)}
                                    </Badge>
                                </div>
                                {state.update.notes && (
                                    <p className="text-sm text-orange-700 dark:text-orange-300">
                                        {state.update.notes}
                                    </p>
                                )}
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Up to date message */}
                {isUpToDate && state.update && (
                    <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-green-900 dark:text-green-100">
                                    ✓ You&apos;re up to date!
                                </h4>
                                <p className="text-sm text-green-700 dark:text-green-300">
                                    Current version: v{APP_VERSION} | Latest
                                    version: v{state.update.version}
                                </p>
                                <p className="text-xs text-green-600 dark:text-green-400">
                                    Latest release:{' '}
                                    {formatDate(state.update.pub_date)}
                                </p>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Installation success message */}
                {isDownloaded && state.status === 'downloaded' && (
                    <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                                    ✓ Update Ready for Installation
                                </h4>
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    The update has been downloaded successfully.
                                    Click &quot;Install Update&quot; to install
                                    the latest version on your device.
                                </p>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Error message */}
                {hasError && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            <p className="font-medium">Update Error</p>
                            <p className="text-sm mt-1">{state.error}</p>
                        </AlertDescription>
                    </Alert>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {hasUpdate && !isDownloaded && (
                        <Button
                            onClick={handleDownloadAndInstall}
                            disabled={isButtonDisabled}
                            className="flex-1"
                        >
                            {isDownloading ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <Download className="h-4 w-4 mr-2" />
                            )}
                            {isDownloading
                                ? `Downloading... ${state.progress || 0}%`
                                : 'Download Update'}
                        </Button>
                    )}

                    {isDownloaded && (
                        <Button
                            onClick={handleInstall}
                            disabled={isButtonDisabled}
                            className="flex-1"
                        >
                            {state.status === 'installing' ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <ExternalLink className="h-4 w-4 mr-2" />
                            )}
                            {state.status === 'installing'
                                ? 'Installing...'
                                : 'Install Update'}
                        </Button>
                    )}

                    {!hasUpdate && !isDownloaded && !isUpToDate && (
                        <Button
                            onClick={checkForUpdates}
                            disabled={isButtonDisabled}
                            variant="outline"
                            className="flex-1"
                        >
                            {isChecking ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <RefreshCw className="h-4 w-4 mr-2" />
                            )}
                            {isChecking ? 'Checking...' : 'Check for Updates'}
                        </Button>
                    )}

                    {isDownloaded && (
                        <Button
                            onClick={handleDismiss}
                            disabled={isButtonDisabled}
                            variant="outline"
                            className="flex-1"
                        >
                            Dismiss
                        </Button>
                    )}
                </div>

                {/* Footer information */}
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1 pt-4 border-t">
                    <p>Current version: {APP_VERSION}</p>
                    <p>Updates are checked automatically every 24 hours.</p>
                    <p className="mt-2 text-yellow-600 dark:text-yellow-400">
                        Note: Updates use Tauri OS plugin for accurate platform
                        detection. Downloads are handled through the
                        platform-specific URLs from latest.json endpoint.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
