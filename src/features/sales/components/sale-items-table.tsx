import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type Row,
    type Table as ReactTable
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Plus, Settings2 } from 'lucide-react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useSaleItemsStore } from '../stores/sale-items-store'
import type { Item } from '@/features/items'
import type { SaleItemRow } from '../types'
import type { SaleFormData } from '../validations'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useShopContext } from '@/features/shop'
import { FormProvider, useFormContext } from 'react-hook-form'
import { useItemSelection } from '../hooks/use-item-selection'
import { useSaleTableColumns } from '../hooks/use-sale-table-columns'
import { ItemAutocomplete } from '@/components/common'
import { SerialNumberModal } from '@/features/items/components/serial-number-modal'
import { GlobalSerialScanModal } from './global-serial-scan-modal'
import { toast } from 'sonner'
import { useColumnVisibility } from '../hooks/use-column-visibility'
import { useItemSettings } from '@/features/items'
import { useDebouncedCallback } from '@/hooks/use-debounced-callback'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    useDraggable
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
    restrictToVerticalAxis,
    restrictToParentElement
} from '@dnd-kit/modifiers'
import { cn } from '@/lib/utils'

interface SaleItemsTableProps {
    items: Item[]
}

interface ItemCellProps {
    row: Row<SaleItemRow>
    items: Item[]
    onItemSelect: (rowIndex: number, itemId: string, items: Item[]) => void
    onSerialModalOpen: (rowIndex: number, itemId: string) => void
    onUpdateItem: (
        index: number,
        field: keyof SaleItemRow,
        value: SaleItemRow[keyof SaleItemRow]
    ) => void
    selectedItemIds?: Set<string>
}

// Create a memoized component to prevent re-renders
const ItemCellComponent = React.memo(
    ({
        row,
        items,
        onItemSelect,
        onSerialModalOpen,
        onUpdateItem,
        selectedItemIds
    }: ItemCellProps) => {
        const [localValue, setLocalValue] = useState(row.original.itemName)

        useEffect(() => {
            setLocalValue(row.original.itemName)
        }, [row.original.itemName])

        const debouncedUpdate = useDebouncedCallback((value: string) => {
            onUpdateItem(row.index, 'itemName', value)
        }, 300)

        const handleManualInput = useCallback(
            (name: string) => {
                setLocalValue(name)
                debouncedUpdate(name)
            },
            [debouncedUpdate]
        )

        const filteredItems = useMemo(() => {
            if (!selectedItemIds) return items
            return items.filter(
                (item) =>
                    !selectedItemIds.has(item.id) ||
                    item.id === row.original.itemId
            )
        }, [items, selectedItemIds, row.original.itemId])

        return (
            <ItemAutocomplete
                value={localValue}
                items={filteredItems}
                onSelect={(item) => onItemSelect(row.index, item.id, items)}
                onSelectCallback={(item) => {
                    if (item.serialNoTracking) {
                        onSerialModalOpen(row.index, item.id)
                    }
                }}
                onManualInput={handleManualInput}
                className="border-0 focus-visible:ring-0"
            />
        )
    }
)

ItemCellComponent.displayName = 'ItemCellComponent'

// Context to pass drag handle ref
// Context to pass drag handle ref and props
export const DragHandleContext = React.createContext<{
    setActivatorNodeRef: (element: HTMLElement | null) => void
    attributes: ReturnType<typeof useDraggable>['attributes']
    listeners: ReturnType<typeof useDraggable>['listeners']
} | null>(null)

interface DraggableRowProps {
    id: string
    children: React.ReactNode
}

function DraggableRow({ id, children }: DraggableRowProps) {
    const {
        setNodeRef,
        transform,
        transition,
        isDragging,
        setActivatorNodeRef,
        attributes,
        listeners
    } = useSortable({
        id
    })

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: 'relative' as const,
        zIndex: isDragging ? 1 : 0
    }

    const contextValue = React.useMemo(
        () => ({
            setActivatorNodeRef,
            attributes,
            listeners
        }),
        [setActivatorNodeRef, attributes, listeners]
    )

    return (
        <DragHandleContext.Provider value={contextValue}>
            <TableRow
                ref={setNodeRef}
                style={style}
                className="hover:bg-muted/30"
                data-state={isDragging ? 'dragging' : undefined}
            >
                {children}
            </TableRow>
        </DragHandleContext.Provider>
    )
}

export function SaleItemsTable({ items }: SaleItemsTableProps) {
    const {
        items: saleItems,
        addItem,
        addItemWithDetails,
        updateItem,
        getSerialNumbers,
        reorderItems,
        fetchSerialNumbers
    } = useSaleItemsStore()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const form = useFormContext<SaleFormData>() // Changed to useFormContext to access the form
    const { handleItemSelect } = useItemSelection(shopId)
    const [serialModalState, setSerialModalState] = useState<{
        open: boolean
        rowIndex: number
        itemId: string
    } | null>(null)
    const [globalScanOpen, setGlobalScanOpen] = useState(false)

    const { settings } = useItemSettings(shopId)
    const { visibility, toggleColumn, availableColumns } = useColumnVisibility(
        shopId,
        settings
    )

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8
            }
        })
    )

    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event
            if (over && active.id !== over.id) {
                reorderItems(active.id as string, over.id as string)
            }
        },
        [reorderItems]
    )

    const handleGlobalScan = useCallback(
        (scannedItems: { item: Item; serial: string }[]) => {
            let addedCount = 0
            let updatedCount = 0

            // Group scanned items by item ID
            const groupedItems = scannedItems.reduce(
                (acc, { item, serial }) => {
                    if (!acc[item.id]) {
                        acc[item.id] = { item, serials: [] }
                    }
                    acc[item.id].serials.push(serial)
                    return acc
                },
                {} as Record<string, { item: Item; serials: string[] }>
            )

            Object.values(groupedItems).forEach(({ item, serials }) => {
                // Ensure we have the serial numbers for this item
                if (item.serialNoTracking) {
                    fetchSerialNumbers(shopId, item.id)
                }

                // Check if item already exists in table
                const existingItemIndex = saleItems.findIndex(
                    (i) => i.itemId === item.id
                )

                if (existingItemIndex >= 0) {
                    const existingItem = saleItems[existingItemIndex]
                    const currentSerials = Array.isArray(existingItem.serialNo)
                        ? existingItem.serialNo
                        : []

                    // Filter out serials that are already present
                    const newSerialsToAdd = serials.filter(
                        (s) => !currentSerials.includes(s)
                    )

                    if (newSerialsToAdd.length > 0) {
                        const newSerials = [
                            ...currentSerials,
                            ...newSerialsToAdd
                        ]
                        updateItem(existingItemIndex, 'serialNo', newSerials)
                        updateItem(
                            existingItemIndex,
                            'quantity',
                            newSerials.length
                        )
                        updatedCount++
                    }
                } else {
                    // Add new item
                    const uniqueSerials = [...new Set(serials)]
                    addItemWithDetails({
                        itemId: item.id,
                        itemName: item.name,
                        price: item.salePrice,
                        quantity: uniqueSerials.length,
                        total: item.salePrice * uniqueSerials.length,
                        serialNo: uniqueSerials,
                        unit: item.unit
                    })
                    addedCount++
                }
            })

            if (addedCount > 0 || updatedCount > 0) {
                toast.success(`Processed ${addedCount + updatedCount} items`)
            }
        },
        [saleItems, updateItem, addItemWithDetails, fetchSerialNumbers, shopId]
    )

    const handleSerialModalOpen = useCallback(
        (rowIndex: number, itemId: string) => {
            fetchSerialNumbers(shopId, itemId)
            setSerialModalState({
                open: true,
                rowIndex,
                itemId
            })
        },
        [shopId, fetchSerialNumbers]
    )

    const selectedItemIds = useMemo(
        () => new Set(saleItems.map((i) => i.itemId).filter(Boolean)),
        [saleItems]
    )

    const ItemCell = useCallback(
        ({
            row,
            table
        }: {
            row: Row<SaleItemRow>
            table: ReactTable<SaleItemRow>
        }) => (
            <ItemCellComponent
                row={row}
                items={items}
                onItemSelect={handleItemSelect}
                onSerialModalOpen={handleSerialModalOpen}
                onUpdateItem={updateItem}
                selectedItemIds={table.options.meta?.selectedItemIds}
            />
        ),
        [items, handleItemSelect, handleSerialModalOpen, updateItem]
    )

    const handleScanClick = useCallback(() => {
        setGlobalScanOpen(true)
    }, [])

    const columns = useSaleTableColumns(
        shopId,
        ItemCell,
        visibility,
        settings,
        handleScanClick
    )

    useEffect(() => {
        if (saleItems.length === 0) {
            addItem()
        }
    }, [saleItems.length, addItem])

    const table = useReactTable({
        data: saleItems,
        columns,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            selectedItemIds
        } as { selectedItemIds: Set<string> }
    })

    return (
        <FormProvider {...form}>
            <div className="space-y-2">
                <div className="[&>div]:max-h-[500px] border rounded-lg">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                        modifiers={[
                            restrictToVerticalAxis,
                            restrictToParentElement
                        ]}
                    >
                        <Table className="border-separate border-spacing-0 [&_td]:border-border [&_tfoot_td]:border-t [&_th]:border-b [&_th]:border-border [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
                            <TableHeader className="sticky top-0 z-10 bg-background/90 backdrop-blur-xs">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow
                                        key={headerGroup.id}
                                        className="hover:bg-transparent"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                style={{
                                                    width:
                                                        header.column.id ===
                                                        'itemName'
                                                            ? 'auto'
                                                            : header.getSize()
                                                }}
                                                className={cn(
                                                    'font-semibold text-xs uppercase',
                                                    header.column.id ===
                                                        'itemName' && 'w-full'
                                                )}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        ))}
                                        <TableHead className="w-10 text-right">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                    >
                                                        <Settings2 className="h-4 w-4" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-48"
                                                    align="end"
                                                >
                                                    <div className="space-y-4">
                                                        <h4 className="font-medium text-sm">
                                                            Show Columns
                                                        </h4>
                                                        <div className="space-y-3">
                                                            {availableColumns.map(
                                                                (column) => (
                                                                    <div
                                                                        key={
                                                                            column
                                                                        }
                                                                        className="flex items-center space-x-2"
                                                                    >
                                                                        <Checkbox
                                                                            id={
                                                                                column
                                                                            }
                                                                            checked={
                                                                                visibility[
                                                                                    column
                                                                                ] ??
                                                                                false
                                                                            }
                                                                            onCheckedChange={() =>
                                                                                toggleColumn(
                                                                                    column
                                                                                )
                                                                            }
                                                                        />
                                                                        <Label
                                                                            htmlFor={
                                                                                column
                                                                            }
                                                                            className="text-sm font-normal capitalize cursor-pointer"
                                                                        >
                                                                            {
                                                                                column
                                                                            }
                                                                        </Label>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                        </TableHead>
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                <SortableContext
                                    items={saleItems.map((item) => item.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {saleItems.map((item, idx) => {
                                        const row =
                                            table.getRowModel().rows[idx]
                                        if (!row) return null

                                        return (
                                            <DraggableRow
                                                key={item.id}
                                                id={item.id}
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className="p-2"
                                                        >
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </DraggableRow>
                                        )
                                    })}
                                </SortableContext>
                            </TableBody>
                        </Table>
                    </DndContext>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                >
                    <Plus className="size-4" />
                    Add Item
                </Button>
            </div>
            {serialModalState && (
                <SerialNumberModal
                    open={serialModalState.open}
                    onOpenChange={(open) => {
                        if (!open) setSerialModalState(null)
                    }}
                    onSave={(serialNumbers) => {
                        updateItem(
                            serialModalState.rowIndex,
                            'serialNo',
                            serialNumbers
                        )
                        updateItem(
                            serialModalState.rowIndex,
                            'quantity',
                            serialNumbers.length
                        )
                        setSerialModalState(null)
                    }}
                    initialSerialNumbers={
                        (Array.isArray(
                            saleItems[serialModalState.rowIndex]?.serialNo
                        )
                            ? saleItems[serialModalState.rowIndex].serialNo
                            : []) as string[]
                    }
                    availableSerialNumbers={getSerialNumbers(
                        serialModalState.itemId
                    )}
                    itemId={serialModalState.itemId}
                    mode="select"
                />
            )}
            <GlobalSerialScanModal
                open={globalScanOpen}
                onOpenChange={setGlobalScanOpen}
                onSave={handleGlobalScan}
                items={items}
                shopId={shopId}
            />
        </FormProvider>
    )
}
