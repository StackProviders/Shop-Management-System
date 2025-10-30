import { ReactNode } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { ResponsiveRouteView } from '@/components/responsive/responsive-route-view'
import { cn } from '@/lib/utils'

interface ListDetailLayoutProps {
    list: ReactNode
    detail?: ReactNode
    isDetailOpen: boolean
    baseRoute: string
    detailClassName?: string
}

export function ListDetailLayout({
    list,
    detail,
    isDetailOpen,
    baseRoute,
    detailClassName
}: ListDetailLayoutProps) {
    const isMobile = useIsMobile()

    return (
        <div className="h-full flex">
            <div className={cn('flex-1', isDetailOpen && isMobile && 'hidden')}>
                {list}
            </div>
            <ResponsiveRouteView
                isOpen={isDetailOpen}
                baseRoute={baseRoute}
                className={detailClassName}
            >
                {detail}
            </ResponsiveRouteView>
        </div>
    )
}
