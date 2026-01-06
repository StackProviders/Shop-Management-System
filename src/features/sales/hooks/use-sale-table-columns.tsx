import { type ColumnDef, type Row, type Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2, GripVertical, ScanBarcode } from 'lucide-react'
import { SerialNumberSelector } from '@/features/items'
import { StandaloneUnitCombobox } from '@/components/common'
import { useSaleItemsStore } from '../stores/sale-items-store'
import type { ColumnVisibility } from './use-column-visibility'
import type { ItemSettings } from '@/features/items/types/settings'
import { StandaloneWarrantyInput } from '../components/standalone-warranty-input'
import type { SaleItemRow } from '../types'
import { useContext, useMemo, useState, useEffect } from 'react'
import { DragHandleContext } from '../components/sale-items-table'
import { formatCurrency } from '@/lib/utils'

function DragHandle() {
    const context = useContext(DragHandleContext)

    if (!context) return <div className="w-4 h-4" />

    const { setActivatorNodeRef, attributes, listeners } = context

    return (
        <div
            ref={setActivatorNodeRef}
            {...attributes}
            {...listeners}
            className="cursor-move touch-none"
        >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
    )
}

function NumberInput({
    value,
    onChange,
    className,
    ...props
}: {
    value: number
    onChange: (value: number) => void
} & Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'>) {
    const [inputValue, setInputValue] = useState(value.toString())

    useEffect(() => {
        // Sync local state if parent value changes externally
        // But exclude changes that match the current parsed local value to avoid cursor jumps/formatting loss
        if (Number(inputValue) !== value) {
            setInputValue(value.toString())
        }
        // If the value is 0 and locally it's empty string, we want to keep it empty
        // logic above: Number("") is 0. So if value is 0, 0 !== 0 is false.
        // So it won't force "0" if we have "".
    }, [value, inputValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        if (newValue === '') {
            onChange(0)
        } else {
            onChange(Number(newValue))
        }
    }

    return (
        <Input
            type="number"
            value={inputValue}
            onChange={handleChange}
            className={className}
            {...props}
        />
    )
}

export function useSaleTableColumns(
    shopId: string,
    ItemCell: React.ComponentType<{
        row: Row<SaleItemRow>
        table: Table<SaleItemRow>
    }>,
    visibility: ColumnVisibility,
    settings: ItemSettings,
    onScanClick: () => void
): ColumnDef<SaleItemRow>[] {
    const { updateItem, removeItem, getSerialNumbers } = useSaleItemsStore()

    const customFieldColumns = useMemo(
        () =>
            (settings.customFieldNames || []).map((field) => ({
                accessorKey: field.name.toLowerCase(),
                header: field.name.toUpperCase(),
                cell: ({ row }: { row: Row<SaleItemRow> }) => (
                    <Input
                        value={
                            (row.original[
                                field.name.toLowerCase()
                            ] as string) || ''
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
            })),
        [settings.customFieldNames, updateItem]
    )

    const columns = useMemo(() => {
        const cols: ColumnDef<SaleItemRow>[] = [
            {
                id: 'actions',
                header: () => (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={onScanClick}
                        title="Scan Barcode"
                    >
                        <ScanBarcode className="h-4 w-4" />
                    </Button>
                ),
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(row.index)}
                            className="size-7"
                        >
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                        <DragHandle />
                        <span className="text-sm text-muted-foreground">
                            {row.index + 1}
                        </span>
                    </div>
                ),
                size: 60
            },
            {
                accessorKey: 'itemName',
                header: 'ITEM',
                cell: ({ row, table }) => <ItemCell row={row} table={table} />
            },
            {
                accessorKey: 'serialNo',
                header: 'SERIAL NO',
                cell: ({ row }) => {
                    const itemId = row.original.itemId
                    if (!itemId)
                        return (
                            <div className="text-muted-foreground text-sm">
                                -
                            </div>
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
                size: 80
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
                cell: ({ row }) => {
                    const itemId = row.original.itemId
                    const hasSerialTracking =
                        itemId && getSerialNumbers(itemId).length > 0

                    return (
                        <NumberInput
                            value={row.original.quantity}
                            onChange={(val) =>
                                updateItem(row.index, 'quantity', val)
                            }
                            className="border-0 focus-visible:ring-0 w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min={0}
                            readOnly={!!hasSerialTracking}
                        />
                    )
                },
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
                    <NumberInput
                        value={row.original.price}
                        onChange={(val) => updateItem(row.index, 'price', val)}
                        className="border-0 focus-visible:ring-0 w-28 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min={0}
                    />
                ),
                size: 120
            },
            {
                accessorKey: 'total',
                header: 'AMOUNT',
                cell: ({ row }) => (
                    <div className="font-medium">
                        {formatCurrency(row.original.total)}
                    </div>
                )
            }
        ]
        return cols
    }, [
        removeItem,
        ItemCell,
        updateItem,
        getSerialNumbers,
        customFieldColumns,
        visibility,
        settings.customFieldSettings.warranty,
        settings.warrantyPeriods,
        settings.customWarrantyPeriods,
        shopId,
        onScanClick
    ])

    return columns
}
