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
            <div className="relative w-full">
                <Input
                    ref={ref}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn('pr-6', className)}
                    {...props}
                />
                <div className="absolute right-0 top-0 h-full flex items-center pr-2 z-20">
                    <BarcodeScanButton
                        variant="ghost"
                        className="size-7 hover:bg-transparent"
                        onScan={(barcode) => onChange(barcode)}
                        disabled={disabled}
                        formats={formats}
                    />
                </div>
            </div>
        )
    }
)

BarcodeScanInput.displayName = 'BarcodeScanInput'
