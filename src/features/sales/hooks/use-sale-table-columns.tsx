import { type ColumnDef, type Row } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2, GripVertical } from 'lucide-react'
import { SerialNumberSelector } from '@/features/items'
import { StandaloneUnitCombobox } from '@/components/common'
import { useSaleItemsStore } from '../stores/sale-items-store'
import type { ColumnVisibility } from './use-column-visibility'
import type { ItemSettings } from '@/features/items/types/settings'
import { StandaloneWarrantyInput } from '../components/standalone-warranty-input'
import { useSortable } from '@dnd-kit/sortable'
import type { SaleItemRow } from '../types'

function DragHandle({ itemId }: { itemId: string }) {
    const { attributes, listeners } = useSortable({ id: itemId })
    return (
        <div {...attributes} {...listeners} className="cursor-move">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
    )
}

export function useSaleTableColumns(
    shopId: string,
    ItemCell: React.ComponentType<{ row: Row<SaleItemRow> }>,
    visibility: ColumnVisibility,
    settings: ItemSettings
): ColumnDef<SaleItemRow>[] {
    const { updateItem, removeItem, getSerialNumbers } = useSaleItemsStore()

    const customFieldColumns = (settings.customFieldNames || []).map(
        (field) => ({
            accessorKey: field.name.toLowerCase(),
            header: field.name.toUpperCase(),
            cell: ({ row }: { row: Row<SaleItemRow> }) => (
                <Input
                    value={
                        (row.original[field.name.toLowerCase()] as string) || ''
                    }
                    onChange={(e) =>
                        updateItem(
                            row.index,
                            field.name.toLowerCase(),
                            e.target.value
                        )
                    }
                    className="border-0 focus-visible:ring-0"
                    placeholder="-"
                />
            ),
            size: Math.max(120, field.name.length * 10 + 40)
        })
    )

    const columns: ColumnDef<SaleItemRow>[] = [
        {
            id: 'actions',
            header: '#',
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(row.index)}
                        className="h-7 w-7"
                    >
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                    <DragHandle
                        itemId={
                            (row.original as SaleItemRow & { id: string }).id
                        }
                    />
                    <span className="text-sm text-muted-foreground min-w-[20px]">
                        {row.index + 1}
                    </span>
                </div>
            ),
            size: 90
        },
        {
            accessorKey: 'itemName',
            header: 'ITEM',
            cell: ({ row }) => <ItemCell row={row} />,
            size: 280
        },
        {
            accessorKey: 'serialNo',
            header: 'SERIAL NO',
            cell: ({ row }) => {
                const itemId = row.original.itemId
                if (!itemId)
                    return (
                        <div className="text-muted-foreground text-sm">-</div>
                    )

                return (
                    <SerialNumberSelector
                        value={row.original.serialNo || []}
                        onChange={(v) => {
                            updateItem(row.index, 'serialNo', v)
                            if (Array.isArray(v)) {
                                updateItem(row.index, 'quantity', v.length)
                            }
                        }}
                        availableSerialNumbers={getSerialNumbers(itemId)}
                        itemId={itemId}
                        mode="select"
                        onQuantityChange={(qty) =>
                            updateItem(row.index, 'quantity', qty)
                        }
                    />
                )
            },
            size: 150
        },
        ...customFieldColumns.filter(
            (col) => visibility[col.accessorKey as string]
        ),
        ...(visibility.warranty && settings.customFieldSettings.warranty
            ? [
                  {
                      accessorKey: 'warranty',
                      header: 'WARRANTY',
                      cell: ({ row }: { row: Row<SaleItemRow> }) => (
                          <StandaloneWarrantyInput
                              value={row.original.warranty}
                              onChange={(v) =>
                                  updateItem(row.index, 'warranty', v)
                              }
                              availablePeriods={settings.warrantyPeriods}
                              customPeriods={settings.customWarrantyPeriods}
                          />
                      ),
                      size: 150
                  }
              ]
            : []),
        {
            accessorKey: 'quantity',
            header: 'QTY',
            cell: ({ row }) => (
                <Input
                    type="number"
                    value={row.original.quantity}
                    onChange={(e) =>
                        updateItem(
                            row.index,
                            'quantity',
                            Number(e.target.value)
                        )
                    }
                    className="border-0 focus-visible:ring-0 w-20"
                    min={1}
                />
            ),
            size: 80
        },
        {
            accessorKey: 'unit',
            header: 'UNIT',
            cell: ({ row }) => (
                <div className="w-32">
                    <StandaloneUnitCombobox
                        value={row.original.unit || 'none'}
                        onChange={(v) => updateItem(row.index, 'unit', v)}
                        shopId={shopId}
                    />
                </div>
            ),
            size: 130
        },
        {
            accessorKey: 'price',
            header: 'PRICE/UNIT',
            cell: ({ row }) => (
                <Input
                    type="number"
                    value={row.original.price}
                    onChange={(e) =>
                        updateItem(row.index, 'price', Number(e.target.value))
                    }
                    className="border-0 focus-visible:ring-0 w-28"
                    min={0}
                />
            ),
            size: 120
        },
        {
            accessorKey: 'total',
            header: 'AMOUNT',
            cell: ({ row }) => (
                <div className="text-right font-medium">
                    ₹{row.original.total.toFixed(2)}
                </div>
            ),
            size: 100
        }
    ]

    return columns
}
