import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

export function ErrorView({
    children,
    className,
    variant = 'destructive'
}: {
    children: ReactNode
    className?: string
    variant?: 'destructive' | 'warning' | 'info'
}) {
    const bgColor = {
        destructive: 'bg-destructive/5',
        warning: 'bg-warning/5',
        info: 'bg-muted/50'
    }[variant]

    return (
        <main
            className={cn(
                'h-full flex items-center justify-center p-4',
                bgColor,
                className
            )}
        >
            <Card className="max-w-md w-full p-8 text-center space-y-6">
                {children}
            </Card>
        </main>
    )
}

export function ErrorIcon({
    children,
    className
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div className={cn('flex justify-center', className)}>{children}</div>
    )
}

export function ErrorCode({
    children,
    className
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <p
            className={cn(
                'text-sm font-medium text-muted-foreground',
                className
            )}
        >
            {children}
        </p>
    )
}

export function ErrorHeader({
    children,
    className
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <h1
            className={cn(
                'text-2xl font-bold tracking-tight text-foreground',
                className
            )}
        >
            {children}
        </h1>
    )
}

export function ErrorDescription({
    children,
    className
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <p className={cn('text-sm text-muted-foreground', className)}>
            {children}
        </p>
    )
}

export function ErrorActions({
    children,
    className
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <div
            className={cn(
                'flex flex-col sm:flex-row items-center justify-center gap-3',
                className
            )}
        >
            {children}
        </div>
    )
}
