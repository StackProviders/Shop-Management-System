import { HTMLAttributes, forwardRef } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

// Base Components
interface ListDetailHeaderProps extends HTMLAttributes<HTMLDivElement> {
    isRouteActive?: boolean
}

const ListDetailHeader = forwardRef<HTMLDivElement, ListDetailHeaderProps>(
    ({ className, isRouteActive, ...props }, ref) => {
        const isMobile = useIsMobile()

        return (
            <div
                ref={ref}
                className={cn(
                    'border-b space-y-3 p-2',
                    isMobile && isRouteActive && 'hidden',
                    className
                )}
                {...props}
            />
        )
    }
)
ListDetailHeader.displayName = 'ListDetailHeader'

const ListDetailHeaderContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex items-center gap-2 sm:gap-3 justify-between',
            className
        )}
        {...props}
    />
))
ListDetailHeaderContent.displayName = 'ListDetailHeaderContent'

const ListDetailHeaderTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn('text-lg sm:text-xl font-semibold', className)}
        {...props}
    />
))
ListDetailHeaderTitle.displayName = 'ListDetailHeaderTitle'

const ListDetailHeaderActions = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center gap-2 flex-wrap', className)}
        {...props}
    />
))
ListDetailHeaderActions.displayName = 'ListDetailHeaderActions'

const ListDetailStats = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm',
            className
        )}
        {...props}
    />
))
ListDetailStats.displayName = 'ListDetailStats'

interface ListDetailStatProps extends HTMLAttributes<HTMLDivElement> {
    label: string
    value: string | number
}

const ListDetailStat = forwardRef<HTMLDivElement, ListDetailStatProps>(
    ({ label, value, className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn('flex items-center gap-1.5 sm:gap-2', className)}
            {...props}
        >
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-semibold">{value}</span>
        </div>
    )
)
ListDetailStat.displayName = 'ListDetailStat'

const ListDetailList = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & { isRouteActive?: boolean }
>(({ className, isRouteActive, ...props }, ref) => {
    const isMobile = useIsMobile()

    return (
        <div
            ref={ref}
            className={cn(
                'flex flex-col min-h-0',
                isMobile ? 'flex-1' : 'w-80 border-r',
                isMobile && isRouteActive && 'hidden',
                className
            )}
            {...props}
        />
    )
})
ListDetailList.displayName = 'ListDetailList'

const ListDetailListHeader = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('p-3 sm:p-4 border-b space-y-3 shrink-0', className)}
        {...props}
    />
))
ListDetailListHeader.displayName = 'ListDetailListHeader'

const ListDetailListContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
    <ScrollArea ref={ref} className={cn('flex-1', className)} {...props}>
        {children}
    </ScrollArea>
))
ListDetailListContent.displayName = 'ListDetailListContent'

const ListDetailContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & { isRouteActive?: boolean }
>(({ className, isRouteActive, children, ...props }, ref) => {
    const isMobile = useIsMobile()

    return (
        <ScrollArea
            ref={ref}
            className={cn(
                'flex-1',
                isMobile && !isRouteActive && 'hidden',
                className
            )}
            {...props}
        >
            {children}
        </ScrollArea>
    )
})
ListDetailContent.displayName = 'ListDetailContent'

const ListDetailContentHeader = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('border-b p-3 sm:p-4', className)}
        {...props}
    />
))
ListDetailContentHeader.displayName = 'ListDetailContentHeader'

const ListDetailContentHeaderTitle = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
        {...props}
    />
))
ListDetailContentHeaderTitle.displayName = 'ListDetailContentHeaderTitle'

const ListDetailContentHeaderInfo = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm mt-3',
            className
        )}
        {...props}
    />
))
ListDetailContentHeaderInfo.displayName = 'ListDetailContentHeaderInfo'

interface ListDetailContentHeaderInfoItemProps
    extends HTMLAttributes<HTMLDivElement> {
    label: string
    value: string
}

const ListDetailContentHeaderInfoItem = forwardRef<
    HTMLDivElement,
    ListDetailContentHeaderInfoItemProps
>(({ label, value, className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
        <div className="text-muted-foreground text-xs mb-1">{label}</div>
        <div className="text-primary font-medium break-words">{value}</div>
    </div>
))
ListDetailContentHeaderInfoItem.displayName = 'ListDetailContentHeaderInfoItem'

const ListDetailContentBody = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-3 sm:p-4', className)} {...props} />
))
ListDetailContentBody.displayName = 'ListDetailContentBody'

const ListDetailRoot = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('h-full flex flex-col', className)}
        {...props}
    />
))
ListDetailRoot.displayName = 'ListDetailRoot'

const ListDetailBody = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex-1 flex flex-col md:flex-row min-h-0', className)}
        {...props}
    />
))
ListDetailBody.displayName = 'ListDetailBody'

export {
    ListDetailRoot,
    ListDetailHeader,
    ListDetailHeaderContent,
    ListDetailHeaderTitle,
    ListDetailHeaderActions,
    ListDetailStats,
    ListDetailStat,
    ListDetailBody,
    ListDetailList,
    ListDetailListHeader,
    ListDetailListContent,
    ListDetailContent,
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
}
