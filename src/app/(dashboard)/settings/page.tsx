'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link
                        href="/"
                        className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            'mb-4 flex items-center space-x-2'
                        )}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Home</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Settings
                    </h1>
                </div>
            </div>
        </div>
    )
}
