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
                'relative isolate flex items-center rounded-full border bg-background',
                'group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:py-1 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:w-fit group-data-[collapsible=icon]:mx-auto',
                'h-8 px-1 w-fit justify-end ml-auto',
                className
            )}
        >
            {THEMES.map(({ type, icon: Icon, label }) => {
                const isActive = deferredTheme === type

                return (
                    <button
                        aria-label={`Switch to ${label}`}
                        className="group relative size-6 rounded-full transition-all duration-300 ease-out hover:scale-110 shrink-0"
                        key={type}
                        onClick={() => setTheme(type)}
                        title={`Switch to ${label}`}
                        type="button"
                    >
                        {isActive && (
                            <div className="-z-1 absolute inset-0 rounded-full bg-muted transition-opacity duration-300" />
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
