# Data Display Patterns - AI Rules

## DataTable vs DataGrid - When to Use

### Use DataTable When:

- Displaying tabular data with multiple columns
- Need sorting, filtering, and pagination
- Data comparison across rows is important
- Desktop-first interface
- Examples: Sales list, Purchase orders, User management, Reports

### Use DataGrid When:

- Displaying visual content (products, parties, items)
- Card-based layout is more appropriate
- Mobile-first interface
- Content includes images or complex layouts
- Examples: Product catalog, Party cards, Inventory items

## DataTable Patterns

### Pattern 1: Basic Table with Search

```typescript
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<Entity>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  }
]

function EntityTable() {
  const { entities, isLoading } = useEntities()

  return (
    <DataTable
      columns={columns}
      data={entities}
      searchKey="name"
      searchPlaceholder="Search..."
      isLoading={isLoading}
    />
  )
}
```

### Pattern 2: Table with Sortable Columns

```typescript
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'

const columns: ColumnDef<Entity>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => formatDate(row.original.createdAt)
  }
]
```

### Pattern 3: Table with Row Actions

```typescript
import { DataTable, DataTableRowActions } from '@/components/ui/data-table'

const columns: ColumnDef<Entity>[] = [
  // ... other columns
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          {
            label: 'Edit',
            onClick: (row) => setEditItem(row.original)
          },
          {
            label: 'Delete',
            onClick: (row) => handleDelete(row.original.id),
            variant: 'destructive'
          }
        ]}
      />
    )
  }
]
```

### Pattern 4: Table with Row Selection

```typescript
import { DataTable, DataTableSelectColumn } from '@/components/ui/data-table'

const columns: ColumnDef<Entity>[] = [
  DataTableSelectColumn<Entity>(),
  // ... other columns
]

<DataTable
  columns={columns}
  data={data}
  enableRowSelection
/>
```

### Pattern 5: Table with Mobile Card View

```typescript
<DataTable
  columns={columns}
  data={data}
  mobileCard={(row) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-semibold">{row.original.name}</span>
        <Badge>{row.original.status}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{row.original.email}</p>
    </div>
  )}
/>
```

### Pattern 6: Table with Custom Cell Rendering

```typescript
const columns: ColumnDef<Entity>[] = [
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
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const amount = row.original.amount
      return (
        <span className={cn(
          'font-medium',
          amount > 0 ? 'text-green-600' : 'text-red-600'
        )}>
          ${Math.abs(amount).toFixed(2)}
        </span>
      )
    }
  }
]
```

## DataGrid Patterns

### Pattern 1: Basic Grid with Search

```typescript
import { DataGrid, DataGridCard } from '@/components/ui/data-grid'

function EntityGrid() {
  const { entities, isLoading } = useEntities()

  return (
    <DataGrid
      data={entities}
      columns={[]}
      renderCard={(entity) => (
        <DataGridCard>
          <h3 className="font-semibold">{entity.name}</h3>
          <p className="text-sm text-muted-foreground">{entity.description}</p>
        </DataGridCard>
      )}
      searchKeys={['name', 'description']}
      searchPlaceholder="Search..."
      isLoading={isLoading}
    />
  )
}
```

### Pattern 2: Grid with Images

```typescript
<DataGrid
  data={products}
  columns={[]}
  renderCard={(product) => (
    <DataGridCard className="space-y-3">
      <div className="aspect-square bg-muted rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </div>
      <div>
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
        <p className="text-lg font-bold mt-2">${product.price}</p>
      </div>
    </DataGridCard>
  )}
  searchKeys={['name', 'category']}
  gridCols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
/>
```

### Pattern 3: Grid with Status Badges

```typescript
<DataGrid
  data={parties}
  columns={[]}
  renderCard={(party) => (
    <DataGridCard className="space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{party.name}</h3>
        <Badge variant={party.type === 'customer' ? 'default' : 'secondary'}>
          {party.type}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{party.phone}</p>
      <div className="flex justify-between pt-2 border-t">
        <span className="text-sm text-muted-foreground">Balance</span>
        <span className="font-semibold">${party.balance.toFixed(2)}</span>
      </div>
    </DataGridCard>
  )}
  searchKeys={['name', 'phone', 'email']}
/>
```

### Pattern 4: Grid with Actions

```typescript
<DataGrid
  data={items}
  columns={[]}
  renderCard={(item) => (
    <DataGridCard className="space-y-3">
      <h3 className="font-semibold">{item.name}</h3>
      <p className="text-sm text-muted-foreground">{item.description}</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={(e) => {
          e.stopPropagation()
          handleEdit(item)
        }}>
          Edit
        </Button>
        <Button size="sm" variant="destructive" onClick={(e) => {
          e.stopPropagation()
          handleDelete(item.id)
        }}>
          Delete
        </Button>
      </div>
    </DataGridCard>
  )}
  onItemClick={(item) => navigate(`/items/${item.id}`)}
/>
```

## Feature Implementation Checklist

### For DataTable:

- [ ] Define TypeScript interfaces for data
- [ ] Create column definitions with proper types
- [ ] Add sortable columns with DataTableColumnHeader
- [ ] Implement search with searchKey prop
- [ ] Add row actions with DataTableRowActions
- [ ] Provide mobile card view with mobileCard prop
- [ ] Handle loading states with isLoading
- [ ] Add empty states with emptyTitle, emptyDescription, emptyAction
- [ ] Enable pagination if needed
- [ ] Add row selection if needed
- [ ] Test on mobile and desktop

### For DataGrid:

- [ ] Define TypeScript interfaces for data
- [ ] Create renderCard function
- [ ] Add search with searchKeys prop
- [ ] Configure responsive grid with gridCols
- [ ] Handle loading states with isLoading
- [ ] Add empty states with emptyTitle, emptyDescription, emptyAction
- [ ] Implement onItemClick for navigation
- [ ] Add view toggle if needed
- [ ] Optimize images if present
- [ ] Test on mobile and desktop

## Common Mistakes to Avoid

### ❌ DON'T:

```typescript
// Don't define columns inline
<DataTable columns={[{ accessorKey: 'name' }]} data={data} />

// Don't forget mobile view
<DataTable columns={columns} data={data} />

// Don't skip loading states
<DataTable columns={columns} data={data} />

// Don't use any type
const columns: ColumnDef<any>[] = []
```

### ✅ DO:

```typescript
// Define columns outside component or with useMemo
const columns: ColumnDef<Entity>[] = useMemo(() => [
  { accessorKey: 'name', header: 'Name' }
], [])

// Always provide mobile card view
<DataTable
  columns={columns}
  data={data}
  mobileCard={(row) => <MobileCard row={row} />}
/>

// Always handle loading
<DataTable
  columns={columns}
  data={data}
  isLoading={isLoading}
/>

// Use proper types
const columns: ColumnDef<Entity>[] = []
```

## Integration with Features

### Step 1: Create Types

```typescript
// src/features/my-feature/types/index.ts
export interface MyEntity {
    id: string
    name: string
    status: 'active' | 'inactive'
    createdAt: Date
}
```

### Step 2: Create Table Component

```typescript
// src/features/my-feature/components/my-entity-table.tsx
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'
import { useMyEntities } from '../hooks/use-my-entities'

const columns: ColumnDef<MyEntity>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge>{row.original.status}</Badge>
  }
]

export function MyEntityTable() {
  const { entities, isLoading } = useMyEntities()

  return (
    <DataTable
      columns={columns}
      data={entities}
      searchKey="name"
      isLoading={isLoading}
      mobileCard={(row) => (
        <div className="space-y-2">
          <span className="font-semibold">{row.original.name}</span>
          <Badge>{row.original.status}</Badge>
        </div>
      )}
    />
  )
}
```

### Step 3: Use in Page

```typescript
// src/app/routes/my-feature.tsx
import { MyEntityTable } from '@/features/my-feature'

export default function MyFeaturePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Feature</h1>
        <Button>Add New</Button>
      </div>
      <MyEntityTable />
    </div>
  )
}
```

## Performance Optimization

### For Large Datasets (1000+ rows):

```typescript
// Use pagination
<DataTable
  columns={columns}
  data={data}
  enablePagination
  pageSize={50}
/>

// Memoize columns
const columns = useMemo(() => [...], [])

// Memoize expensive cell renderers
const renderCell = useCallback((value) => {
  // expensive operation
}, [])
```

### For Images in Grid:

```typescript
// Use lazy loading
<img
  src={item.image}
  alt={item.name}
  loading="lazy"
  className="w-full h-full object-cover"
/>

// Use aspect-ratio for consistent heights
<div className="aspect-square">
  <img ... />
</div>
```

## Accessibility Guidelines

1. **Always provide aria-labels** for actions
2. **Use semantic HTML** (table, th, td for tables)
3. **Ensure keyboard navigation** works
4. **Add focus indicators** for interactive elements
5. **Provide alt text** for images
6. **Use proper heading hierarchy**
7. **Test with screen readers**

## Testing Checklist

- [ ] Desktop view renders correctly
- [ ] Mobile view renders correctly
- [ ] Search functionality works
- [ ] Sorting works (if enabled)
- [ ] Pagination works (if enabled)
- [ ] Row selection works (if enabled)
- [ ] Row actions work
- [ ] Loading state displays
- [ ] Empty state displays
- [ ] Click handlers work
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
