'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface SalesPageProps {
    children?: ReactNode
}

export default function SalesPage({ children }: SalesPageProps) {
    const router = useRouter()

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-2xl font-bold">Sales</h1>
                <Button onClick={() => router.push('/sales/create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Sale
                </Button>
            </div>
            <div className="flex-1 overflow-auto">
                {children || (
                    <div className="p-4">
                        <p className="text-muted-foreground">
                            Sales list coming soon...
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
