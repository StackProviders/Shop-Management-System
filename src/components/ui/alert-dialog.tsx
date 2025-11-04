import { memo } from 'react'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui-components/react/alert-dialog'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const AlertDialog = memo(function AlertDialog(
    props: AlertDialogPrimitive.Root.Props
) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
})

const AlertDialogTrigger = memo(function AlertDialogTrigger({
    asChild,
    children,
    ...props
}: AlertDialogPrimitive.Trigger.Props & { asChild?: boolean }) {
    const render =
        asChild && children
            ? (children as React.ReactElement<Record<string, unknown>>)
            : undefined

    return (
        <AlertDialogPrimitive.Trigger
            data-slot="alert-dialog-trigger"
            render={render}
            {...props}
        >
            {!render && children}
        </AlertDialogPrimitive.Trigger>
    )
})

const AlertDialogPortal = memo(AlertDialogPrimitive.Portal)

const AlertDialogBackdrop = memo(function AlertDialogBackdrop({
    className,
    ...props
}: AlertDialogPrimitive.Backdrop.Props) {
    return (
        <AlertDialogPrimitive.Backdrop
            data-slot="alert-dialog-backdrop"
            className={cn(
                'fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0',
                className
            )}
            {...props}
        />
    )
})

const AlertDialogPopup = memo(function AlertDialogPopup({
    className,
    ...props
}: AlertDialogPrimitive.Popup.Props) {
    return (
        <AlertDialogPortal>
            <AlertDialogBackdrop />
            <div className="fixed inset-0 z-50">
                <div className="flex h-[100dvh] flex-col items-center overflow-hidden pt-6 max-sm:before:flex-1 sm:overflow-y-auto sm:p-4 sm:before:basis-[20vh] sm:after:flex-1">
                    <AlertDialogPrimitive.Popup
                        data-slot="alert-dialog-popup"
                        className={cn(
                            'row-start-2 grid w-full min-w-0 origin-top gap-4 border bg-popover bg-clip-padding p-6 text-popover-foreground shadow-lg transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform data-ending-style:opacity-0 data-starting-style:opacity-0 max-sm:overflow-y-auto max-sm:border-none max-sm:opacity-[calc(1-min(var(--nested-dialogs),1))] max-sm:data-ending-style:translate-y-4 max-sm:data-starting-style:translate-y-4 sm:max-w-lg sm:-translate-y-[calc(1.25rem*var(--nested-dialogs))] sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:rounded-2xl sm:data-ending-style:scale-98 sm:data-starting-style:scale-98 dark:bg-clip-border',
                            'relative before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] max-sm:before:hidden sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:data-nested:data-ending-style:translate-y-8 sm:data-nested:data-starting-style:translate-y-8 dark:before:shadow-[0_-1px_--theme(--color-white/8%)]',
                            className
                        )}
                        {...props}
                    />
                </div>
            </div>
        </AlertDialogPortal>
    )
})

const AlertDialogHeader = memo(function AlertDialogHeader({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-dialog-header"
            className={cn(
                'flex flex-col gap-2 text-center sm:text-left',
                className
            )}
            {...props}
        />
    )
})

const AlertDialogFooter = memo(function AlertDialogFooter({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-dialog-footer"
            className={cn(
                'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
                className
            )}
            {...props}
        />
    )
})

const AlertDialogTitle = memo(function AlertDialogTitle({
    className,
    ...props
}: AlertDialogPrimitive.Title.Props) {
    return (
        <AlertDialogPrimitive.Title
            data-slot="alert-dialog-title"
            className={cn('text-lg font-semibold', className)}
            {...props}
        />
    )
})

const AlertDialogDescription = memo(function AlertDialogDescription({
    className,
    ...props
}: AlertDialogPrimitive.Description.Props) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    )
})

const AlertDialogClose = memo(function AlertDialogClose({
    asChild,
    children,
    ...props
}: AlertDialogPrimitive.Close.Props & { asChild?: boolean }) {
    const render =
        asChild && children
            ? (children as React.ReactElement<Record<string, unknown>>)
            : undefined

    return (
        <AlertDialogPrimitive.Close
            data-slot="alert-dialog-close"
            render={render}
            {...props}
        >
            {!render && children}
        </AlertDialogPrimitive.Close>
    )
})

interface AlertDialogButtonProps extends AlertDialogPrimitive.Close.Props {
    asChild?: boolean
    variant?: React.ComponentProps<typeof Button>['variant']
    size?: React.ComponentProps<typeof Button>['size']
    render?: React.ReactElement<Record<string, unknown>>
}

const AlertDialogCancel = memo(function AlertDialogCancel({
    asChild,
    children,
    className,
    variant = 'outline',
    size,
    render,
    ...props
}: AlertDialogButtonProps) {
    const buttonRender =
        asChild && children
            ? (children as React.ReactElement<Record<string, unknown>>)
            : render || (
                  <Button
                      variant={variant}
                      size={size}
                      className={
                          typeof className === 'function'
                              ? undefined
                              : className
                      }
                  />
              )

    return (
        <AlertDialogPrimitive.Close
            data-slot="alert-dialog-cancel"
            render={buttonRender}
            {...props}
        >
            {!(asChild && children) && children}
        </AlertDialogPrimitive.Close>
    )
})

const AlertDialogAction = memo(function AlertDialogAction({
    asChild,
    children,
    className,
    variant = 'destructive',
    size,
    render,
    ...props
}: AlertDialogButtonProps) {
    const buttonRender =
        asChild && children
            ? (children as React.ReactElement<Record<string, unknown>>)
            : render || (
                  <Button
                      variant={variant}
                      size={size}
                      className={
                          typeof className === 'function'
                              ? undefined
                              : className
                      }
                  />
              )

    return (
        <AlertDialogPrimitive.Close
            data-slot="alert-dialog-action"
            render={buttonRender}
            {...props}
        >
            {!(asChild && children) && children}
        </AlertDialogPrimitive.Close>
    )
})

export {
    AlertDialog,
    AlertDialogPortal,
    AlertDialogBackdrop,
    AlertDialogBackdrop as AlertDialogOverlay,
    AlertDialogTrigger,
    AlertDialogPopup,
    AlertDialogPopup as AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogClose,
    AlertDialogAction,
    AlertDialogCancel
}
