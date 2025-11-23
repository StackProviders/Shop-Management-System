import { useState, memo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from '@/components/ui/drawer'
import { Plus } from 'lucide-react'
import { useAppBar } from '@/components/providers/app-bar'
import type { QuickAction } from '@/components/providers/app-bar'
import { QUICK_ACTIONS, DEFAULT_BOTTOM_ACTIONS } from '@/config/quick-actions'
import { cn } from '@/lib/utils'

const QuickActionButton = memo(
    ({ action, className }: { action: QuickAction; className?: string }) => {
        const Icon = action.icon
        return (
            <Button
                className={cn('shadow-lg', className, action.className)}
                onClick={action.onClick}
                variant={action.variant || 'default'}
            >
                <Icon className="h-4 w-4" />
                <span className="ml-1.5 text-sm font-medium">
                    {action.label}
                </span>
            </Button>
        )
    }
)

QuickActionButton.displayName = 'QuickActionButton'

export const MobileBottomActions = memo(() => {
    const { bottomActions, showQuickActionCenter } = useAppBar()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const router = useRouter()

    const handleNavigate = (href: string) => {
        router.push(href)
        setIsDrawerOpen(false)
    }

    const defaultActions: QuickAction[] = DEFAULT_BOTTOM_ACTIONS.map(
        (item) => ({
            ...item,
            onClick: () => handleNavigate(item.href),
            variant: item.label === 'Sale' ? 'destructive' : 'secondary'
        })
    )

    const actions = bottomActions.length > 0 ? bottomActions : defaultActions
    const showCenter = bottomActions.length > 0 ? showQuickActionCenter : true

    if (actions.length === 0 && !showCenter) return null

    return (
        <>
            <div
                className="fixed bottom-0 left-0 right-0 z-50"
                style={{ paddingBottom: 'var(--sab)' }}
            >
                <div className="bg-background/95 backdrop-blur border-t px-3 py-2.5 shadow-lg">
                    <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
                        {actions[0] && (
                            <QuickActionButton
                                action={actions[0]}
                                className="flex-1"
                            />
                        )}
                        {showCenter && (
                            <Button
                                className="h-11 w-11 rounded-full shadow-md shrink-0"
                                size="icon"
                                onClick={() => setIsDrawerOpen(true)}
                            >
                                <Plus className="h-5 w-5" />
                            </Button>
                        )}
                        {actions[1] && (
                            <QuickActionButton
                                action={actions[1]}
                                className="flex-1"
                            />
                        )}
                    </div>
                </div>
            </div>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="max-h-[80vh]">
                    <DrawerHeader className="pb-3">
                        <DrawerTitle>Quick Actions</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 pb-6 overflow-y-auto space-y-5">
                        {QUICK_ACTIONS.map((group) => (
                            <div key={group.title}>
                                <h3 className="text-xs font-semibold text-muted-foreground mb-2.5 px-1">
                                    {group.title}
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {group.items.map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <Button
                                                key={item.href}
                                                variant="outline"
                                                className="h-20 flex-col gap-1.5 text-xs p-2"
                                                onClick={() =>
                                                    handleNavigate(item.href)
                                                }
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="text-center leading-tight line-clamp-2">
                                                    {item.label}
                                                </span>
                                            </Button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
})

MobileBottomActions.displayName = 'MobileBottomActions'
