'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Barcode } from 'lucide-react'
import { SerialNumberModal } from './serial-number-modal'

interface SerialNumberSelectorProps {
    value: string | string[]
    onChange: (value: string | string[]) => void
    availableSerialNumbers?: string[]
    itemId?: string
    mode?: 'select' | 'add'
    onQuantityChange?: (quantity: number) => void
}

export function SerialNumberSelector({
    value,
    onChange,
    availableSerialNumbers = [],
    itemId,
    mode = 'select',
    onQuantityChange
}: SerialNumberSelectorProps) {
    const [open, setOpen] = useState(false)

    const handleSave = (serialNumbers: string[]) => {
        if (mode === 'select') {
            onChange(serialNumbers)
            if (onQuantityChange) {
                onQuantityChange(serialNumbers.length)
            }
        } else {
            onChange(serialNumbers)
        }
    }

    const selectedSerialNumbers = Array.isArray(value)
        ? value
        : value
          ? [value]
          : []
    const displayText =
        mode === 'select'
            ? selectedSerialNumbers.length > 0
                ? `${selectedSerialNumbers.length} Selected`
                : 'Select'
            : `${selectedSerialNumbers.length} Serial No.`

    return (
        <>
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(true)}
                className="h-9 w-full justify-start border-0 px-2"
            >
                <Barcode className="size-4 mr-1" />
                {displayText}
            </Button>
            <SerialNumberModal
                open={open}
                onOpenChange={setOpen}
                onSave={handleSave}
                initialSerialNumbers={selectedSerialNumbers}
                availableSerialNumbers={availableSerialNumbers}
                itemId={itemId}
                mode={mode}
            />
        </>
    )
}
