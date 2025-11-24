'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Hash } from 'lucide-react'
import { SerialNumberModal } from './serial-number-modal'

interface SerialNumberButtonProps {
    serialNumbers: string[]
    onSave: (serialNumbers: string[]) => void
}

export function SerialNumberButton({
    serialNumbers,
    onSave
}: SerialNumberButtonProps) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(true)}
                className="w-full"
            >
                <Hash className="h-4 w-4 mr-2" />
                Manage Serial Numbers ({serialNumbers.length})
            </Button>
            <SerialNumberModal
                open={open}
                onOpenChange={setOpen}
                onSave={onSave}
                initialSerialNumbers={serialNumbers}
            />
        </>
    )
}
