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
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useSaleItemsStore } from '../stores/sale-items-store'
import type { Item } from '@/features/items'
import { useEffect, useState, useRef } from 'react'
import { formatCurrency } from '@/features/shared'
import { useShopContext } from '@/features/shop'
import { FormProvider, useForm } from 'react-hook-form'
import { useItemSelection } from '../hooks/use-item-selection'
import { useSaleTableColumns } from '../hooks/use-sale-table-columns'

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

interface SaleItemsTableProps {
    items: Item[]
}

function ItemAutocomplete({
    row,
    items,
    onSelect
}: {
    row: Row<SaleItemRow>
    items: Item[]
    onSelect: (index: number, itemId: string) => void
}) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [search, setSearch] = useState(row.original.itemName || '')
    const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })
    const inputRef = useRef<HTMLInputElement>(null)

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )

    const updatePosition = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect()
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            })
        }
    }

    const handleFocus = () => {
        updatePosition()
        setShowSuggestions(true)
    }

    const handleSelect = (item: Item) => {
        setSearch(item.name)
        onSelect(row.index, item.id)
        setShowSuggestions(false)
    }

    return (
        <>
            <div ref={inputRef}>
                <Input
                    placeholder="Item Name"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        updatePosition()
                        setShowSuggestions(true)
                    }}
                    onFocus={handleFocus}
                    onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                    }
                    className="border-0 focus-visible:ring-0"
                />
            </div>
            {showSuggestions && (
                <div
                    className="fixed bg-background border border-border rounded-md shadow-lg z-[9999] w-[min(calc(100vw-2rem),700px)]"
                    style={{
                        top: `${position.top}px`,
                        left: `${Math.max(8, Math.min(position.left, window.innerWidth - 716))}px`
                    }}
                >
                    <div className="flex items-center gap-4 px-4 py-2.5 bg-muted/20 border-b text-xs font-medium text-muted-foreground uppercase">
                        <div className="flex-1">Item Name</div>
                        <div className="w-24 text-right">Sale Price</div>
                        <div className="w-32 text-right">Purchase Price</div>
                        <div className="w-20 text-right">Stock</div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelect(item)}
                                    className="w-full flex items-center gap-4 px-4 py-2.5 text-sm hover:bg-accent/30 transition-colors focus:outline-none focus:bg-accent/30 border-b border-border/50 last:border-b-0"
                                >
                                    <div className="flex-1 text-left font-medium text-foreground truncate">
                                        {item.name}
                                    </div>
                                    <div className="w-24 text-right text-foreground">
                                        {formatCurrency(
                                            item.salePrice || 0,
                                            'INR'
                                        )}
                                    </div>
                                    <div className="w-32 text-right text-foreground">
                                        {formatCurrency(
                                            item.purchasePrice || 0,
                                            'INR'
                                        )}
                                    </div>
                                    <div
                                        className="w-20 text-right font-medium"
                                        style={{
                                            color:
                                                (item.currentStock ?? 0) === 0
                                                    ? '#ef4444'
                                                    : '#10b981'
                                        }}
                                    >
                                        {item.currentStock ?? 0}
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                                No items found
                            </div>
                        )}
                    </div>
                    <div className="border-t p-2">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => {
                                setShowSuggestions(false)
                                window.open('/items/new', '_blank')
                            }}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Item
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export function SaleItemsTable({ items }: SaleItemsTableProps) {
    const { items: saleItems, addItem } = useSaleItemsStore()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const form = useForm()
    const { handleItemSelect } = useItemSelection(shopId)

    const ItemCell = ({ row }: { row: Row<SaleItemRow> }) => (
        <ItemAutocomplete
            row={row}
            items={items}
            onSelect={(index, itemId) => handleItemSelect(index, itemId, items)}
        />
    )

    const columns = useSaleTableColumns(shopId, ItemCell)

    useEffect(() => {
        if (saleItems.length === 0) {
            addItem()
        }
    }, [])

    const table = useReactTable({
        data: saleItems,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <FormProvider {...form}>
            <div className="space-y-2">
                <div className="border rounded-lg overflow-x-auto">
                    <Table>
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
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="hover:bg-muted/30"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="p-2"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
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
        </FormProvider>
    )
}
