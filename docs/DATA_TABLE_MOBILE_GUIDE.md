# DataTable Mobile Responsive Guide

## Overview

The DataTable component now automatically switches between table view (desktop) and card view (mobile) for optimal user experience on all devices.

## Key Features

✅ **Automatic Detection** - Uses `useIsMobile()` hook to detect screen size
✅ **Card View on Mobile** - Beautiful card layout for mobile devices
✅ **All Features Preserved** - Sorting, filtering, pagination, selection work on both views
✅ **Click Handlers** - Row click support on both desktop and mobile
✅ **Custom Mobile Cards** - Full control over mobile card appearance
✅ **Performance Optimized** - Smooth transitions and efficient rendering

## Basic Usage

```typescript
import { DataTable } from '@/components/data-table/data-table'
import { useReactTable, getCoreRowModel, type ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<YourType>[] = [
  // Your column definitions
]

const table = useReactTable({
  data: yourData,
  columns,
  getCoreRowModel: getCoreRowModel()
})

<DataTable
  table={table}
  mobileCard={(row) => (
    <div className="space-y-2">
      <h3 className="font-semibold">{row.original.name}</h3>
      <p className="text-sm text-muted-foreground">{row.original.description}</p>
    </div>
  )}
  onRowClick={(row) => navigate(`/detail/${row.original.id}`)}
/>
```

## Props

| Prop         | Type                             | Description                                           |
| ------------ | -------------------------------- | ----------------------------------------------------- |
| `table`      | `TanstackTable<TData>`           | Required - TanStack table instance                    |
| `mobileCard` | `(row: Row<TData>) => ReactNode` | Optional - Custom mobile card renderer                |
| `onRowClick` | `(row: Row<TData>) => void`      | Optional - Row click handler (works on both views)    |
| `actionBar`  | `ReactNode`                      | Optional - Action bar for selected rows               |
| `children`   | `ReactNode`                      | Optional - Additional content (filters, search, etc.) |

## Mobile Card Patterns

### Pattern 1: Simple Card

```typescript
mobileCard={(row) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <span className="font-semibold">{row.original.name}</span>
      <Badge>{row.original.status}</Badge>
    </div>
    <p className="text-sm text-muted-foreground">{row.original.email}</p>
  </div>
)}
```

### Pattern 2: Card with Selection

```typescript
mobileCard={(row) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
        />
        <span className="font-semibold">{row.original.name}</span>
      </div>
      <Badge>{row.original.status}</Badge>
    </div>
    <p className="text-sm text-muted-foreground">{row.original.description}</p>
  </div>
)}
```

### Pattern 3: Card with Avatar

```typescript
mobileCard={(row) => (
  <div className="space-y-3">
    <div className="flex items-start gap-3">
      <Avatar className="h-10 w-10">
        <AvatarFallback>{row.original.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold truncate">{row.original.name}</h3>
        <p className="text-sm text-muted-foreground">{row.original.email}</p>
      </div>
      <Badge>{row.original.role}</Badge>
    </div>
  </div>
)}
```

### Pattern 4: Card with Actions

```typescript
mobileCard={(row) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="font-semibold">{row.original.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <p className="text-sm text-muted-foreground">{row.original.description}</p>
  </div>
)}
```

### Pattern 5: Card with Metrics

```typescript
mobileCard={(row) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="font-semibold">{row.original.invoiceNumber}</span>
      <Badge>{row.original.status}</Badge>
    </div>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div>
        <span className="text-muted-foreground">Customer</span>
        <p className="font-medium">{row.original.customerName}</p>
      </div>
      <div>
        <span className="text-muted-foreground">Total</span>
        <p className="font-bold">${row.original.total.toFixed(2)}</p>
      </div>
    </div>
    <p className="text-xs text-muted-foreground">
      {row.original.date.toLocaleDateString()}
    </p>
  </div>
)}
```

## Real-World Examples

### Sales Table

```typescript
import { DataTable } from '@/components/data-table/data-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

const columns: ColumnDef<Sale>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    )
  },
  { accessorKey: 'invoiceNumber', header: 'Invoice #' },
  { accessorKey: 'customerName', header: 'Customer' },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge>{row.original.status}</Badge>
  }
]

<DataTable
  table={table}
  mobileCard={(row) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="font-semibold">{row.original.invoiceNumber}</span>
        </div>
        <Badge>{row.original.status}</Badge>
      </div>
      <p className="text-sm text-muted-foreground">{row.original.customerName}</p>
      <div className="flex justify-between pt-2 border-t">
        <span className="text-muted-foreground">Total</span>
        <span className="text-lg font-bold">${row.original.total.toFixed(2)}</span>
      </div>
    </div>
  )}
  onRowClick={(row) => navigate(`/sales/${row.original.id}`)}
/>
```

### Parties Table

```typescript
<DataTable
  table={table}
  mobileCard={(row) => (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback>{row.original.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{row.original.name}</h3>
            <Badge variant={row.original.type === 'customer' ? 'default' : 'secondary'}>
              {row.original.type}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{row.original.phone}</p>
          {row.original.email && (
            <p className="text-sm text-muted-foreground truncate">{row.original.email}</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm text-muted-foreground">Balance</span>
        <span className={cn(
          'font-semibold',
          row.original.balance > 0 ? 'text-green-600' :
          row.original.balance < 0 ? 'text-red-600' : ''
        )}>
          ${Math.abs(row.original.balance).toFixed(2)}
        </span>
      </div>
    </div>
  )}
  onRowClick={(row) => navigate(`/parties/${row.original.id}`)}
/>
```

### Products Table

```typescript
<DataTable
  table={table}
  mobileCard={(row) => (
    <div className="space-y-3">
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-2">{row.original.name}</h3>
            {row.original.stock < 10 && (
              <Badge variant="destructive">Low Stock</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{row.original.category}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Price</span>
          <p className="font-bold">${row.original.price}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Stock</span>
          <p className={cn(
            'font-semibold',
            row.original.stock < 10 ? 'text-red-600' : 'text-green-600'
          )}>
            {row.original.stock} units
          </p>
        </div>
      </div>
    </div>
  )}
/>
```

## Best Practices

### 1. Always Provide Mobile Card

```typescript
// ✅ DO
<DataTable table={table} mobileCard={(row) => <MobileCard row={row} />} />

// ❌ DON'T - Will show table on mobile (poor UX)
<DataTable table={table} />
```

### 2. Stop Propagation on Interactive Elements

```typescript
// ✅ DO - Prevent card click when clicking checkbox
<Checkbox
  onClick={(e) => e.stopPropagation()}
  checked={row.getIsSelected()}
/>

// ❌ DON'T - Will trigger both checkbox and card click
<Checkbox checked={row.getIsSelected()} />
```

### 3. Use Proper Spacing

```typescript
// ✅ DO - Use consistent spacing
<div className="space-y-3">
  <div className="flex items-center justify-between">...</div>
  <p className="text-sm">...</p>
  <div className="flex justify-between pt-2 border-t">...</div>
</div>
```

### 4. Handle Long Text

```typescript
// ✅ DO - Use truncate or line-clamp
<h3 className="font-semibold truncate">{row.original.name}</h3>
<p className="text-sm line-clamp-2">{row.original.description}</p>
```

### 5. Show Important Info First

```typescript
// ✅ DO - Most important info at top
<div className="space-y-3">
  <div className="flex justify-between">
    <span className="font-semibold">{row.original.invoiceNumber}</span>
    <Badge>{row.original.status}</Badge>
  </div>
  <p className="text-sm text-muted-foreground">{row.original.customerName}</p>
  <div className="text-lg font-bold">${row.original.total}</div>
</div>
```

## Performance Tips

1. **Memoize Mobile Card** - Use `React.memo()` for expensive renders
2. **Avoid Inline Functions** - Define handlers outside render
3. **Optimize Images** - Use lazy loading for product images
4. **Limit Data** - Use pagination for large datasets
5. **Test on Real Devices** - Emulators don't show real performance

## Accessibility

- ✅ Keyboard navigation works on both views
- ✅ Screen readers announce card content
- ✅ Focus management preserved
- ✅ ARIA labels on interactive elements
- ✅ Touch targets meet minimum size (44x44px)

## Testing Checklist

- [ ] Desktop table view renders correctly
- [ ] Mobile card view renders correctly
- [ ] Pagination works on both views
- [ ] Sorting works on both views
- [ ] Filtering works on both views
- [ ] Row selection works on both views
- [ ] Row click handler works on both views
- [ ] Action bar appears when rows selected
- [ ] Interactive elements don't trigger card click
- [ ] Long text is properly truncated
- [ ] Touch targets are large enough
- [ ] Performance is smooth on real devices

## Migration from Old DataTable

```typescript
// OLD - No mobile support
<DataTable table={table} />

// NEW - With mobile support
<DataTable
  table={table}
  mobileCard={(row) => (
    <div className="space-y-2">
      <span className="font-semibold">{row.original.name}</span>
      <p className="text-sm text-muted-foreground">{row.original.email}</p>
    </div>
  )}
/>
```

## Example Location

Complete working example: `src/components/data-table/data-table-mobile-example.tsx`

## Support

For issues or questions, refer to:

- Main documentation: `docs/DATA_DISPLAY_GUIDE.md`
- Component source: `src/components/data-table/data-table.tsx`
- Example: `src/components/data-table/data-table-mobile-example.tsx`
