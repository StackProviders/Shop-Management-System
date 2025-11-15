import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { BarcodeScanInput } from '@/features/barcode-scanner'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import { useFormContext } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'

interface SerialNumberModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (serialNumbers: string[]) => void
    initialSerialNumbers?: string[]
    availableSerialNumbers?: string[]
    itemId?: string
    mode?: 'select' | 'add'
}

export function SerialNumberModal({
    open,
    onOpenChange,
    onSave,
    initialSerialNumbers = [],
    availableSerialNumbers = [],
    mode = 'add'
}: SerialNumberModalProps) {
    const form = useFormContext()
    const [serialNumbers, setSerialNumbers] = useState<string[]>([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (open) {
            setSerialNumbers(initialSerialNumbers)
            setInputValue('')
        }
    }, [open, initialSerialNumbers])

    const handleAdd = () => {
        const trimmed = inputValue.trim()
        if (!trimmed) {
            toast.error('Please enter a serial number')
            return
        }
        if (serialNumbers.includes(trimmed)) {
            toast.error('Serial number already exists')
            return
        }
        if (mode === 'select' && !availableSerialNumbers.includes(trimmed)) {
            toast.error('Serial number not found in stock')
            return
        }

        setSerialNumbers([...serialNumbers, trimmed])
        setInputValue('')
    }

    const handleScanSelect = () => {
        const trimmed = inputValue.trim()
        if (!trimmed) return

        if (mode === 'select' && availableSerialNumbers.includes(trimmed)) {
            if (!serialNumbers.includes(trimmed)) {
                setSerialNumbers([...serialNumbers, trimmed])
            }
            setInputValue('')
        }
    }

    const handleToggle = (serial: string) => {
        if (serialNumbers.includes(serial)) {
            setSerialNumbers(serialNumbers.filter((s) => s !== serial))
        } else {
            setSerialNumbers([...serialNumbers, serial])
        }
    }

    const handleRemove = (serial: string) => {
        setSerialNumbers(serialNumbers.filter((s) => s !== serial))
    }

    const handleSave = () => {
        if (form) {
            form.setValue('openingStock', serialNumbers.length, {
                shouldDirty: true
            })
        }
        onSave(serialNumbers)
        onOpenChange(false)
        toast.success(`${serialNumbers.length} serial numbers saved`)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            if (mode === 'select') {
                handleScanSelect()
            } else {
                handleAdd()
            }
        }
    }

    useEffect(() => {
        if (mode === 'select' && inputValue.trim()) {
            handleScanSelect()
        }
    }, [inputValue])

    const filteredAvailable = inputValue.trim()
        ? availableSerialNumbers.filter((serial) =>
              serial.toLowerCase().includes(inputValue.toLowerCase())
          )
        : availableSerialNumbers

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title={
                mode === 'select'
                    ? 'Select Serial Numbers'
                    : 'Opening Stock - Serial No.'
            }
            className="max-w-lg"
            footer={
                <div className="flex gap-3 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="flex-1"
                    >
                        Close
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="flex-1"
                    >
                        Save
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                        {mode === 'select'
                            ? 'Search/Scan Serial No.:'
                            : 'Enter Serial No.:'}
                    </span>
                    <span className="font-medium">
                        {serialNumbers.length}{' '}
                        {mode === 'select' ? 'Selected' : 'Entered'}
                    </span>
                </div>

                <div className="flex gap-2">
                    <div className="flex-1" onKeyPress={handleKeyPress}>
                        <BarcodeScanInput
                            value={inputValue}
                            onChange={setInputValue}
                            placeholder={
                                mode === 'select' ? 'Search/Scan' : 'Enter/Scan'
                            }
                        />
                    </div>
                    {mode === 'add' && (
                        <Button
                            type="button"
                            onClick={handleAdd}
                            className="px-8"
                        >
                            Add
                        </Button>
                    )}
                </div>

                {mode === 'select' && (
                    <div className="min-h-[250px] max-h-[350px] overflow-y-auto border rounded-md">
                        {availableSerialNumbers.length === 0 ? (
                            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
                                No serial numbers available
                            </div>
                        ) : filteredAvailable.length === 0 ? (
                            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
                                No serial numbers found
                            </div>
                        ) : (
                            <div>
                                {filteredAvailable.map((serial, index) => (
                                    <label
                                        key={index}
                                        className="flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
                                    >
                                        <Checkbox
                                            checked={serialNumbers.includes(
                                                serial
                                            )}
                                            onCheckedChange={() =>
                                                handleToggle(serial)
                                            }
                                        />
                                        <span className="text-sm font-mono flex-1">
                                            {serial}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {mode === 'add' && (
                    <div className="min-h-[250px] max-h-[350px] overflow-y-auto border rounded-md">
                        {serialNumbers.length === 0 ? (
                            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
                                No serial numbers added yet
                            </div>
                        ) : (
                            <div>
                                {serialNumbers.map((serial, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                                    >
                                        <span className="text-sm font-mono">
                                            {serial}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleRemove(serial)}
                                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </ResponsiveModal>
    )
}
