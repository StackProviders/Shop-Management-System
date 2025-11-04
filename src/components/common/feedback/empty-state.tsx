import { ReactNode } from 'react'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from '@/components/ui/empty'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
    icon?: ReactNode
    title: string
    description: string
    action?: ReactNode
}

export function EmptyState({
    icon = <Inbox className="size-12 text-muted-foreground" />,
    title,
    description,
    action
}: EmptyStateProps) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">{icon}</EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{description}</EmptyDescription>
                {action && <div className="mt-4">{action}</div>}
            </EmptyHeader>
        </Empty>
    )
}
