import { AppSidebar } from '@/components/app-sidebar'
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from '@/components/ui/drawer'
import {
    ArrowLeft,
    ShoppingCart,
    ShoppingBag,
    Plus,
    FileText,
    RotateCcw,
    ClipboardList,
    FileCheck,
    FilePlus,
    Truck,
    ArrowDownLeft,
    Package,
    ArrowUpRight,
    Receipt,
    ArrowLeftRight,
    Search as SearchIcon
} from 'lucide-react'
import type { QuickAction } from '@/contexts/app-bar'
import { Outlet } from 'react-router'
import { useState, useMemo, useCallback } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { AppBarProvider, useAppBar } from '@/contexts/app-bar'
import { cn } from '@/lib/utils'
import { SearchInput } from '../ui/search-input'
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle
} from '@/components/ui/empty'
import { Heading4 } from '../ui/typography'

function DashboardHeader() {
    const isMobile = useIsMobile()
    const { title, showBackButton, onBack, actions } = useAppBar()

    return (
        <header className="sticky top-0 z-10 flex h-auto md:h-16 shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 md:px-4 py-3">
            {isMobile && showBackButton ? (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onBack || undefined}
                    className="shrink-0"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
            ) : (
                <SidebarTrigger className="shrink-0" />
            )}
            {title && (
                <div className="flex-1 min-w-0">
                    {typeof title === 'string' ? (
                        <Heading4
                            title={title}
                            className="text-lg font-semibold truncate"
                        >
                            {title}
                        </Heading4>
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
}

const TRANSACTION_GROUPS = [
    {
        title: 'Sale Transactions',
        items: [
            { icon: FileText, label: 'Sale Invoice', action: 'sale-invoice' },
            { icon: ArrowDownLeft, label: 'Payment-In', action: 'payment-in' },
            { icon: RotateCcw, label: 'Credit Note', action: 'credit-note' },
            { icon: ClipboardList, label: 'Sale Order', action: 'sale-order' },
            { icon: FileCheck, label: 'Estimate', action: 'estimate' },
            { icon: FilePlus, label: 'Proforma Invoice', action: 'proforma' },
            { icon: Truck, label: 'Delivery Challan', action: 'delivery' }
        ]
    },
    {
        title: 'Purchase Transactions',
        items: [
            { icon: ShoppingCart, label: 'Purchase', action: 'purchase' },
            { icon: ArrowUpRight, label: 'Payment-Out', action: 'payment-out' },
            { icon: RotateCcw, label: 'Debit Note', action: 'debit-note' },
            { icon: Package, label: 'Purchase Order', action: 'purchase-order' }
        ]
    },
    {
        title: 'Other Transactions',
        items: [
            { icon: Receipt, label: 'Expenses', action: 'expenses' },
            {
                icon: ArrowLeftRight,
                label: 'Party Transfer',
                action: 'party-transfer'
            }
        ]
    }
]

const QuickActionButton = ({
    action,
    className
}: {
    action: QuickAction
    className?: string
}) => {
    const Icon = action.icon
    return (
        <Button
            className={cn('shadow-lg', className, action.className)}
            size="sm"
            onClick={action.onClick}
            variant={action.variant || 'primary'}
        >
            <Icon className="size-4 mr-1" />
            {action.label}
        </Button>
    )
}

function MobileBottomActions() {
    const { bottomActions, showQuickActionCenter } = useAppBar()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const handleAction = useCallback((action: string) => {
        console.log('Action:', action)
        setIsDrawerOpen(false)
        setSearchQuery('')
    }, [])

    const filteredGroups = useMemo(() => {
        if (!searchQuery.trim()) return TRANSACTION_GROUPS

        const query = searchQuery.toLowerCase()
        return TRANSACTION_GROUPS.map((group) => ({
            ...group,
            items: group.items.filter((item) =>
                item.label.toLowerCase().includes(query)
            )
        })).filter((group) => group.items.length > 0)
    }, [searchQuery])

    const defaultActions: QuickAction[] = [
        {
            icon: ShoppingCart,
            label: 'Add Purchase',
            onClick: () => handleAction('purchase'),
            variant: 'secondary'
        },
        {
            icon: ShoppingBag,
            label: 'Add Sale',
            onClick: () => handleAction('sale-invoice'),
            variant: 'destructive'
        }
    ]

    // Use custom actions if provided, otherwise show defaults with center button
    const actions = bottomActions.length > 0 ? bottomActions : defaultActions
    const hasActions = actions.length > 0

    // Show center button by default unless explicitly disabled
    const showCenter = bottomActions.length > 0 ? showQuickActionCenter : true

    if (!hasActions && !showCenter) {
        return null
    }

    return (
        <>
            <div className="fixed bottom-4 left-4 right-4 z-50">
                <div className="flex items-center gap-2">
                    {actions[0] && (
                        <QuickActionButton
                            action={actions[0]}
                            className="flex-1"
                        />
                    )}
                    {showCenter && (
                        <Button
                            className="shadow-lg rounded-full shrink-0"
                            size="icon"
                            variant="outline"
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

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent className="max-h-[85vh]">
                    <DrawerHeader>
                        <DrawerTitle>Quick Actions</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 pb-2">
                        <SearchInput
                            placeholder="Search actions..."
                            value={searchQuery}
                            onValueChange={setSearchQuery}
                        />
                    </div>
                    <div className="p-4 pt-2 pb-8 overflow-y-auto space-y-6">
                        {filteredGroups.length === 0 ? (
                            <Empty>
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <SearchIcon />
                                    </EmptyMedia>
                                    <EmptyTitle>No actions found</EmptyTitle>
                                    <EmptyDescription>
                                        Try searching with different keywords
                                    </EmptyDescription>
                                </EmptyHeader>
                            </Empty>
                        ) : (
                            filteredGroups.map((group) => (
                                <div key={group.title}>
                                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                                        {group.title}
                                    </h3>
                                    <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                                        {group.items.map((item) => {
                                            const Icon = item.icon
                                            return (
                                                <Button
                                                    key={item.action}
                                                    variant="outline"
                                                    className="h-20 sm:h-24 flex-col gap-1.5 sm:gap-2 text-xs p-2"
                                                    onClick={() =>
                                                        handleAction(
                                                            item.action
                                                        )
                                                    }
                                                >
                                                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                                                    <span className="text-center leading-tight line-clamp-2">
                                                        {item.label}
                                                    </span>
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

function DashboardLayoutContent() {
    const isMobile = useIsMobile()
    const { showBottomActions } = useAppBar()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <DashboardHeader />
                <main
                    className={cn(
                        'flex-1 overflow-auto p-3',
                        isMobile && showBottomActions && ''
                    )}
                >
                    <Outlet />
                </main>
                {isMobile && showBottomActions && <MobileBottomActions />}
            </SidebarInset>
        </SidebarProvider>
    )
}

export function DashboardLayout() {
    return (
        <AppBarProvider>
            <DashboardLayoutContent />
        </AppBarProvider>
    )
}
