import { createFileRoute } from '@tanstack/react-router'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription
} from '@/components/ui/empty'

function PartiesEmptyState() {
    return (
        <div className="h-full flex items-center justify-center p-6">
            <Empty>
                <EmptyHeader>
                    <EmptyTitle>No party selected</EmptyTitle>
                    <EmptyDescription>
                        Select a party from the list to view details
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    )
}

export const Route = createFileRoute('/_protected/_dashboard/parties/')({
    component: PartiesEmptyState
})
