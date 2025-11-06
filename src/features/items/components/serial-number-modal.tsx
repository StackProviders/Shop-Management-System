import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { BarcodeScanInput } from '@/features/barcode-scanner'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import { useFormContext } from 'react-hook-form'

interface SerialNumberModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (serialNumbers: string[]) => void
    initialSerialNumbers?: string[]
}

export function SerialNumberModal({
    open,
    onOpenChange,
    onSave,
    initialSerialNumbers = []
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

        setSerialNumbers([...serialNumbers, trimmed])
        setInputValue('')
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
            handleAdd()
        }
    }

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title="Opening Stock - Serial No."
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
                    <span>Enter Serial No.:</span>
                    <span className="font-medium">
                        {serialNumbers.length} Entered
                    </span>
                </div>

                <div className="flex gap-2">
                    <div className="flex-1" onKeyPress={handleKeyPress}>
                        <BarcodeScanInput
                            value={inputValue}
                            onChange={setInputValue}
                            placeholder="Enter/Scan"
                        />
                    </div>
                    <Button type="button" onClick={handleAdd} className="px-8">
                        Add
                    </Button>
                </div>

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
            </div>
        </ResponsiveModal>
    )
}
