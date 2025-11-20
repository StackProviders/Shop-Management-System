import { Input } from '@/components/ui/input'
import { BarcodeScanButton } from './barcode-scan-button'
import { Format } from '@tauri-apps/plugin-barcode-scanner'
import { cn } from '@/lib/utils'

interface BarcodeScanInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string
    onChange: (value: string) => void
    // placeholder?: string // This is now covered by InputHTMLAttributes
    disabled?: boolean // This is now covered by InputHTMLAttributes
    formats?: Format[]
    className?: string
}

import { forwardRef } from 'react'

export const BarcodeScanInput = forwardRef<
    HTMLInputElement,
    BarcodeScanInputProps
>(
    (
        {
            value,
            onChange,
            placeholder = 'Enter or scan barcode',
            disabled = false,
            formats,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div className={cn('flex gap-2', className)}>
                <Input
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...props}
                />
                <BarcodeScanButton
                    onScan={(barcode) => onChange(barcode)}
                    disabled={disabled}
                    formats={formats}
                />
            </div>
        )
    }
)

BarcodeScanInput.displayName = 'BarcodeScanInput'
