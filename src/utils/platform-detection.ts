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
    isMacOS: boolean
    isWindows: boolean
    isLinux: boolean
    isTauri: boolean
    userAgent: string
}

/**
 * Detect the current platform using Tauri OS plugin when available, fallback to user agent
 */
export function getPlatform(): PlatformInfo {
    const isTauri = typeof window !== 'undefined' && '__TAURI__' in window
    let platform: Platform
    let isAndroid = false
    let isIOS = false

    const currentPlatform = tauriPlatform()

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
        isMacOS: platform === 'macos',
        isWindows: platform === 'windows',
        isLinux: platform === 'linux',
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
