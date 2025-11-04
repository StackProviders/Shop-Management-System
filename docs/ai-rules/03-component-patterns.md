# Component Patterns

## Common Components (Use FIRST)

### ListDetailPage

Generic list-detail layout component for all list-detail interfaces.

```typescript
import { ListDetailPage } from '@/components/common'

<ListDetailPage
  title="My Feature"
  icon={<Package className="size-5" />}
  items={items}
  searchKeys={['name', 'code']}
  renderItem={(item, isSelected) => (
    <ItemCard item={item} isSelected={isSelected} />
  )}
  onItemClick={(item) => navigate(`/my-feature/${item.id}`)}
  createPath="/my-feature/new"
  headerActions={<Tabs>...</Tabs>}
  filters={<FilterButton />}
  stats={[{ label: 'Total', value: items.length }]}
  emptyIcon={<Package />}
  emptyTitle="No items found"
  emptyDescription="Create your first item"
>
  {children}
</ListDetailPage>
```

### VirtualizedList

Performance-optimized list rendering for large datasets.

```typescript
import { VirtualizedList } from '@/components/common'

<VirtualizedList
  items={items}
  renderItem={(item, index) => <ItemCard item={item} />}
  estimateSize={60}
  overscan={5}
  className="h-full"
/>
```

### CrudForm

Standardized form wrapper with loading states.

```typescript
import { CrudForm } from '@/components/common'

<CrudForm
  form={form}
  onSubmit={handleSubmit}
  submitLabel="Create"
  onCancel={() => navigate(-1)}
  loading={isSubmitting}
>
  <FormField ... />
</CrudForm>
```

## Responsive Patterns

### Responsive Modal

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

export function ResponsiveModal({ open, onOpenChange, children }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
```

### Responsive Layout

```typescript
<div className="flex flex-col md:flex-row gap-2 md:gap-4">
  <div className="w-full md:w-1/2">Content</div>
</div>
```

## Form Patterns

### Form with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email()
})

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
```

## Data Display Patterns

### Loading States

```typescript
import { Skeleton } from '@/components/ui/skeleton'

if (isLoading) {
  return <Skeleton className="h-20 w-full" />
}
```

### Empty States

```typescript
import { Empty } from '@/components/ui/empty'

if (items.length === 0) {
  return (
    <Empty
      title="No items found"
      description="Create your first item"
      action={<Button>Create</Button>}
    />
  )
}
```

### Error States

```typescript
if (error) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  )
}
```

## Feedback Patterns

### Toast Notifications

```typescript
import { toast } from 'sonner'

// Success
toast.success('Item created successfully')

// Error
toast.error('Failed to create item')

// Loading
const toastId = toast.loading('Creating...')
toast.success('Created', { id: toastId })

// With action
toast('Item created', {
    action: {
        label: 'View',
        onClick: () => navigate(`/items/${id}`)
    }
})
```

### Confirmation Dialogs

```typescript
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirm}>
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Button Patterns

```typescript
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>

// Special
<SubmitButton loading={isLoading}>Submit</SubmitButton>
```

## Card Patterns

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## Navigation Patterns

### Sidebar Navigation

```typescript
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

<Sidebar>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/items">
                <Package />
                <span>Items</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
</Sidebar>
```

### Dropdown Menu

```typescript
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost">Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
    <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## Accessibility Patterns

### Keyboard Navigation

```typescript
useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === '/' && e.metaKey) {
            e.preventDefault()
            inputRef.current?.focus()
        }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

### Screen Reader Support

```typescript
<Button variant="ghost" size="icon" aria-label="Delete item">
  <Trash2 />
  <span className="sr-only">Delete item</span>
</Button>
```

## Performance Patterns

### Memoization

```typescript
// Memoize expensive calculations
const filtered = useMemo(
    () => items.filter((item) => item.status === 'active'),
    [items]
)

// Memoize callbacks
const handleClick = useCallback(
    (id: string) => navigate(`/items/${id}`),
    [navigate]
)

// Memoize components
const MemoizedCard = React.memo(ItemCard)
```

### Code Splitting

```typescript
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'))

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>
```

## Common Mistakes

### ❌ DON'T

```typescript
// Don't use any
function process(data: any) { }

// Don't skip loading states
{items.map(item => <ItemCard item={item} />)}

// Don't use inline styles
<div style={{ display: 'flex' }}>

// Don't import from internal paths
import { useItems } from '@/features/items/hooks/use-items'
```

### ✅ DO

```typescript
// Use proper types
function process<T extends Record<string, unknown>>(data: T) { }

// Always handle loading
{isLoading ? <Skeleton /> : items.map(item => <ItemCard item={item} />)}

// Use Tailwind classes
<div className="flex items-center">

// Import from feature roots
import { useItems } from '@/features/items'
```
