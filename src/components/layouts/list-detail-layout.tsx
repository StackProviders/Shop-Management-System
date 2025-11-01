import { ReactNode } from 'react'
import { Outlet } from 'react-router'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from '@/components/ui/empty'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Heading2 } from '@/components/ui/typography'

interface StatItem {
    label: string
    value: number
}

interface ListDetailLayoutProps {
    title: string
    stats?: StatItem[]
    searchValue: string
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    filterComponent?: ReactNode
    listComponent: ReactNode
    emptyIcon: ReactNode
    emptyTitle: string
    emptyDescription: string
    hasItems: boolean
    onCreateNew: () => void
    createButtonLabel?: string
    isRouteActive: boolean
    className?: string
}

export function ListDetailLayout({
    title,
    stats,
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search...',
    filterComponent,
    listComponent,
    emptyIcon,
    emptyTitle,
    emptyDescription,
    hasItems,
    onCreateNew,
    createButtonLabel = 'Add New',
    isRouteActive,
    className
}: ListDetailLayoutProps) {
    const isMobile = useIsMobile()

    return (
        <div className={cn('h-full flex flex-col', className)}>
            {/* Top Header */}
            <div
                className={cn(
                    'border-b space-y-3 p-2',
                    isMobile && isRouteActive && 'hidden'
                )}
            >
                <div className="flex items-center gap-2 sm:gap-3 justify-between">
                    <Heading2>{title}</Heading2>
                    <Button
                        variant="primary"
                        size={isMobile ? 'xs' : 'sm'}
                        onClick={onCreateNew}
                    >
                        <Plus className="size-4" />
                        <span className="hidden xs:inline">
                            {createButtonLabel}
                        </span>
                    </Button>
                </div>
                {stats && stats.length > 0 && (
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1.5 sm:gap-2"
                            >
                                <span className="text-muted-foreground">
                                    {stat.label}:
                                </span>
                                <span className="font-semibold">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
                {/* Left Sidebar - List */}
                <div
                    className={cn(
                        'flex flex-col min-h-0',
                        isMobile ? 'flex-1' : 'w-80 border-r',
                        isMobile && isRouteActive && 'hidden'
                    )}
                >
                    <div className="p-3 sm:p-4 border-b space-y-3 shrink-0">
                        <div className="flex gap-2">
                            <SearchInput
                                value={searchValue}
                                onValueChange={onSearchChange}
                                placeholder={searchPlaceholder}
                                wrapperClassName="flex-1"
                            />
                            {filterComponent}
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        {!hasItems ? (
                            <div className="p-3 sm:p-4">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            {emptyIcon}
                                        </EmptyMedia>
                                        <EmptyTitle>{emptyTitle}</EmptyTitle>
                                        <EmptyDescription>
                                            {emptyDescription}
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </div>
                        ) : (
                            listComponent
                        )}
                    </ScrollArea>
                </div>

                {/* Right Content - Outlet for nested routes */}
                <ScrollArea
                    className={cn(
                        'flex-1',
                        isMobile && !isRouteActive && 'hidden'
                    )}
                >
                    <Outlet />
                </ScrollArea>
            </div>
        </div>
    )
}
