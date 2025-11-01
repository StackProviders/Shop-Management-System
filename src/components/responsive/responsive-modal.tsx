import { ReactNode } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogBody,
    DialogFooter
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface ResponsiveModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    children: ReactNode
    footer?: ReactNode
    className?: string
    contentClassName?: string
    showHeader?: boolean
    header?: ReactNode
}

export function ResponsiveModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    className,
    contentClassName,
    showHeader = true,
    header
}: ResponsiveModalProps) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className={cn('flex flex-col', className)}>
                    {showHeader &&
                        (header || (
                            <DrawerHeader className="flex-shrink-0">
                                {title && <DrawerTitle>{title}</DrawerTitle>}
                                {description && (
                                    <DrawerDescription>
                                        {description}
                                    </DrawerDescription>
                                )}
                            </DrawerHeader>
                        ))}
                    <ScrollArea className="flex-1 overflow-y-auto">
                        <div className={cn('px-4 pb-4', contentClassName)}>
                            {children}
                        </div>
                    </ScrollArea>
                    {footer && (
                        <DrawerFooter className="flex-shrink-0 border-t bg-background">
                            {footer}
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    'flex flex-col max-w-2xl max-h-[90vh] p-0',
                    className
                )}
            >
                {showHeader &&
                    (header || (
                        <DialogHeader className="flex-shrink-0 px-6 pt-6">
                            {title && <DialogTitle>{title}</DialogTitle>}
                            {description && (
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                            )}
                        </DialogHeader>
                    ))}
                <DialogBody className="flex-1 overflow-y-auto px-6">
                    <div className={contentClassName}>{children}</div>
                </DialogBody>
                {footer && (
                    <DialogFooter className="flex-shrink-0 px-6 pb-6 border-t pt-4">
                        {footer}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
