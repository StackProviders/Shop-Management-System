import * as React from 'react'
import { cn } from '@/lib/utils'

function ScrollArea({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="scroll-area"
            className={cn(
                'overflow-y-auto',
                '[&::-webkit-scrollbar]:w-2',
                '[&::-webkit-scrollbar-track]:bg-transparent',
                '[&::-webkit-scrollbar-thumb]:bg-border',
                '[&::-webkit-scrollbar-thumb]:rounded-full',
                '[&::-webkit-scrollbar-thumb]:hover:bg-border/80',
                'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border scrollbar-thumb-rounded',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function ScrollBar() {
    return null
}

export { ScrollArea, ScrollBar }
