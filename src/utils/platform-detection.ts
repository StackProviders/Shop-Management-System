import { platform as tauriPlatform } from '@tauri-apps/plugin-os'

/**
 * Platform detection utilities using Tauri OS plugin for accurate platform detection
 */

export type Platform =
    | 'android'
    | 'ios'
    | 'windows'
    | 'macos'
    | 'linux'
    | 'mobile-web'

export interface PlatformInfo {
    platform: Platform
    isMobile: boolean
    isDesktop: boolean
    isAndroid: boolean
    isIOS: boolean
    isTauri: boolean
    userAgent: string
}

/**
 * Detect the current platform using Tauri OS plugin when available, fallback to user agent
 */
export function getPlatform(): PlatformInfo {
    if (typeof window === 'undefined') {
        return {
            platform: 'mobile-web',
            isMobile: false,
            isDesktop: false,
            isAndroid: false,
            isIOS: false,
            isTauri: false,
            userAgent: 'server'
        }
    }

    const isTauri = '__TAURI__' in window
    let platform: Platform
    let isAndroid = false
    let isIOS = false

    // Only call tauriPlatform if we are in a Tauri environment or if the plugin handles non-Tauri gracefully.
    // Assuming the plugin might throw or fail if window is missing (which we checked) or if not in Tauri.
    // But the error was specifically "window is not defined" inside the plugin call likely.

    let currentPlatform: string | null = null
    try {
        if (isTauri) {
            currentPlatform = tauriPlatform()
        }
    } catch (e) {
        console.warn('Failed to detect Tauri platform:', e)
    }

    switch (currentPlatform) {
        case 'android':
            platform = 'android'
            isAndroid = true
            break
        case 'ios':
            platform = 'ios'
            isIOS = true
            break
        case 'windows':
            platform = 'windows'
            break
        case 'macos':
            platform = 'macos'
            break
        case 'linux':
            platform = 'linux'
            break
        default:
            platform = 'mobile-web'
    }

    const isMobile = isAndroid || isIOS || platform === 'mobile-web'

    return {
        platform,
        isMobile,
        isDesktop: !isMobile && isTauri,
        isAndroid,
        isIOS,
        isTauri,
        userAgent: navigator.userAgent
    }
}

/**
 * Get the appropriate platform string for the updater API
 * Always returns mobile platform strings since we only use mobile updater
 */
export function getUpdaterPlatformString(): string {
    const platformInfo = getPlatform()

    if (platformInfo.isAndroid) {
        return 'android-aarch64'
    } else if (platformInfo.isIOS) {
        return 'darwin-aarch64' // iOS uses darwin-aarch64 in the API
    } else {
        // Default to android for mobile web and desktop
        return 'android-aarch64'
    }
}
