import { ReactNode } from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogPopup,
    DialogClose
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button, SubmitButton } from '@/components/ui/button'
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
    showCloseButton?: boolean
    formId?: string
    submitLabel?: string
    cancelLabel?: string
    isSubmitting?: boolean
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
    header,
    showCloseButton = true,
    formId,
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
    isSubmitting = false
}: ResponsiveModalProps) {
    const isMobile = useIsMobile()

    const defaultFooter = formId ? (
        <div className="flex gap-2 w-full justify-end">
            {isMobile ? (
                <>
                    <DrawerClose asChild>
                        <Button
                            variant="ghost"
                            className="flex-1"
                            disabled={isSubmitting}
                        >
                            {cancelLabel}
                        </Button>
                    </DrawerClose>
                    <SubmitButton
                        form={formId}
                        className="flex-1"
                        loading={isSubmitting}
                    >
                        {submitLabel}
                    </SubmitButton>
                </>
            ) : (
                <>
                    <DialogClose
                        render={
                            <Button variant="ghost" disabled={isSubmitting} />
                        }
                    >
                        {cancelLabel}
                    </DialogClose>
                    <SubmitButton form={formId} loading={isSubmitting}>
                        {submitLabel}
                    </SubmitButton>
                </>
            )}
        </div>
    ) : null

    const footerContent = footer ?? defaultFooter

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
                    {footerContent && (
                        <DrawerFooter className="flex-shrink-0 border-t bg-background">
                            {footerContent}
                        </DrawerFooter>
                    )}
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogPopup
                className={cn(
                    'flex flex-col max-w-2xl max-h-[90vh]',
                    className
                )}
                showCloseButton={showCloseButton}
            >
                {showHeader &&
                    (header || (
                        <DialogHeader className="flex-shrink-0">
                            {title && <DialogTitle>{title}</DialogTitle>}
                            {description && (
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                            )}
                        </DialogHeader>
                    ))}
                <div className="flex-1 overflow-y-auto">
                    <div className={contentClassName}>{children}</div>
                </div>
                {footerContent && (
                    <DialogFooter className="flex-shrink-0">
                        {footerContent}
                    </DialogFooter>
                )}
            </DialogPopup>
        </Dialog>
    )
}
