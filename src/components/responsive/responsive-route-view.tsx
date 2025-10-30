import { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { cn } from '@/lib/utils'

interface ResponsiveRouteViewProps {
    isOpen: boolean
    baseRoute: string
    children: ReactNode
    title?: string
    className?: string
}

export function ResponsiveRouteView({
    isOpen,
    baseRoute,
    children,
    title,
    className
}: ResponsiveRouteViewProps) {
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    if (isMobile) {
        return <div className="p-4">{children}</div>
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => !open && navigate(baseRoute)}
        >
            <DialogContent
                className={cn(
                    'max-w-4xl max-h-[90vh] overflow-y-auto',
                    className
                )}
            >
                {title && (
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                )}
                {children}
            </DialogContent>
        </Dialog>
    )
}
