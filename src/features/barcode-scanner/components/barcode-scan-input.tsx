import { Input } from '@/components/ui/input'
import { BarcodeScanButton } from './barcode-scan-button'
import { Format } from '@tauri-apps/plugin-barcode-scanner'
import { cn } from '@/lib/utils'

interface BarcodeScanInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
    formats?: Format[]
    className?: string
}

export function BarcodeScanInput({
    value,
    onChange,
    placeholder = 'Enter or scan barcode',
    disabled = false,
    formats,
    className
}: BarcodeScanInputProps) {
    return (
        <div className={cn('flex gap-2', className)}>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
            />
            <BarcodeScanButton
                onScan={(barcode) => onChange(barcode)}
                disabled={disabled}
                formats={formats}
            />
        </div>
    )
}
