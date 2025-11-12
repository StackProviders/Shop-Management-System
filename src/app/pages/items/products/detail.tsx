import { useParams, useNavigate } from '@tanstack/react-router'
import { useShopContext } from '@/features/shop'
import { useItem, useStockTransactions } from '@/features/items'
import {
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
} from '@/components/ui/list-detail-layout'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { MoreVertical, Calendar } from 'lucide-react'
import { useState, useMemo } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'

export default function ProductDetailPage() {
    const { id } = useParams({
        from: '/_protected/_dashboard/items/products/$id'
    })
    const navigate = useNavigate()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { item, isLoading } = useItem(id)
    const { transactions, isLoading: transactionsLoading } =
        useStockTransactions(shopId, id)
    const [searchQuery, setSearchQuery] = useState('')

    const stockValue = useMemo(
        () => (item ? (item.currentStock || 0) * (item.purchasePrice || 0) : 0),
        [item]
    )

    const displayTransactions = useMemo(() => {
        if (transactions.length > 0) return transactions
        if (!item || !item.openingStock) return []
        return [
            {
                id: 'opening-stock',
                shopId: item.shopId,
                itemId: item.id,
                type: 'Opening Stock' as const,
                quantity: item.openingStock,
                pricePerUnit: item.purchasePrice,
                invoiceRef: '',
                partyName: 'Opening Stock',
                status: undefined,
                createdAt: item.createdAt
            }
        ]
    }, [transactions, item])

    if (isLoading) {
        return (
            <div className="p-6 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        )
    }

    if (!item) {
        return <div className="p-6">Item not found</div>
    }

    return (
        <>
            <ListDetailContentHeader>
                <ListDetailContentHeaderTitle>
                    <h2 className="text-lg font-semibold">
                        {item.name.toUpperCase()}
                    </h2>
                    <Button size="sm">ADJUST ITEM</Button>
                </ListDetailContentHeaderTitle>

                <ListDetailContentHeaderInfo>
                    <ListDetailContentHeaderInfoItem
                        label="SALE PRICE"
                        value={formatCurrency(item.salePrice)}
                    />
                    <ListDetailContentHeaderInfoItem
                        label="PURCHASE PRICE"
                        value={formatCurrency(item.purchasePrice)}
                    />
                    <ListDetailContentHeaderInfoItem
                        label="STOCK QUANTITY"
                        value={(item.currentStock || 0).toString()}
                    />
                    <ListDetailContentHeaderInfoItem
                        label="STOCK VALUE"
                        value={formatCurrency(stockValue)}
                    />
                </ListDetailContentHeaderInfo>
            </ListDetailContentHeader>

            <ListDetailContentBody>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">TRANSACTIONS</h3>
                        <div className="flex items-center gap-2">
                            <SearchInput
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                                placeholder="Search..."
                                className="w-64"
                            />
                            <Button size="sm" variant="ghost">
                                <Calendar className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-8"></TableHead>
                                    <TableHead>TYPE</TableHead>
                                    <TableHead>INVOICE/REF. NO</TableHead>
                                    <TableHead>NAME</TableHead>
                                    <TableHead>DATE</TableHead>
                                    <TableHead className="text-right">
                                        QUANTITY
                                    </TableHead>
                                    <TableHead className="text-right">
                                        PRICE/ UNIT
                                    </TableHead>
                                    <TableHead>STATUS</TableHead>
                                    <TableHead className="w-8"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactionsLoading ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={9}
                                            className="text-center py-8"
                                        >
                                            Loading transactions...
                                        </TableCell>
                                    </TableRow>
                                ) : displayTransactions.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={9}
                                            className="text-center py-8 text-muted-foreground"
                                        >
                                            No transactions found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    displayTransactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell>
                                                <div
                                                    className={cn(
                                                        'size-2 rounded-full',
                                                        transaction.type ===
                                                            'Purchase'
                                                            ? 'bg-destructive'
                                                            : transaction.type ===
                                                                'Sale'
                                                              ? 'bg-success'
                                                              : 'bg-foreground'
                                                    )}
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium text-xs">
                                                {transaction.type}
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                {transaction.invoiceRef || '-'}
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                {transaction.partyName || '-'}
                                            </TableCell>
                                            <TableCell className="text-xs">
                                                {transaction.createdAt
                                                    ? format(
                                                          transaction.createdAt instanceof
                                                              Date
                                                              ? transaction.createdAt
                                                              : new Date(
                                                                    (
                                                                        transaction.createdAt as any
                                                                    ).seconds *
                                                                        1000
                                                                ),
                                                          'dd/MM/yyyy'
                                                      )
                                                    : '-'}
                                            </TableCell>
                                            <TableCell className="text-right text-xs">
                                                {transaction.quantity}
                                            </TableCell>
                                            <TableCell className="text-right text-xs">
                                                {formatCurrency(
                                                    transaction.pricePerUnit
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.status && (
                                                    <Badge
                                                        variant={
                                                            transaction.status ===
                                                            'Unpaid'
                                                                ? 'destructive'
                                                                : 'secondary'
                                                        }
                                                        className="text-xs"
                                                    >
                                                        {transaction.status}
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-6 w-6 p-0"
                                                >
                                                    <MoreVertical className="size-3" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </ListDetailContentBody>
        </>
    )
}
