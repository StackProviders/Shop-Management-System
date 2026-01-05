import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
                warning:
                    'border-transparent bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25 dark:bg-yellow-500/10 dark:text-yellow-400 dark:hover:bg-yellow-500/20',
                success:
                    'border-transparent bg-green-500/15 text-green-600 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20'
            },
            size: {
                default: '',
                sm: 'h-5 text-[10px] px-2 gap-1',
                lg: 'h-7 text-sm px-3',
                icon: 'size-10'
            },
            shape: {
                default: 'rounded-md',
                pill: 'rounded-full',
                circle: 'rounded-full p-0 aspect-square grid place-items-center'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            shape: 'default'
        }
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <div
            className={cn(badgeVariants({ variant, size }), className)}
            {...props}
        />
    )
}

function BadgeDot({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                'inline-block h-2 w-2 rounded-full bg-current',
                className
            )}
            {...props}
        />
    )
}

export { Badge, badgeVariants, BadgeDot }
