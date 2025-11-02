# DataGrid Component

A flexible, responsive grid component for displaying data in card layouts with search, filtering, and view toggle.

## Features

- ✅ Card-based layout
- ✅ Responsive grid (1-4 columns)
- ✅ Search/filter functionality
- ✅ Grid/List view toggle
- ✅ Loading states
- ✅ Empty states
- ✅ Mobile optimized
- ✅ TypeScript support

## Basic Usage

```typescript
import { DataGrid, DataGridCard } from '@/components/ui/data-grid'

interface Product {
  id: string
  name: string
  price: number
  category: string
}

function ProductsGrid() {
  const { products, isLoading } = useProducts()

  return (
    <DataGrid
      data={products}
      columns={[]} // Not used in basic grid
      renderCard={(product) => (
        <DataGridCard>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <p className="text-lg font-bold mt-2">${product.price}</p>
        </DataGridCard>
      )}
      searchKeys={['name', 'category']}
      searchPlaceholder="Search products..."
      isLoading={isLoading}
    />
  )
}
```

## Advanced Usage

```typescript
import { DataGrid, DataGridCard } from '@/components/ui/data-grid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

function AdvancedProductsGrid() {
  const { products, isLoading } = useProducts()
  const navigate = useNavigate()

  return (
    <DataGrid
      data={products}
      columns={[]}
      renderCard={(product) => (
        <DataGridCard className="space-y-3">
          <div className="aspect-square bg-muted rounded-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold line-clamp-2">{product.name}</h3>
              <Badge>{product.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">${product.price}</span>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </DataGridCard>
      )}
      searchKeys={['name', 'category', 'description']}
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
  )
}
```

## Props

| Prop                | Type                         | Default                         | Description                       |
| ------------------- | ---------------------------- | ------------------------------- | --------------------------------- |
| `data`              | `TData[]`                    | Required                        | Grid data                         |
| `columns`           | `DataGridColumn[]`           | Required                        | Column definitions (for metadata) |
| `renderCard`        | `(item, index) => ReactNode` | Required                        | Card renderer function            |
| `searchKeys`        | `(keyof TData)[]`            | `[]`                            | Keys to search in                 |
| `searchPlaceholder` | `string`                     | `"Search..."`                   | Search input placeholder          |
| `isLoading`         | `boolean`                    | `false`                         | Show loading state                |
| `onItemClick`       | `(item) => void`             | -                               | Item click handler                |
| `emptyTitle`        | `string`                     | `"No items found"`              | Empty state title                 |
| `emptyDescription`  | `string`                     | `"No data available"`           | Empty state description           |
| `emptyAction`       | `ReactNode`                  | -                               | Empty state action button         |
| `gridCols`          | `object`                     | `{default:1, sm:2, lg:3, xl:4}` | Responsive columns                |
| `enableSearch`      | `boolean`                    | `true`                          | Enable search                     |
| `enableViewToggle`  | `boolean`                    | `false`                         | Enable grid/list toggle           |
| `className`         | `string`                     | -                               | Additional CSS classes            |
| `gap`               | `number`                     | `4`                             | Grid gap (Tailwind scale)         |

## Grid Columns Configuration

```typescript
// Default responsive grid
gridCols={{ default: 1, sm: 2, lg: 3, xl: 4 }}

// 2 columns on all screens
gridCols={{ default: 2 }}

// Custom breakpoints
gridCols={{ default: 1, md: 2, lg: 4, xl: 6 }}

// Dense grid
gridCols={{ default: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
```

## Real-World Examples

### Products Grid

```typescript
import { DataGrid, DataGridCard } from '@/components/ui/data-grid'
import { useProducts } from '@/features/products'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

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
            <img
              src={product.image || '/placeholder.png'}
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
      gap={4}
    />
  )
}
```

### Parties Grid

```typescript
import { DataGrid, DataGridCard } from '@/components/ui/data-grid'
import { useParties } from '@/features/parties'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatPhone } from '@/features/shared'

export function PartiesGrid() {
  const { parties, isLoading } = useParties()
  const navigate = useNavigate()

  return (
    <DataGrid
      data={parties}
      columns={[]}
      renderCard={(party) => (
        <DataGridCard className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{party.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold truncate">{party.name}</h3>
                <Badge variant={party.type === 'customer' ? 'default' : 'secondary'}>
                  {party.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{formatPhone(party.phone)}</p>
              {party.email && (
                <p className="text-sm text-muted-foreground truncate">{party.email}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">Balance</span>
            <span className={cn(
              'font-semibold',
              party.balance > 0 ? 'text-green-600' : party.balance < 0 ? 'text-red-600' : ''
            )}>
              ${Math.abs(party.balance).toFixed(2)}
            </span>
          </div>
        </DataGridCard>
      )}
      searchKeys={['name', 'phone', 'email']}
      searchPlaceholder="Search parties..."
      isLoading={isLoading}
      onItemClick={(party) => navigate(`/parties/${party.id}`)}
      enableSearch
      gridCols={{ default: 1, sm: 2, lg: 3 }}
    />
  )
}
```

### Sales Grid

```typescript
export function SalesGrid() {
  const { sales, isLoading } = useSales()
  const navigate = useNavigate()

  return (
    <DataGrid
      data={sales}
      columns={[]}
      renderCard={(sale) => (
        <DataGridCard className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Invoice #{sale.invoiceNumber}</h3>
              <p className="text-sm text-muted-foreground">{sale.customerName}</p>
            </div>
            <Badge variant={
              sale.status === 'paid' ? 'success' :
              sale.status === 'pending' ? 'warning' : 'destructive'
            }>
              {sale.status}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span>{formatDate(sale.date)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items</span>
              <span>{sale.itemCount}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-medium">Total</span>
              <span className="text-lg font-bold">${sale.total.toFixed(2)}</span>
            </div>
          </div>
        </DataGridCard>
      )}
      searchKeys={['invoiceNumber', 'customerName']}
      searchPlaceholder="Search sales..."
      isLoading={isLoading}
      onItemClick={(sale) => navigate(`/sales/${sale.id}`)}
      enableSearch
      gridCols={{ default: 1, sm: 2, lg: 3 }}
    />
  )
}
```

### Inventory Grid

```typescript
export function InventoryGrid() {
  const { items, isLoading } = useInventory()

  return (
    <DataGrid
      data={items}
      columns={[]}
      renderCard={(item) => (
        <DataGridCard className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.sku}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Stock</span>
              <p className={cn(
                'font-semibold',
                item.stock < item.minStock ? 'text-red-600' : 'text-green-600'
              )}>
                {item.stock} units
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Value</span>
              <p className="font-semibold">${(item.stock * item.price).toFixed(2)}</p>
            </div>
          </div>
          {item.stock < item.minStock && (
            <Badge variant="destructive" className="w-full justify-center">
              Low Stock Alert
            </Badge>
          )}
        </DataGridCard>
      )}
      searchKeys={['name', 'sku', 'category']}
      searchPlaceholder="Search inventory..."
      isLoading={isLoading}
      enableSearch
      gridCols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
    />
  )
}
```

## DataGridCard Helper

```typescript
import { DataGridCard } from '@/components/ui/data-grid'

// Basic card
<DataGridCard>
  <h3>Title</h3>
  <p>Content</p>
</DataGridCard>

// With custom styling
<DataGridCard className="bg-gradient-to-br from-blue-50 to-blue-100">
  <h3>Styled Card</h3>
</DataGridCard>

// With click handler
<DataGridCard onClick={() => console.log('Clicked')}>
  <h3>Clickable Card</h3>
</DataGridCard>
```

## Best Practices

1. **Use DataGridCard** for consistent styling
2. **Provide searchKeys** for better search experience
3. **Handle loading states** properly
4. **Add empty states** with actions
5. **Optimize images** for better performance
6. **Use aspect-ratio** for consistent card heights
7. **Add hover effects** for better UX
8. **Test on mobile** for responsive behavior
9. **Use line-clamp** for long text
10. **Add badges** for status indicators

## Performance Tips

- Use `React.memo()` for renderCard function
- Optimize images with lazy loading
- Use `useMemo()` for expensive calculations
- Consider virtualization for 100+ items
- Debounce search input

## Accessibility

- Keyboard navigation supported
- Screen reader friendly
- ARIA labels on interactive elements
- Focus management
- Semantic HTML structure

## When to Use DataGrid vs DataTable

**Use DataGrid when:**

- Displaying visual content (images, cards)
- Need flexible layouts
- Content is better suited for cards
- Mobile-first design

**Use DataTable when:**

- Displaying tabular data
- Need sorting/filtering by columns
- Data comparison is important
- Desktop-first design
