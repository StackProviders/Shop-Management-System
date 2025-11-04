import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
    message?: string
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizeMap = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8'
}

const paddingMap = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12'
}

export function LoadingState({
    message,
    size = 'md',
    className
}: LoadingStateProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-3',
                paddingMap[size],
                className
            )}
        >
            <Spinner className={sizeMap[size]} />
            {message && (
                <p className="text-sm text-muted-foreground">{message}</p>
            )}
        </div>
    )
}
