import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_dashboard/sales/')({
    component: () => (
        <div className="p-4">
            <p className="text-muted-foreground">Sales list coming soon...</p>
        </div>
    )
})
