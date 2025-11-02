import { DataTable } from '@/components/data-table/data-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    useReactTable,
    getCoreRowModel,
    type ColumnDef
} from '@tanstack/react-table'

interface Sale {
    id: string
    invoiceNumber: string
    customerName: string
    total: number
    status: 'paid' | 'pending' | 'cancelled'
    date: Date
}

const mockSales: Sale[] = [
    {
        id: '1',
        invoiceNumber: 'INV-001',
        customerName: 'John Doe',
        total: 1250.5,
        status: 'paid',
        date: new Date()
    },
    {
        id: '2',
        invoiceNumber: 'INV-002',
        customerName: 'Jane Smith',
        total: 890.0,
        status: 'pending',
        date: new Date()
    },
    {
        id: '3',
        invoiceNumber: 'INV-003',
        customerName: 'Bob Johnson',
        total: 2100.75,
        status: 'paid',
        date: new Date()
    }
]

export function DataTableMobileExample() {
    const columns: ColumnDef<Sale>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                />
            )
        },
        {
            accessorKey: 'invoiceNumber',
            header: 'Invoice #'
        },
        {
            accessorKey: 'customerName',
            header: 'Customer'
        },
        {
            accessorKey: 'total',
            header: 'Total',
            cell: ({ row }) => `$${row.original.total.toFixed(2)}`
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                const statusColors = {
                    paid: 'success',
                    pending: 'secondary',
                    cancelled: 'destructive'
                } as const
                return (
                    <Badge variant={statusColors[row.original.status]}>
                        {row.original.status}
                    </Badge>
                )
            }
        },
        {
            id: 'actions',
            cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ]

    const table = useReactTable({
        data: mockSales,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Sales</h2>
                <Button>Add Sale</Button>
            </div>

            <DataTable
                table={table}
                mobileCard={(row) => (
                    <div className="space-y-3">
                        {/* Header with selection and invoice */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    checked={row.getIsSelected()}
                                    onCheckedChange={(value) =>
                                        row.toggleSelected(!!value)
                                    }
                                    onClick={(e) => e.stopPropagation()}
                                />
                                <span className="font-semibold">
                                    {row.original.invoiceNumber}
                                </span>
                            </div>
                            <Badge
                                variant={
                                    row.original.status === 'paid'
                                        ? 'success'
                                        : row.original.status === 'pending'
                                          ? 'secondary'
                                          : 'destructive'
                                }
                            >
                                {row.original.status}
                            </Badge>
                        </div>

                        {/* Customer info */}
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>
                                    {row.original.customerName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                                {row.original.customerName}
                            </span>
                        </div>

                        {/* Amount and actions */}
                        <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-lg font-bold">
                                ${row.original.total.toFixed(2)}
                            </span>
                            <DropdownMenu>
                                <DropdownMenuTrigger
                                    asChild
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive">
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Date */}
                        <p className="text-xs text-muted-foreground">
                            {row.original.date.toLocaleDateString()}
                        </p>
                    </div>
                )}
                onRowClick={(rowData) =>
                    console.log('Clicked:', rowData.original)
                }
            />
        </div>
    )
}
