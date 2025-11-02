import { DataTable } from '@/components/data-table/data-table'
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'
import { toast } from 'sonner'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MoreHorizontal } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface User {
    id: string
    name: string
    email: string
    role: 'admin' | 'manager' | 'staff' | 'viewer'
    status: 'active' | 'inactive'
    createdAt: Date
}

const mockUsers: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        status: 'active',
        createdAt: new Date('2024-01-15')
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'manager',
        status: 'active',
        createdAt: new Date('2024-02-20')
    },
    {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'staff',
        status: 'inactive',
        createdAt: new Date('2024-03-10')
    }
]

export function DataTableExample() {
    const [users] = useState<User[]>(mockUsers)

    const columns: ColumnDef<User>[] = [
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
            accessorKey: 'name',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Name"
                    label="Name"
                />
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{row.original.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{row.original.name}</span>
                </div>
            )
        },
        {
            accessorKey: 'email',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Email"
                    label="Email"
                />
            )
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: ({ row }) => <Badge>{row.original.role}</Badge>
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <Badge
                    variant={
                        row.original.status === 'active'
                            ? 'success'
                            : 'secondary'
                    }
                >
                    {row.original.status}
                </Badge>
            )
        },
        {
            accessorKey: 'createdAt',
            header: ({ column }) => (
                <DataTableColumnHeader
                    column={column}
                    title="Created"
                    label="Created"
                />
            ),
            cell: ({ row }) => row.original.createdAt.toLocaleDateString()
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                toast.success(`Edit ${row.original.name}`)
                            }
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() =>
                                toast.success(`Delete ${row.original.id}`)
                            }
                            className="text-destructive"
                        >
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ]

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">DataTable Example</h2>
                    <p className="text-muted-foreground">
                        Full-featured table with sorting, filtering, and actions
                    </p>
                </div>
                <Button>Add User</Button>
            </div>

            <DataTable
                table={useReactTable({
                    data: users,
                    columns,
                    getCoreRowModel: getCoreRowModel()
                })}
                mobileCard={(row) => (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {(row.original as User).name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="font-semibold">
                                    {(row.original as User).name}
                                </span>
                            </div>
                            <Badge>{(row.original as User).role}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {(row.original as User).email}
                        </p>
                    </div>
                )}
            />
        </div>
    )
}
