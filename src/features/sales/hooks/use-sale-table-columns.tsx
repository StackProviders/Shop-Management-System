import { type ColumnDef, type Row } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2, GripVertical } from 'lucide-react'
import { SerialNumberSelector } from '@/features/items'
import { StandaloneUnitCombobox } from '@/components/common'
import { useSaleItemsStore } from '../stores/sale-items-store'

interface SaleItemRow {
    itemId: string
    itemName: string
    serialNo?: string | string[]
    colour?: string
    material?: string
    quantity: number
    unit?: string
    price: number
    total: number
}

export function useSaleTableColumns(
    shopId: string,
    ItemCell: React.ComponentType<{ row: Row<SaleItemRow> }>
): ColumnDef<SaleItemRow>[] {
    const { updateItem, removeItem, getSerialNumbers } = useSaleItemsStore()

    return [
        {
            id: 'drag',
            header: '',
            cell: () => (
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
            ),
            size: 40
        },
        {
            accessorKey: 'itemName',
            header: 'ITEM',
            cell: ({ row }) => <ItemCell row={row} />,
            size: 200
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
        {
            accessorKey: 'colour',
            header: 'COLOUR',
            cell: ({ row }) => (
                <Input
                    value={row.original.colour || ''}
                    onChange={(e) =>
                        updateItem(row.index, 'colour', e.target.value)
                    }
                    className="border-0 focus-visible:ring-0"
                    placeholder="-"
                />
            ),
            size: 120
        },
        {
            accessorKey: 'material',
            header: 'MATERIAL',
            cell: ({ row }) => (
                <Input
                    value={row.original.material || ''}
                    onChange={(e) =>
                        updateItem(row.index, 'material', e.target.value)
                    }
                    className="border-0 focus-visible:ring-0"
                    placeholder="-"
                />
            ),
            size: 120
        },
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
            size: 120
        },
        {
            id: 'actions',
            header: '',
            cell: ({ row }) => (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(row.index)}
                    className="h-8 w-8"
                >
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            ),
            size: 60
        }
    ]
}
