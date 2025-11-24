'use client'

import darkLogo from '@/assets/logo/dark-logo.svg'
import lightLogo from '@/assets/logo/light-logo.svg'
import { useTheme } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { useDeferredValue, useSyncExternalStore } from 'react'

interface LogoProps {
    logoClassName?: string
    size?: 'sm' | 'md' | 'lg'
    showTagline?: boolean
}

const getSystemTheme = () =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', callback)
    return () => mediaQuery.removeEventListener('change', callback)
}

export default function Logo({
    logoClassName,
    size = 'md',
    showTagline = false
}: LogoProps) {
    const { theme } = useTheme()
    const systemTheme = useSyncExternalStore(
        subscribe,
        getSystemTheme,
        () => 'light'
    )
    const resolvedTheme = theme === 'system' ? systemTheme : theme
    const deferredTheme = useDeferredValue(resolvedTheme)

    const sizeClasses = {
        sm: 'size-6',
        md: 'size-8 md:size-10',
        lg: 'size-10 md:size-12'
    }

    const textSizeClasses = {
        sm: 'text-base md:text-lg',
        md: 'text-xl md:text-2xl',
        lg: 'text-2xl md:text-3xl'
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
                <img
                    src={
                        deferredTheme === 'dark'
                            ? darkLogo.src || darkLogo
                            : lightLogo.src || lightLogo
                    }
                    alt="Stack Provider Logo"
                    className={cn(
                        sizeClasses[size],
                        'transition-opacity duration-200'
                    )}
                />
                <div
                    className={cn(
                        logoClassName,
                        'flex gap-1',
                        textSizeClasses[size]
                    )}
                >
                    <span className="font-medium">Stack</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-500">
                        Provider
                    </span>
                </div>
            </div>
            {showTagline && (
                <p className="text-xs text-muted-foreground text-center">
                    Secure Inventory Management
                </p>
            )}
        </div>
    )
}
