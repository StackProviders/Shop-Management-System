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
import { useEffect, useState, useCallback } from 'react'
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

interface DraggableRowProps {
    id: string
    children: React.ReactNode
}

function DraggableRow({ id, children }: DraggableRowProps) {
    const { setNodeRef, transform, transition, isDragging } = useSortable({
        id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    }

    return (
        <TableRow ref={setNodeRef} style={style} className="hover:bg-muted/30">
            {children}
        </TableRow>
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

    const ItemCell = useCallback(
        ({ row }: { row: Row<SaleItemRow> }) => (
            <ItemAutocomplete
                value={row.original.itemName}
                items={items}
                onSelect={(item) => handleItemSelect(row.index, item.id, items)}
                onSelectCallback={(item) => {
                    if (item.serialNoTracking) {
                        setSerialModalState({
                            open: true,
                            rowIndex: row.index,
                            itemId: item.id
                        })
                    }
                }}
                onManualInput={(name) =>
                    updateItem(row.index, 'itemName', name)
                }
                className="border-0 focus-visible:ring-0"
            />
        ),
        [items, handleItemSelect, updateItem]
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
                                            style={{ width: header.getSize() }}
                                            className="font-semibold text-xs uppercase"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
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
                                                                    key={column}
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
                                                                        {column}
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
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
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
                            </DndContext>
                        </TableBody>
                    </Table>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="w-full"
                >
                    <Plus className="h-4 w-4 mr-2" />
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
