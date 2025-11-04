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
import { MoreVertical, Calendar } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const MOCK_TRANSACTIONS = [
    {
        id: '1',
        type: 'Purchase',
        invoiceRef: '',
        name: 'Md Minhaj',
        date: '01/11/2025',
        quantity: 2,
        price: '1,350.00 ৳',
        status: 'Unpaid'
    },
    {
        id: '2',
        type: 'Opening Stock',
        invoiceRef: '',
        name: 'Opening Stock',
        date: '01/11/2025',
        quantity: 5,
        price: '1,600.00 ৳',
        status: ''
    }
]

export default function ProductDetailPage() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <>
            <ListDetailContentHeader>
                <ListDetailContentHeaderTitle>
                    <h2 className="text-lg font-semibold">NETIS ROUTER</h2>
                    <Button size="sm">ADJUST ITEM</Button>
                </ListDetailContentHeaderTitle>

                <ListDetailContentHeaderInfo>
                    <ListDetailContentHeaderInfoItem
                        label="SALE PRICE"
                        value="1,500.00 ৳"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="PURCHASE PRICE"
                        value="1,350.00 ৳"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="STOCK QUANTITY"
                        value="15"
                    />
                    <ListDetailContentHeaderInfoItem
                        label="STOCK VALUE"
                        value="20,250.00 ৳"
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
                                {MOCK_TRANSACTIONS.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            <div
                                                className={cn(
                                                    'size-2 rounded-full',
                                                    transaction.type ===
                                                        'Purchase'
                                                        ? 'bg-destructive'
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
                                            {transaction.name || '-'}
                                        </TableCell>
                                        <TableCell className="text-xs">
                                            {transaction.date}
                                        </TableCell>
                                        <TableCell className="text-right text-xs">
                                            {transaction.quantity}
                                        </TableCell>
                                        <TableCell className="text-right text-xs">
                                            {transaction.price}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.status && (
                                                <Badge
                                                    variant="destructive"
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
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </ListDetailContentBody>
        </>
    )
}
