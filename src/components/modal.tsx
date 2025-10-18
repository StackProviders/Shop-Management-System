import * as React from 'react'
import { detectPlatformSync } from '@/utils/platform-detection'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

interface ResponsiveDialogProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: React.ReactNode
    title?: string
    description?: string
    children: React.ReactNode
    showCloseButton?: boolean
    className?: string
}

export function ResponsiveDialog({
    open,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    showCloseButton = true,
    className
}: ResponsiveDialogProps) {
    const [isMobile] = React.useState(() => detectPlatformSync().isMobile)

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
                <DrawerContent>
                    {(title || description) && (
                        <DrawerHeader className="text-left">
                            {title && <DrawerTitle>{title}</DrawerTitle>}
                            {description && (
                                <DrawerDescription>
                                    {description}
                                </DrawerDescription>
                            )}
                        </DrawerHeader>
                    )}
                    <div className={cn('px-4 pb-4', className)}>{children}</div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent
                showCloseButton={showCloseButton}
                className={className}
            >
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && (
                            <DialogDescription>{description}</DialogDescription>
                        )}
                    </DialogHeader>
                )}
                {children}
            </DialogContent>
        </Dialog>
    )
}
