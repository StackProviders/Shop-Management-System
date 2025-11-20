import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { BarcodeScanInput } from '@/features/barcode-scanner'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { X, Package } from 'lucide-react'
import { findSerialNumber } from '@/features/items/api/serial-numbers.api'
import type { Item } from '@/features/items'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

interface GlobalSerialScanModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (scannedItems: { item: Item; serial: string }[]) => void
    items: Item[]
    shopId: string
}

interface ScannedItem {
    serial: string
    item: Item
    timestamp: number
}

export function GlobalSerialScanModal({
    open,
    onOpenChange,
    onSave,
    items,
    shopId
}: GlobalSerialScanModalProps) {
    const [inputValue, setInputValue] = useState('')
    const [scannedItems, setScannedItems] = useState<ScannedItem[]>([])
    const [isScanning, setIsScanning] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (open) {
            setInputValue('')
            setScannedItems([])
            // Focus input after a short delay to ensure modal is fully open
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [open])

    const handleScan = async () => {
        const trimmed = inputValue.trim()
        if (!trimmed) return

        // Check if already scanned in this session
        if (scannedItems.some((i) => i.serial === trimmed)) {
            toast.error('Serial number already scanned in this session')
            setInputValue('')
            return
        }

        setIsScanning(true)
        try {
            const serialData = await findSerialNumber(shopId, trimmed)
            if (!serialData) {
                toast.error('Serial number not found')
                setInputValue('')
                return
            }

            const item = items.find((i) => i.id === serialData.itemId)
            if (!item) {
                toast.error('Item associated with this serial number not found')
                setInputValue('')
                return
            }

            setScannedItems((prev) => [
                { serial: trimmed, item, timestamp: Date.now() },
                ...prev
            ])
            setInputValue('')
            toast.success('Item added')
        } catch (error) {
            console.error('Scan error:', error)
            toast.error('Error scanning serial number')
        } finally {
            setIsScanning(false)
            // Keep focus on input
            inputRef.current?.focus()
        }
    }

    const handleRemoveItem = (serial: string) => {
        setScannedItems((prev) => prev.filter((i) => i.serial !== serial))
    }

    const handleSave = () => {
        onSave(scannedItems)
        onOpenChange(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleScan()
        }
    }

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title="Scan Serial Numbers"
            className="max-w-2xl"
            footer={
                <div className="flex w-full gap-2 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={scannedItems.length === 0}
                    >
                        Add {scannedItems.length} Items
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                        Scan multiple serial numbers to add them to the sale at
                        once.
                    </div>
                    <div onKeyPress={handleKeyPress}>
                        <BarcodeScanInput
                            ref={inputRef}
                            value={inputValue}
                            onChange={(val) => setInputValue(val)}
                            placeholder="Scan serial number..."
                            disabled={isScanning}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">
                            Scanned Items ({scannedItems.length})
                        </h4>
                        {scannedItems.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setScannedItems([])}
                                className="text-xs text-muted-foreground hover:text-destructive"
                            >
                                Clear all
                            </Button>
                        )}
                    </div>

                    <ScrollArea className="h-[300px]">
                        {scannedItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/50">
                                <Package className="size-12 mb-2 opacity-50" />
                                <p>No items scanned yet</p>
                                <p className="text-xs">
                                    Scan a barcode to start adding items
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {scannedItems.map(({ serial, item }) => (
                                    <div
                                        key={serial}
                                        className="group relative flex items-start gap-3 p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background">
                                            <Package className="size-5 text-muted-foreground" />
                                        </div>

                                        <div className="flex-1 min-w-0 space-y-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <h5 className="font-medium text-sm truncate">
                                                    {item.name}
                                                </h5>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 -mr-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() =>
                                                        handleRemoveItem(serial)
                                                    }
                                                >
                                                    <X className="size-4" />
                                                    <span className="sr-only">
                                                        Remove
                                                    </span>
                                                </Button>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Badge
                                                    variant="secondary"
                                                    className="h-5 px-1.5 font-normal text-[10px]"
                                                >
                                                    {serial}
                                                </Badge>
                                                <span>•</span>
                                                <span>
                                                    {formatCurrency(
                                                        item.salePrice
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </div>
            </div>
        </ResponsiveModal>
    )
}
