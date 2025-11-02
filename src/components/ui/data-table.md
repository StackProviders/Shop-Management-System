# DataTable Component

A powerful, responsive table component built on TanStack Table with sorting, filtering, pagination, and mobile support.

## Features

- ✅ Sorting (single/multi-column)
- ✅ Filtering (search by column)
- ✅ Pagination
- ✅ Row selection
- ✅ Column visibility toggle
- ✅ Responsive (mobile card view)
- ✅ Loading states
- ✅ Empty states
- ✅ Row actions menu
- ✅ TypeScript support

## Installation

```bash
pnpm add @tanstack/react-table
```

## Basic Usage

```typescript
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface User {
  id: string
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  }
]

function UsersTable() {
  const { users, isLoading } = useUsers()

  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      searchPlaceholder="Search users..."
      isLoading={isLoading}
    />
  )
}
```

## Advanced Usage with All Features

```typescript
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  DataTableSelectColumn
} from '@/components/ui/data-table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const columns: ColumnDef<User>[] = [
  DataTableSelectColumn<User>(), // Selection checkbox
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
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
      <DataTableColumnHeader column={column} title="Email" />
    )
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>
        {row.original.role}
      </Badge>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          {
            label: 'Edit',
            onClick: (row) => console.log('Edit', row.original)
          },
          {
            label: 'Delete',
            onClick: (row) => console.log('Delete', row.original),
            variant: 'destructive'
          }
        ]}
      />
    )
  }
]

function AdvancedUsersTable() {
  const { users, isLoading } = useUsers()
  const navigate = useNavigate()

  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      searchPlaceholder="Search by name..."
      isLoading={isLoading}
      enableRowSelection
      enableColumnVisibility
      enablePagination
      pageSize={20}
      onRowClick={(row) => navigate(`/users/${row.original.id}`)}
      emptyTitle="No users found"
      emptyDescription="Add your first user to get started"
      emptyAction={<Button>Add User</Button>}
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{row.original.name}</span>
            <Badge>{row.original.role}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{row.original.email}</p>
        </div>
      )}
    />
  )
}
```

## Props

| Prop                     | Type                 | Default               | Description                 |
| ------------------------ | -------------------- | --------------------- | --------------------------- |
| `columns`                | `ColumnDef<TData>[]` | Required              | Column definitions          |
| `data`                   | `TData[]`            | Required              | Table data                  |
| `searchKey`              | `string`             | -                     | Column key for search       |
| `searchPlaceholder`      | `string`             | `"Search..."`         | Search input placeholder    |
| `isLoading`              | `boolean`            | `false`               | Show loading state          |
| `onRowClick`             | `(row) => void`      | -                     | Row click handler           |
| `enableRowSelection`     | `boolean`            | `false`               | Enable row selection        |
| `enableColumnVisibility` | `boolean`            | `true`                | Enable column toggle        |
| `enablePagination`       | `boolean`            | `true`                | Enable pagination           |
| `pageSize`               | `number`             | `10`                  | Rows per page               |
| `emptyTitle`             | `string`             | `"No results"`        | Empty state title           |
| `emptyDescription`       | `string`             | `"No data available"` | Empty state description     |
| `emptyAction`            | `ReactNode`          | -                     | Empty state action button   |
| `mobileCard`             | `(row) => ReactNode` | -                     | Custom mobile card renderer |
| `className`              | `string`             | -                     | Additional CSS classes      |

## Column Definition Examples

### Sortable Column

```typescript
{
  accessorKey: 'createdAt',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Created" />
  ),
  cell: ({ row }) => formatDate(row.original.createdAt)
}
```

### Custom Cell Rendering

```typescript
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const status = row.original.status
    return (
      <Badge variant={status === 'active' ? 'success' : 'secondary'}>
        {status}
      </Badge>
    )
  }
}
```

### Computed Column

```typescript
{
  id: 'fullName',
  header: 'Full Name',
  cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`
}
```

### Actions Column

```typescript
{
  id: 'actions',
  cell: ({ row }) => (
    <DataTableRowActions
      row={row}
      actions={[
        { label: 'View', onClick: (row) => navigate(`/view/${row.original.id}`) },
        { label: 'Edit', onClick: (row) => setEditItem(row.original) },
        { label: 'Delete', onClick: (row) => handleDelete(row.original.id), variant: 'destructive' }
      ]}
    />
  )
}
```

## Mobile Card Rendering

```typescript
<DataTable
  columns={columns}
  data={data}
  mobileCard={(row) => (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{row.original.name}</h3>
          <p className="text-sm text-muted-foreground">{row.original.email}</p>
        </div>
        <Badge>{row.original.status}</Badge>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Created</span>
        <span>{formatDate(row.original.createdAt)}</span>
      </div>
    </div>
  )}
/>
```

## Real-World Examples

### Parties Table

```typescript
import { DataTable, DataTableColumnHeader, DataTableRowActions } from '@/components/ui/data-table'
import { useParties } from '@/features/parties'
import { Badge } from '@/components/ui/badge'
import { formatPhone } from '@/features/shared'

const columns: ColumnDef<Party>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => formatPhone(row.original.phone)
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <Badge variant={row.original.type === 'customer' ? 'default' : 'secondary'}>
        {row.original.type}
      </Badge>
    )
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Balance" />,
    cell: ({ row }) => `$${row.original.balance.toFixed(2)}`
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          { label: 'View Details', onClick: (row) => navigate(`/parties/${row.original.id}`) },
          { label: 'Edit', onClick: (row) => setEditParty(row.original) },
          { label: 'Delete', onClick: (row) => handleDelete(row.original.id), variant: 'destructive' }
        ]}
      />
    )
  }
]

export function PartiesTable() {
  const { parties, isLoading } = useParties()
  const navigate = useNavigate()

  return (
    <DataTable
      columns={columns}
      data={parties}
      searchKey="name"
      searchPlaceholder="Search parties..."
      isLoading={isLoading}
      onRowClick={(row) => navigate(`/parties/${row.original.id}`)}
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{row.original.name}</span>
            <Badge>{row.original.type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{formatPhone(row.original.phone)}</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Balance</span>
            <span className="font-medium">${row.original.balance.toFixed(2)}</span>
          </div>
        </div>
      )}
    />
  )
}
```

### Sales Table

```typescript
const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Invoice #" />
  },
  {
    accessorKey: 'customerName',
    header: 'Customer'
  },
  {
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => formatDate(row.original.date)
  },
  {
    accessorKey: 'total',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Total" />,
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const statusColors = {
        paid: 'success',
        pending: 'warning',
        cancelled: 'destructive'
      }
      return (
        <Badge variant={statusColors[row.original.status]}>
          {row.original.status}
        </Badge>
      )
    }
  }
]
```

## Best Practices

1. **Always provide searchKey** for better UX
2. **Use DataTableColumnHeader** for sortable columns
3. **Provide mobileCard** for responsive design
4. **Handle loading states** with isLoading prop
5. **Add empty states** with custom actions
6. **Use TypeScript** for type safety
7. **Keep columns focused** - one piece of data per column
8. **Use cell renderers** for formatting and styling
9. **Add row actions** for common operations
10. **Test on mobile** to ensure responsive behavior

## Performance Tips

- Use `React.memo()` for expensive cell renderers
- Avoid inline functions in column definitions
- Use `useMemo()` for column definitions
- Enable pagination for large datasets
- Consider virtualization for 1000+ rows

## Accessibility

- Keyboard navigation supported
- Screen reader friendly
- ARIA labels on interactive elements
- Focus management
- Semantic HTML structure
