import darkLogo from '@/assets/logo/dark-logo.svg'
import lightLogo from '@/assets/logo/light-logo.svg'
import { useTheme } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface LogoProps {
    logoClassName?: string
    size?: 'sm' | 'md' | 'lg'
    showTagline?: boolean
}

export default function Logo({
    logoClassName,
    size = 'md',
    showTagline = false
}: LogoProps) {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

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

    if (!mounted) {
        return <div className={sizeClasses[size]} />
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
                <img
                    src={theme === 'dark' ? lightLogo : darkLogo}
                    alt="Stack Provider Logo"
                    className={sizeClasses[size]}
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
