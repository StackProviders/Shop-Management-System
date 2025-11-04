import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
    title?: string
    message: string
    onRetry?: () => void
    icon?: ReactNode
    className?: string
}

export function ErrorState({
    title = 'Something went wrong',
    message,
    onRetry,
    icon = <AlertCircle className="size-12 text-destructive" />,
    className
}: ErrorStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-3 p-8 text-center',
                className
            )}
        >
            {icon}
            <div>
                <p className="font-medium text-sm">{title}</p>
                <p className="text-muted-foreground text-xs mt-1">{message}</p>
            </div>
            {onRetry && (
                <Button onClick={onRetry} size="sm" variant="outline">
                    <RefreshCw className="size-4" />
                    Try Again
                </Button>
            )}
        </div>
    )
}
