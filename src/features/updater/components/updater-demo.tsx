import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { detectPlatformSync, detectPlatform } from '@/utils/platform-detection'
import { useEffect, useState } from 'react'
import { MobileUpdater } from './mobile-updater'

/**
 * Demo component to showcase the updater functionality
 * Shows platform detection and the mobile updater interface
 */
export function UpdaterDemo() {
    const [platformInfo, setPlatformInfo] = useState(detectPlatformSync())
    const [updaterPlatform, setUpdaterPlatform] = useState('android-aarch64')

    console.log({ detectPlatform: detectPlatform() })

    useEffect(() => {
        // Load async platform detection
        const loadPlatformInfo = async () => {
            const info = await import('@/utils/platform-detection').then((m) =>
                m.detectPlatform()
            )
            const platform = await import('@/utils/platform-detection').then(
                (m) => m.getUpdaterPlatformString()
            )
            setPlatformInfo(info)
            setUpdaterPlatform(platform)
        }

        loadPlatformInfo()
    }, [])

    return (
        <div className="space-y-6">
            {/* Platform Detection Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <span>Platform Detection</span>
                        <Badge variant="outline">{platformInfo.platform}</Badge>
                    </CardTitle>
                    <CardDescription>
                        Current platform information and updater configuration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium mb-2">
                                Platform Details:
                            </h4>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                <li>
                                    • Platform:{' '}
                                    <span className="font-mono">
                                        {platformInfo.platform}
                                    </span>
                                </li>
                                <li>
                                    • Is Mobile:{' '}
                                    <span className="font-mono">
                                        {platformInfo.isMobile ? 'Yes' : 'No'}
                                    </span>
                                </li>
                                <li>
                                    • Is Desktop:{' '}
                                    <span className="font-mono">
                                        {platformInfo.isDesktop ? 'Yes' : 'No'}
                                    </span>
                                </li>
                                <li>
                                    • Is Tauri:{' '}
                                    <span className="font-mono">
                                        {platformInfo.isTauri ? 'Yes' : 'No'}
                                    </span>
                                </li>
                                <li>
                                    • Is Android:{' '}
                                    <span className="font-mono">
                                        {platformInfo.isAndroid ? 'Yes' : 'No'}
                                    </span>
                                </li>
                                <li>
                                    • Is iOS:{' '}
                                    <span className="font-mono">
                                        {platformInfo.isIOS ? 'Yes' : 'No'}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">
                                Updater Configuration:
                            </h4>
                            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                                <li>
                                    • Updater Platform:{' '}
                                    <span className="font-mono">
                                        {updaterPlatform}
                                    </span>
                                </li>
                                <li>
                                    • Uses Mobile Updater:{' '}
                                    <span className="font-mono">
                                        Yes (All Platforms)
                                    </span>
                                </li>
                                <li>
                                    • Platform Detection:{' '}
                                    <span className="font-mono">
                                        {platformInfo.isTauri
                                            ? 'Tauri OS Plugin'
                                            : 'User Agent'}
                                    </span>
                                </li>
                                <li>
                                    • Endpoint:{' '}
                                    <span className="font-mono text-xs break-all">
                                        updater-worker.stackproviders.workers.dev/latest
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Note:</strong> The mobile updater now
                            handles all platforms using Tauri&apos;s OS plugin
                            for accurate platform detection. It uses the
                            latest.json endpoint for all platforms and provides
                            platform-specific download URLs.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Updater Component */}
            <Card>
                <CardHeader>
                    <CardTitle>Mobile Auto Updater</CardTitle>
                    <CardDescription>
                        Unified updater using Tauri OS plugin for accurate
                        platform detection and latest.json endpoint
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <MobileUpdater />
                </CardContent>
            </Card>
        </div>
    )
}
