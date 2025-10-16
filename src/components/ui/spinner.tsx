import { LoaderIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SpinnerProps extends React.ComponentProps<'svg'> {
    fullScreen?: boolean
}

function Spinner({ className, fullScreen = false, ...props }: SpinnerProps) {
    const spinner = (
        <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn('size-4 animate-spin', className)}
            {...props}
        />
    )

    if (fullScreen) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                {spinner}
            </div>
        )
    }

    return spinner
}

export { Spinner }
