'use client'

import { Store } from 'lucide-react'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from '@/components/ui/empty'

export default function PartiesPage() {
    return (
        <div className="h-full flex items-center justify-center">
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <Store />
                    </EmptyMedia>
                    <EmptyTitle>Select a party</EmptyTitle>
                    <EmptyDescription>
                        Select a party from the list to view details
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        </div>
    )
}
