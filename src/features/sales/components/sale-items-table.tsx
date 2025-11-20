import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type Row
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
import React, { useEffect, useState, useCallback } from 'react'
import { useShopContext } from '@/features/shop'
import { FormProvider, useForm } from 'react-hook-form'
import { useItemSelection } from '../hooks/use-item-selection'
import { useSaleTableColumns } from '../hooks/use-sale-table-columns'
import { ItemAutocomplete } from '@/components/common'
import { SerialNumberModal } from '@/features/items/components/serial-number-modal'
import { useColumnVisibility } from '../hooks/use-column-visibility'
import { useItemSettings } from '@/features/items'
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SaleItemsTableProps {
    items: Item[]
}

interface ItemCellProps {
    row: Row<SaleItemRow>
    items: Item[]
    onItemSelect: (rowIndex: number, itemId: string, items: Item[]) => void
    onSerialModalOpen: (rowIndex: number, itemId: string) => void
    onUpdateItem: (index: number, field: keyof SaleItemRow, value: any) => void
}

// Create a memoized component to prevent re-renders
const ItemCellComponent = React.memo(
    ({
        row,
        items,
        onItemSelect,
        onSerialModalOpen,
        onUpdateItem
    }: ItemCellProps) => {
        const [localValue, setLocalValue] = useState(row.original.itemName)

        useEffect(() => {
            setLocalValue(row.original.itemName)
        }, [row.original.itemName])

        const handleManualInput = useCallback(
            (name: string) => {
                setLocalValue(name)
                onUpdateItem(row.index, 'itemName', name)
            },
            [row.index, onUpdateItem]
        )

        return (
            <ItemAutocomplete
                value={localValue}
                items={items}
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
    attributes: any
    listeners: any
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
        transform: CSS.Transform.toString(transform),
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
        updateItem,
        getSerialNumbers,
        reorderItems
    } = useSaleItemsStore()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const form = useForm()
    const { handleItemSelect } = useItemSelection(shopId)
    const [serialModalState, setSerialModalState] = useState<{
        open: boolean
        rowIndex: number
        itemId: string
    } | null>(null)

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

    const handleSerialModalOpen = useCallback(
        (rowIndex: number, itemId: string) => {
            setSerialModalState({
                open: true,
                rowIndex,
                itemId
            })
        },
        []
    )

    const ItemCell = useCallback(
        ({ row }: { row: Row<SaleItemRow> }) => (
            <ItemCellComponent
                row={row}
                items={items}
                onItemSelect={handleItemSelect}
                onSerialModalOpen={handleSerialModalOpen}
                onUpdateItem={updateItem}
            />
        ),
        [items, handleItemSelect, handleSerialModalOpen, updateItem]
    )

    const columns = useSaleTableColumns(shopId, ItemCell, visibility, settings)

    useEffect(() => {
        if (saleItems.length === 0) {
            addItem()
        }
    }, [saleItems.length, addItem])

    const table = useReactTable({
        data: saleItems,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <FormProvider {...form}>
            <div className="space-y-2">
                <div className="border rounded-lg overflow-x-auto">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <Table style={{ minWidth: '1200px' }}>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow
                                        key={headerGroup.id}
                                        className="bg-muted/50"
                                    >
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                style={{
                                                    width: header.getSize()
                                                }}
                                                className="font-semibold text-xs uppercase"
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                            </TableHead>
                                        ))}
                                        <TableHead className="w-10">
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
                                                    className="w-64"
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
                                                <TableCell className="p-2" />
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
                    initialSerialNumbers={[]}
                    availableSerialNumbers={getSerialNumbers(
                        serialModalState.itemId
                    )}
                    itemId={serialModalState.itemId}
                    mode="select"
                />
            )}
        </FormProvider>
    )
}
