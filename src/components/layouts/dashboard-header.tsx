import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { ArrowLeft } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { useAppBar } from '@/components/providers/app-bar'

export const DashboardHeader = memo(() => {
    const isMobile = useIsMobile()
    const { title, showBackButton, onBack, actions } = useAppBar()

    return (
        <header className="sticky top-0 z-10 flex h-14 md:h-16 shrink-0 items-center gap-2 border-b bg-background px-3 md:px-4">
            {isMobile && showBackButton ? (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack || undefined}
                    className="shrink-0 -ml-2"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            ) : (
                <SidebarTrigger className="shrink-0" />
            )}
            {title && (
                <div className="flex-1 min-w-0">
                    {typeof title === 'string' ? (
                        <h1 className="text-base md:text-lg font-semibold truncate">
                            {title}
                        </h1>
                    ) : (
                        title
                    )}
                </div>
            )}
            {!title && <div className="flex-1" />}
            {actions && (
                <div className="flex items-center gap-1 shrink-0">
                    {actions}
                </div>
            )}
        </header>
    )
})

DashboardHeader.displayName = 'DashboardHeader'
