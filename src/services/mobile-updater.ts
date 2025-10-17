import { APP_VERSION } from '@/lib/config'
import { platform } from '@tauri-apps/plugin-os'
import { fetch as httpFetch } from '@tauri-apps/plugin-http'
import { download } from '@tauri-apps/plugin-upload'
import { exists, remove } from '@tauri-apps/plugin-fs'
import { downloadDir } from '@tauri-apps/api/path'
import { join } from '@tauri-apps/api/path'
import { openPath, openUrl } from '@tauri-apps/plugin-opener'

export interface MobileUpdateInfo {
    version: string
    notes: string
    pub_date: string
    platforms: {
        [platform: string]: {
            signature: string
            url: string
        }
    }
}

export interface MobileUpdaterState {
    status:
        | 'idle'
        | 'checking'
        | 'available'
        | 'downloading'
        | 'downloaded'
        | 'installing'
        | 'error'
        | 'up-to-date'
    update?: MobileUpdateInfo
    error?: string
    progress?: number
    downloadUrl?: string
    downloadedVersion?: string
    downloadedFilePath?: string
}

type UpdateListener = (state: MobileUpdaterState) => void

// Helper function to compare semantic versions
function compareVersions(version1: string, version2: string): number {
    const v1parts = version1.split('.').map(Number)
    const v2parts = version2.split('.').map(Number)

    for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
        const v1part = v1parts[i] || 0
        const v2part = v2parts[i] || 0

        if (v1part > v2part) return 1
        if (v1part < v2part) return -1
    }

    return 0
}

// Detect current platform using Tauri OS plugin when available
async function getCurrentPlatform(): Promise<string> {
    try {
        // Check if running in Tauri environment
        if (typeof window !== 'undefined' && '__TAURI__' in window) {
            try {
                const currentPlatform = platform()

                switch (currentPlatform) {
                    case 'android':
                        return 'android-aarch64'
                    case 'ios':
                        return 'darwin-aarch64'
                    case 'windows':
                    case 'macos':
                    case 'linux':
                        // For desktop platforms, default to android-aarch64 for mobile updater
                        return 'android-aarch64'
                    default:
                        return 'android-aarch64'
                }
            } catch (error) {
                console.warn(
                    'Failed to get platform from Tauri OS plugin, falling back to user agent:',
                    error
                )
            }
        }

        // Fallback to user agent detection
        const userAgent = navigator.userAgent.toLowerCase()

        if (/android/.test(userAgent)) {
            return 'android-aarch64'
        } else if (/iphone|ipad|ipod/.test(userAgent)) {
            return 'darwin-aarch64' // iOS uses darwin-aarch64
        }

        // Default to android for mobile web and desktop
        return 'android-aarch64'
    } catch (error) {
        console.error('Error detecting platform:', error)
        return 'android-aarch64' // Safe fallback
    }
}

export class MobileUpdaterService {
    private static instance: MobileUpdaterService
    private isInitialized = false
    private checkInterval: number | null = null
    private listeners: UpdateListener[] = []
    private isEnabled = false
    private currentState: MobileUpdaterState = { status: 'idle' }
    private readonly UPDATE_ENDPOINT =
        'https://updater-worker.stackproviders.workers.dev/latest?ttl=300'

    private constructor() {}

    public static getInstance(): MobileUpdaterService {
        if (!MobileUpdaterService.instance) {
            MobileUpdaterService.instance = new MobileUpdaterService()
        }
        return MobileUpdaterService.instance
    }

    public setEnabled(enabled: boolean): void {
        this.isEnabled = enabled
        if (enabled && !this.isInitialized) {
            this.initialize()
        } else if (!enabled) {
            this.stopPeriodicChecks()
        }
    }

    public subscribe(listener: UpdateListener): () => void {
        this.listeners.push(listener)
        // Immediately call listener with current state
        listener(this.currentState)
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener)
        }
    }

    private notifyListeners(): void {
        this.listeners.forEach((listener) => listener(this.currentState))
    }

    private updateState(newState: Partial<MobileUpdaterState>): void {
        this.currentState = { ...this.currentState, ...newState }
        this.notifyListeners()
    }

    public async initialize(): Promise<void> {
        if (this.isInitialized || !this.isEnabled) {
            return
        }

        try {
            await this.checkForUpdates()
            this.startPeriodicChecks()
            this.isInitialized = true
            console.log('Mobile auto-updater initialized')
        } catch (error) {
            console.error('Failed to initialize mobile auto-updater:', error)
            this.updateState({
                status: 'error',
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to initialize updater'
            })
        }
    }

    public async checkForUpdates(): Promise<MobileUpdateInfo | null> {
        if (!this.isEnabled) return null

        try {
            this.updateState({ status: 'checking', error: undefined })

            const response = await httpFetch(this.UPDATE_ENDPOINT, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Cache-Control': 'no-cache'
                }
            })

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}: ${response.statusText}`
                )
            }

            const updateInfo: MobileUpdateInfo = await response.json()

            // Compare versions to determine if update is actually newer
            const versionComparison = compareVersions(
                updateInfo.version,
                APP_VERSION
            )

            if (versionComparison > 0) {
                console.log(
                    `Mobile update available: v${updateInfo.version} (current: v${APP_VERSION})`
                )

                const currentPlatform = await getCurrentPlatform()
                const platformInfo = updateInfo.platforms[currentPlatform]

                if (!platformInfo) {
                    throw new Error(
                        `No update available for platform: ${currentPlatform}`
                    )
                }

                // Check if this version is already downloaded
                const downloadedVersion = this.getDownloadedVersion()
                const isAlreadyDownloaded =
                    downloadedVersion === updateInfo.version

                // Check if file exists on disk
                let downloadedFilePath: string | undefined
                if (isAlreadyDownloaded) {
                    try {
                        const downloadDirectory = await downloadDir()
                        const fileName = `Shop-Management-System-${updateInfo.version}.apk`
                        const filePath = await join(downloadDirectory, fileName)
                        const fileExists = await exists(filePath)

                        if (fileExists) {
                            downloadedFilePath = filePath
                        } else {
                            // File doesn't exist, clear the version tracking
                            this.clearDownloadedVersion()
                        }
                    } catch (error) {
                        console.warn('Error checking file existence:', error)
                        this.clearDownloadedVersion()
                    }
                }

                this.updateState({
                    status:
                        isAlreadyDownloaded && downloadedFilePath
                            ? 'downloaded'
                            : 'available',
                    update: updateInfo,
                    downloadUrl: platformInfo.url,
                    downloadedVersion:
                        isAlreadyDownloaded && downloadedFilePath
                            ? updateInfo.version
                            : undefined,
                    downloadedFilePath: downloadedFilePath,
                    error: undefined
                })

                return updateInfo
            } else {
                console.log(
                    `Mobile app is up to date. Current version (v${APP_VERSION}) is same or newer than available version (v${updateInfo.version})`
                )

                this.updateState({
                    status: 'up-to-date',
                    update: updateInfo,
                    error: undefined
                })

                return null
            }
        } catch (error) {
            console.log(
                'Update check failed (offline or network issue):',
                error
            )

            // Don't show errors for offline mode - just silently fail
            // This allows the app to work offline without showing update errors
            this.updateState({
                status: 'idle',
                error: undefined
            })

            return null
        }
    }

    public async downloadUpdate(): Promise<void> {
        if (
            this.currentState.status !== 'available' ||
            !this.currentState.downloadUrl
        ) {
            throw new Error('No update available to download')
        }

        let cumulativeBytes = 0
        let totalBytes = 0

        try {
            this.updateState({
                status: 'downloading',
                error: undefined,
                progress: 0
            })

            const downloadDirectory = await downloadDir()
            const fileName = `Shop-Management-System-${this.currentState.update?.version || 'latest'}.apk`
            const filePath = await join(downloadDirectory, fileName)

            const fileExists = await exists(filePath)
            if (fileExists) {
                const downloadedVersion =
                    this.currentState.update?.version || 'unknown'
                this.setDownloadedVersion(downloadedVersion)
                this.updateState({
                    status: 'downloaded',
                    progress: 100,
                    downloadedVersion,
                    downloadedFilePath: filePath
                })
                return
            }

            await download(
                this.currentState.downloadUrl,
                filePath,
                (progressInfo) => {
                    const chunkSize =
                        typeof progressInfo.progress === 'number'
                            ? progressInfo.progress
                            : 0
                    const total =
                        typeof progressInfo.total === 'number'
                            ? progressInfo.total
                            : 0

                    if (total > 0) {
                        totalBytes = total
                        cumulativeBytes += chunkSize

                        const progressPercent = Math.min(
                            99,
                            Math.round((cumulativeBytes / totalBytes) * 100)
                        )
                        this.updateState({ progress: progressPercent })
                    }
                },
                new Map([
                    ['Accept', 'application/octet-stream'],
                    ['User-Agent', 'Shop-Management-System-Updater']
                ])
            )

            const downloadedVersion =
                this.currentState.update?.version || 'unknown'
            this.setDownloadedVersion(downloadedVersion)

            this.updateState({
                status: 'downloaded',
                progress: 100,
                downloadedVersion,
                downloadedFilePath: filePath
            })
        } catch (error) {
            console.error('Download error:', error)

            let errorMessage = 'Failed to download update'
            if (error instanceof Error) {
                if (
                    error.message.includes('network') ||
                    error.message.includes('fetch')
                ) {
                    errorMessage =
                        'Network error. Please check your internet connection and try again.'
                } else if (error.message.includes('HTTP')) {
                    errorMessage = `Download failed: ${error.message}`
                } else {
                    errorMessage = error.message
                }
            }

            this.updateState({
                status: 'error',
                error: errorMessage
            })

            throw error
        }
    }

    public async installUpdate(): Promise<void> {
        try {
            this.updateState({ status: 'installing', error: undefined })

            const currentPlatform = await getCurrentPlatform()
            // const downloadedFilePath = this.currentState.downloadedFilePath

            if (currentPlatform === 'android-aarch64') {
                // Prefer installing from the already-downloaded APK using Opener's openPath
                const localPath = this.currentState.downloadedFilePath
                console.log('localPath', localPath)
                if (localPath) {
                    try {
                        const fileExists = await exists(localPath)
                        if (!fileExists)
                            throw new Error('Downloaded file not found')
                        await openPath(localPath)
                        this.showInstallNotification()
                        setTimeout(() => {
                            this.clearDownloadedState()
                        }, 2000)
                        return
                    } catch (autoInstallError) {
                        console.warn(
                            'Local install failed, falling back to URL:',
                            autoInstallError
                        )
                    }
                }

                // Fallback: open the HTTPS download URL so the system package installer handles it.
                if (this.currentState.downloadUrl) {
                    try {
                        await openUrl(this.currentState.downloadUrl)
                        this.showInstallNotification()
                        setTimeout(() => {
                            this.clearDownloadedState()
                        }, 2000)
                    } catch (autoInstallError) {
                        console.error('Installation failed:', autoInstallError)
                        window.open(this.currentState.downloadUrl, '_blank')
                        this.updateState({
                            status: 'downloaded',
                            error: undefined
                        })
                    }
                }
            } else if (currentPlatform === 'darwin-aarch64') {
                // For iOS, redirect to App Store or show instructions
                if (this.currentState.downloadUrl) {
                    window.open(this.currentState.downloadUrl, '_blank')
                }
                this.updateState({
                    status: 'downloaded',
                    error: undefined
                })
                alert(
                    'Please update through the App Store to get the latest version.'
                )
            } else {
                // For other platforms, open the download URL
                if (this.currentState.downloadUrl) {
                    window.open(this.currentState.downloadUrl, '_blank')
                }
                this.updateState({
                    status: 'downloaded',
                    error: undefined
                })
                alert(
                    'Please install the downloaded file to update the application.'
                )
            }
        } catch (error) {
            console.error('Install error:', error)
            this.updateState({
                status: 'error',
                error: 'Failed to install update'
            })
            throw error
        }
    }

    private startPeriodicChecks(): void {
        const CHECK_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours

        this.checkInterval = window.setInterval(() => {
            this.checkForUpdates()
        }, CHECK_INTERVAL)
    }

    public stopPeriodicChecks(): void {
        if (this.checkInterval) {
            clearInterval(this.checkInterval)
            this.checkInterval = null
        }
    }

    public getCurrentState(): MobileUpdaterState {
        return this.currentState
    }

    public clearDownloadedState(): void {
        // Clear the downloaded blob and reset to available state
        ;(this as unknown as { downloadedBlob?: Blob }).downloadedBlob =
            undefined
        this.clearDownloadedVersion()
        this.updateState({
            status: 'available',
            progress: undefined,
            downloadedVersion: undefined,
            downloadedFilePath: undefined
        })
    }

    public async cleanupDownloadedFiles(): Promise<void> {
        try {
            const downloadedVersion = this.getDownloadedVersion()
            if (downloadedVersion) {
                const downloadDirectory = await downloadDir()
                const fileName = `Shop-Management-System-${downloadedVersion}.apk`
                const filePath = await join(downloadDirectory, fileName)

                const fileExists = await exists(filePath)
                if (fileExists) {
                    await remove(filePath)
                    console.log(`Cleaned up downloaded file: ${filePath}`)
                }
            }
        } catch (error) {
            console.warn('Error cleaning up downloaded files:', error)
        }
    }

    private getDownloadedVersion(): string | null {
        return localStorage.getItem('downloadedAppVersion')
    }

    private setDownloadedVersion(version: string): void {
        localStorage.setItem('downloadedAppVersion', version)
    }

    private clearDownloadedVersion(): void {
        localStorage.removeItem('downloadedAppVersion')
    }

    private showInstallNotification(): void {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('App Update', {
                body: `Installation started for v${this.currentState.update?.version || 'latest'}. The APK file will open automatically.`,
                icon: '/favicon.ico'
            })
        }
    }

    public checkIfAppWasUpdated(): boolean {
        // Check if the app version has changed since last check
        const lastKnownVersion = localStorage.getItem('lastKnownAppVersion')
        const currentVersion = APP_VERSION

        if (lastKnownVersion && lastKnownVersion !== currentVersion) {
            // App was updated
            localStorage.setItem('lastKnownAppVersion', currentVersion)
            return true
        } else if (!lastKnownVersion) {
            // First time running, store current version
            localStorage.setItem('lastKnownAppVersion', currentVersion)
        }

        return false
    }

    public showUpdateSuccessMessage(): void {
        const wasUpdated = this.checkIfAppWasUpdated()
        if (wasUpdated) {
            const successMessage = `
🎉 Update Successful!

✅ Your app has been updated successfully.
✅ All your data and settings have been preserved.
✅ You're now running the latest version.

Thank you for keeping your app up to date!
      `
            alert(successMessage)
        }
    }

    public destroy(): void {
        this.stopPeriodicChecks()
        this.isInitialized = false
        this.listeners = []
        this.currentState = { status: 'idle' }
    }
}

export const mobileUpdater = MobileUpdaterService.getInstance()
