# Data Display Components Guide

Complete guide for using DataTable and DataGrid components in the Shop Management System.

## Overview

This application provides two powerful data display components:

- **DataTable**: For tabular data with sorting, filtering, and pagination
- **DataGrid**: For card-based layouts with search and responsive grids

## Quick Decision Guide

### Use DataTable When:

- ✅ Displaying tabular data (sales, purchases, users)
- ✅ Need column-based sorting and filtering
- ✅ Data comparison across rows is important
- ✅ Desktop-first interface
- ✅ Multiple columns of structured data

### Use DataGrid When:

- ✅ Displaying visual content (products, parties)
- ✅ Card-based layout is more appropriate
- ✅ Mobile-first interface
- ✅ Content includes images or complex layouts
- ✅ Flexible grid layouts needed

## Installation

```bash
# DataTable requires TanStack Table
pnpm add @tanstack/react-table
```

## DataTable Usage

### Basic Example

```typescript
import { DataTable, DataTableColumnHeader } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface Sale {
  id: string
  invoiceNumber: string
  customerName: string
  total: number
  date: Date
}

const columns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'invoiceNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice #" />
    )
  },
  {
    accessorKey: 'customerName',
    header: 'Customer'
  },
  {
    accessorKey: 'total',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => `$${row.original.total.toFixed(2)}`
  }
]

function SalesTable() {
  const { sales, isLoading } = useSales()

  return (
    <DataTable
      columns={columns}
      data={sales}
      searchKey="customerName"
      searchPlaceholder="Search by customer..."
      isLoading={isLoading}
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-semibold">{row.original.invoiceNumber}</span>
            <span className="font-bold">${row.original.total.toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground">{row.original.customerName}</p>
        </div>
      )}
    />
  )
}
```

### Advanced Features

```typescript
import {
  DataTable,
  DataTableColumnHeader,
  DataTableRowActions,
  DataTableSelectColumn
} from '@/components/ui/data-table'

const columns: ColumnDef<Sale>[] = [
  DataTableSelectColumn<Sale>(), // Row selection
  {
    accessorKey: 'invoiceNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice #" />
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          { label: 'View', onClick: (row) => navigate(`/sales/${row.original.id}`) },
          { label: 'Edit', onClick: (row) => setEditSale(row.original) },
          { label: 'Delete', onClick: (row) => handleDelete(row.original.id), variant: 'destructive' }
        ]}
      />
    )
  }
]

<DataTable
  columns={columns}
  data={sales}
  searchKey="customerName"
  enableRowSelection
  enableColumnVisibility
  enablePagination
  pageSize={20}
  onRowClick={(row) => navigate(`/sales/${row.original.id}`)}
/>
```

## DataGrid Usage

### Basic Example

```typescript
import { DataGrid, DataGridCard } from '@/components/ui/data-grid'

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
}

function ProductsGrid() {
  const { products, isLoading } = useProducts()

  return (
    <DataGrid
      data={products}
      columns={[]}
      renderCard={(product) => (
        <DataGridCard>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>
          <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
        </DataGridCard>
      )}
      searchKeys={['name', 'category']}
      searchPlaceholder="Search products..."
      isLoading={isLoading}
      gridCols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
    />
  )
}
```

### Advanced Features

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
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-2">{product.name}</h3>
          {product.stock < 10 && (
            <Badge variant="destructive">Low Stock</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <Button size="sm" onClick={(e) => {
            e.stopPropagation()
            addToCart(product)
          }}>
            Add to Cart
          </Button>
        </div>
      </div>
    </DataGridCard>
  )}
  searchKeys={['name', 'category', 'sku']}
  searchPlaceholder="Search products..."
  isLoading={isLoading}
  onItemClick={(product) => navigate(`/products/${product.id}`)}
  enableSearch
  enableViewToggle
  gridCols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
  emptyTitle="No products found"
  emptyDescription="Add your first product to get started"
  emptyAction={<Button>Add Product</Button>}
/>
```

## Real-World Examples

### Sales Table

```typescript
// src/features/sales/components/sales-table.tsx
import { DataTable, DataTableColumnHeader, DataTableRowActions } from '@/components/ui/data-table'
import { useSales } from '../hooks/use-sales'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/features/shared'

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
        paid: 'default',
        pending: 'secondary',
        cancelled: 'destructive'
      }
      return <Badge variant={statusColors[row.original.status]}>{row.original.status}</Badge>
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DataTableRowActions
        row={row}
        actions={[
          { label: 'View Details', onClick: (row) => navigate(`/sales/${row.original.id}`) },
          { label: 'Print Invoice', onClick: (row) => printInvoice(row.original.id) },
          { label: 'Delete', onClick: (row) => handleDelete(row.original.id), variant: 'destructive' }
        ]}
      />
    )
  }
]

export function SalesTable() {
  const { sales, isLoading } = useSales()
  const navigate = useNavigate()

  return (
    <DataTable
      columns={columns}
      data={sales}
      searchKey="customerName"
      searchPlaceholder="Search by customer or invoice..."
      isLoading={isLoading}
      onRowClick={(row) => navigate(`/sales/${row.original.id}`)}
      enablePagination
      pageSize={20}
      mobileCard={(row) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold">{row.original.invoiceNumber}</span>
            <Badge variant={statusColors[row.original.status]}>{row.original.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{row.original.customerName}</p>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{formatDate(row.original.date)}</span>
            <span className="font-bold">${row.original.total.toFixed(2)}</span>
          </div>
        </div>
      )}
    />
  )
}
```

### Products Grid

```typescript
// src/features/products/components/products-grid.tsx
import { DataGrid, DataGridCard } from '@/components/ui/data-grid'
import { useProducts } from '../hooks/use-products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Package } from 'lucide-react'

export function ProductsGrid() {
  const { products, isLoading } = useProducts()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  return (
    <DataGrid
      data={products}
      columns={[]}
      renderCard={(product) => (
        <DataGridCard className="space-y-3">
          <div className="aspect-square bg-muted rounded-md overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              {product.stock < 10 && (
                <Badge variant="destructive">Low Stock</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart(product)
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Stock: {product.stock} units</p>
          </div>
        </DataGridCard>
      )}
      searchKeys={['name', 'category', 'sku']}
      searchPlaceholder="Search products..."
      isLoading={isLoading}
      onItemClick={(product) => navigate(`/products/${product.id}`)}
      enableSearch
      enableViewToggle
      gridCols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
      gap={4}
    />
  )
}
```

## Best Practices

### DataTable Best Practices

1. **Always provide searchKey** for better UX
2. **Use DataTableColumnHeader** for sortable columns
3. **Provide mobileCard** for responsive design
4. **Handle loading states** with isLoading prop
5. **Add empty states** with custom actions
6. **Use TypeScript** for type safety
7. **Memoize columns** with useMemo
8. **Add row actions** for common operations
9. **Test on mobile** to ensure responsive behavior
10. **Use proper cell renderers** for formatting

### DataGrid Best Practices

1. **Use DataGridCard** for consistent styling
2. **Provide searchKeys** for better search
3. **Handle loading states** properly
4. **Add empty states** with actions
5. **Optimize images** for performance
6. **Use aspect-ratio** for consistent heights
7. **Add hover effects** for better UX
8. **Test on mobile** for responsive behavior
9. **Use line-clamp** for long text
10. **Add badges** for status indicators

## Performance Tips

### For DataTable:

- Use `React.memo()` for expensive cell renderers
- Avoid inline functions in column definitions
- Use `useMemo()` for column definitions
- Enable pagination for large datasets
- Consider virtualization for 1000+ rows

### For DataGrid:

- Use `React.memo()` for renderCard function
- Optimize images with lazy loading
- Use `useMemo()` for expensive calculations
- Consider virtualization for 100+ items
- Debounce search input

## Accessibility

Both components support:

- ✅ Keyboard navigation
- ✅ Screen reader friendly
- ✅ ARIA labels on interactive elements
- ✅ Focus management
- ✅ Semantic HTML structure

## Examples Location

Live examples are available at:

- `src/features/shared/examples/data-table-example.tsx`
- `src/features/shared/examples/data-grid-example.tsx`

## Documentation

- **DataTable**: `src/components/ui/data-table.md`
- **DataGrid**: `src/components/ui/data-grid.md`
- **AI Rules**: `.amazonq/rules/data-display-patterns.md`

## Support

For issues or questions:

1. Check the documentation files
2. Review the example implementations
3. Refer to AI rules for patterns
4. Test on both mobile and desktop
