import { cn } from '@/lib/utils'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useDeferredValue } from 'react'
import { useTheme } from '@/components/providers/theme-provider'

const THEMES = [
    {
        type: 'system',
        icon: Monitor,
        label: 'system theme'
    },
    {
        type: 'light',
        icon: Sun,
        label: 'light theme'
    },
    {
        type: 'dark',
        icon: Moon,
        label: 'dark theme'
    }
] as const

function ThemeSwitcher({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()
    const deferredTheme = useDeferredValue(theme)

    return (
        <div
            className={cn(
                'relative isolate z-[999] inline-flex h-8 items-center rounded-full border bg-background border-dotted px-1',
                className
            )}
        >
            {THEMES.map(({ type, icon: Icon, label }) => {
                const isActive = deferredTheme === type

                return (
                    <button
                        aria-label={`Switch to ${label}`}
                        className="group relative size-6 rounded-full transition duration-200 ease-out"
                        key={type}
                        onClick={() => setTheme(type)}
                        title={`Switch to ${label}`}
                        type="button"
                        data-umami-event={`Switch Theme to ${type}`}
                    >
                        {isActive && (
                            <div className="-z-1 absolute inset-0 rounded-full bg-muted transition-opacity duration-200" />
                        )}
                        <Icon
                            className={cn(
                                'relative m-auto size-3.5 transition-colors duration-200 ease-out',
                                isActive
                                    ? 'text-foreground'
                                    : 'text-secondary-foreground group-hover:text-foreground group-focus-visible:text-foreground'
                            )}
                        />
                    </button>
                )
            })}
        </div>
    )
}

export { ThemeSwitcher }
