import type { ColumnDef } from '@tanstack/react-table'
import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import * as React from 'react'
import { DataTable } from '@/components/data-table/data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableFilterMenu } from '@/components/data-table/data-table-filter-menu'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { useShopContext } from '@/features/shop'
import { usePartiesByShop } from '../hooks/use-party-queries'
import { usePartyMutations } from '../hooks/use-party-mutations'
import type { Party, PartyType, PartyStatus } from '../types'

interface PartyTransactionsTableProps {
    onEdit?: (party: Party) => void
}

export function PartyTransactionsTable({
    onEdit
}: PartyTransactionsTableProps) {
    const { currentShop } = useShopContext()
    const { parties, isLoading } = usePartiesByShop(currentShop?.shopId ?? '')
    const { deleteParty } = usePartyMutations(currentShop?.shopId ?? '')

    const [rowSelection, setRowSelection] = React.useState({})

    const columns = React.useMemo<ColumnDef<Party>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() &&
                                'indeterminate')
                        }
                        onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
                enableColumnFilter: false
            },
            {
                accessorKey: 'name',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} label="Name" />
                ),
                cell: ({ row }) => (
                    <div className="font-medium">{row.getValue('name')}</div>
                ),
                enableColumnFilter: true,
                meta: {
                    label: 'Name',
                    variant: 'text',
                    placeholder: 'Search name...'
                }
            },
            {
                accessorKey: 'type',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} label="Type" />
                ),
                cell: ({ row }) => {
                    const type = row.getValue('type') as PartyType
                    return (
                        <Badge
                            variant={
                                type === 'customer' ? 'primary' : 'secondary'
                            }
                        >
                            {type}
                        </Badge>
                    )
                },
                enableColumnFilter: true,
                meta: {
                    label: 'Type',
                    variant: 'select',
                    options: [
                        { label: 'Customer', value: 'customer' },
                        { label: 'Supplier', value: 'supplier' }
                    ]
                }
            },
            {
                accessorKey: 'contactInfo.phone',
                header: 'Phone',
                cell: ({ row }) => {
                    const phone = row.original.contactInfo?.phone
                    return phone ? (
                        <span className="text-sm">{phone}</span>
                    ) : (
                        <span className="text-muted-foreground text-sm">
                            N/A
                        </span>
                    )
                },
                enableColumnFilter: true,
                meta: {
                    label: 'Phone',
                    variant: 'text',
                    placeholder: 'Search phone...'
                }
            },
            {
                accessorKey: 'contactInfo.email',
                header: 'Email',
                cell: ({ row }) => {
                    const email = row.original.contactInfo?.email
                    return email ? (
                        <span className="text-sm">{email}</span>
                    ) : (
                        <span className="text-muted-foreground text-sm">
                            N/A
                        </span>
                    )
                },
                enableColumnFilter: true,
                meta: {
                    label: 'Email',
                    variant: 'text',
                    placeholder: 'Search email...'
                }
            },
            {
                accessorKey: 'balance',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} label="Balance" />
                ),
                cell: ({ row }) => {
                    const balance = row.getValue('balance') as number
                    const formatted = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    }).format(balance)
                    return (
                        <div
                            className={
                                balance < 0
                                    ? 'text-destructive'
                                    : balance > 0
                                      ? 'text-green-600'
                                      : ''
                            }
                        >
                            {formatted}
                        </div>
                    )
                },
                enableColumnFilter: true,
                meta: {
                    label: 'Balance',
                    variant: 'number',
                    placeholder: 'Filter balance...'
                }
            },
            {
                accessorKey: 'status',
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} label="Status" />
                ),
                cell: ({ row }) => {
                    const status = row.getValue('status') as PartyStatus
                    return (
                        <Badge
                            variant={
                                status === 'active' ? 'primary' : 'secondary'
                            }
                        >
                            {status}
                        </Badge>
                    )
                },
                enableColumnFilter: true,
                meta: {
                    label: 'Status',
                    variant: 'select',
                    options: [
                        { label: 'Active', value: 'active' },
                        { label: 'Inactive', value: 'inactive' }
                    ]
                }
            },
            {
                id: 'actions',
                cell: ({ row }) => {
                    const party = row.original

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="size-8"
                                >
                                    <MoreHorizontal className="size-4" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                    onClick={() => onEdit?.(party)}
                                >
                                    <Pencil className="size-4" />
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => deleteParty(party.id)}
                                    className="text-destructive"
                                >
                                    <Trash2 className="size-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                },
                enableSorting: false,
                enableHiding: false,
                enableColumnFilter: false
            }
        ],
        [onEdit, deleteParty]
    )

    const table = useReactTable({
        data: parties,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        }
    })

    const isMobile = useIsMobile()

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        )
    }

    if (isMobile) {
        return (
            <div className="space-y-3">
                <DataTableFilterMenu table={table} />
                <div className="space-y-2">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => {
                            const party = row.original
                            const balance = party.balance
                            return (
                                <Card key={row.id} className="p-3">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm truncate">
                                                {party.name}
                                            </div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge
                                                    variant={
                                                        party.type ===
                                                        'customer'
                                                            ? 'primary'
                                                            : 'secondary'
                                                    }
                                                    className="text-xs"
                                                >
                                                    {party.type}
                                                </Badge>
                                                <Badge
                                                    variant={
                                                        party.status ===
                                                        'active'
                                                            ? 'primary'
                                                            : 'secondary'
                                                    }
                                                    className="text-xs"
                                                >
                                                    {party.status}
                                                </Badge>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8 shrink-0"
                                                >
                                                    <MoreHorizontal className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onEdit?.(party)
                                                    }
                                                >
                                                    <Pencil className="size-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        deleteParty(party.id)
                                                    }
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="size-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="space-y-1.5 text-xs">
                                        {party.contactInfo?.phone && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">
                                                    Phone:
                                                </span>
                                                <span className="font-medium">
                                                    {party.contactInfo.phone}
                                                </span>
                                            </div>
                                        )}
                                        {party.contactInfo?.email && (
                                            <div className="flex justify-between gap-2">
                                                <span className="text-muted-foreground">
                                                    Email:
                                                </span>
                                                <span className="font-medium truncate">
                                                    {party.contactInfo.email}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between pt-1 border-t">
                                            <span className="text-muted-foreground">
                                                Balance:
                                            </span>
                                            <span
                                                className={cn(
                                                    'font-semibold',
                                                    balance < 0
                                                        ? 'text-destructive'
                                                        : balance > 0
                                                          ? 'text-green-600'
                                                          : ''
                                                )}
                                            >
                                                {new Intl.NumberFormat(
                                                    'en-US',
                                                    {
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    }
                                                ).format(balance)}
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })
                    ) : (
                        <Card className="p-6 text-center text-sm text-muted-foreground">
                            No results.
                        </Card>
                    )}
                </div>
            </div>
        )
    }

    return (
        <DataTable table={table}>
            <DataTableFilterMenu table={table} />
        </DataTable>
    )
}
