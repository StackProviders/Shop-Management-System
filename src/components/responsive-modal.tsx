import { ReactNode } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer'

interface ResponsiveModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    children: ReactNode
    className?: string
}

export function ResponsiveModal({
    open,
    onOpenChange,
    title,
    children,
    className
}: ResponsiveModalProps) {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-3 pb-4 sm:px-4">{children}</div>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={className || 'max-w-md sm:max-w-lg'}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
