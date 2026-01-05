import { useNavigate, createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/_protected/_dashboard/sales/')({
    component: SalesIndexRouteComponent
})

function SalesIndexRouteComponent() {
    const navigate = useNavigate()

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Sales</h1>
                <Button onClick={() => navigate({ to: '/sales/create' })}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Sale
                </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
                <p className="text-muted-foreground">
                    Sales list coming soon...
                </p>
            </div>
        </div>
    )
}
