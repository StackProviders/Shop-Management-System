# Component Patterns & Best Practices

## Responsive Component Patterns

### Pattern 1: Conditional Rendering (Mobile vs Desktop)

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function ResponsiveModal({ children, open, onOpenChange }) {
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

### Pattern 2: Responsive Layout with Tailwind

```typescript
function ProductCard({ product }) {
  return (
    <Card className="flex flex-col md:flex-row gap-4 p-4">
      <img
        src={product.image}
        className="w-full md:w-32 h-48 md:h-32 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="text-lg md:text-xl font-semibold">{product.name}</h3>
        <p className="text-sm md:text-base text-muted-foreground">
          {product.description}
        </p>
      </div>
    </Card>
  )
}
```

### Pattern 3: Responsive Navigation

```typescript
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from '@/components/ui/sidebar'
import { Menu } from 'lucide-react'

function ResponsiveNav() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <NavigationMenu />
        </SheetContent>
      </Sheet>
    )
  }

  return <Sidebar><NavigationMenu /></Sidebar>
}
```

## Form Patterns

### Pattern 1: Basic Form with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/button'

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email address')
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '' }
  })

  const onSubmit = async (data) => {
    // Handle submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <SubmitButton loading={form.formState.isSubmitting}>
          Submit
        </SubmitButton>
      </form>
    </Form>
  )
}
```

### Pattern 2: Phone Input

```typescript
import { PhoneInput } from '@/components/ui/phone-input'

<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone Number</FormLabel>
      <FormControl>
        <PhoneInput {...field} defaultCountry="US" />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## Data Display Patterns

### Pattern 1: Loading States

```typescript
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'

function DataList() {
  const { data, isLoading, error } = useSWR('/api/items', fetcher)

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }

  if (error) {
    return <Alert variant="destructive">Error loading data</Alert>
  }

  return <div>{/* Render data */}</div>
}
```

### Pattern 2: Empty States

```typescript
import { Empty } from '@/components/ui/empty'

function ShopList({ shops }) {
  if (shops.length === 0) {
    return (
      <Empty
        title="No shops found"
        description="Create your first shop to get started"
        action={<Button onClick={handleCreate}>Create Shop</Button>}
      />
    )
  }

  return <div>{/* Render shops */}</div>
}
```

### Pattern 3: Data Table

```typescript
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

function DataTable({ data }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">Edit</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## Feedback Patterns

### Pattern 1: Toast Notifications

```typescript
import { toast } from 'sonner'

// Success
toast.success('Shop created successfully')

// Error
toast.error('Failed to create shop')

// Loading
const toastId = toast.loading('Creating shop...')
// Later: toast.dismiss(toastId)

// With action
toast('Shop created', {
    action: {
        label: 'View',
        onClick: () => navigate(`/shops/${shopId}`)
    }
})
```

### Pattern 2: Confirmation Dialogs

```typescript
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

function DeleteConfirmation({ open, onOpenChange, onConfirm }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Custom Hook Patterns

### Pattern 1: Data Fetching Hook

```typescript
import useSWR from 'swr'

function useShops() {
    const { data, error, isLoading, mutate } = useSWR('/api/shops', fetcher)

    return {
        shops: data ?? [],
        isLoading,
        error,
        refresh: mutate
    }
}
```

### Pattern 2: Form Hook

```typescript
function useShopForm(initialData?: Shop) {
    const [loading, setLoading] = useState(false)
    const { createShop, updateShop } = useShopActions()

    const handleSubmit = async (data: ShopFormData) => {
        setLoading(true)
        try {
            if (initialData) {
                await updateShop(initialData.id, data)
                toast.success('Shop updated')
            } else {
                await createShop(data)
                toast.success('Shop created')
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { handleSubmit, loading }
}
```

## Layout Patterns

### Pattern 1: Dashboard Layout

```typescript
import { DashboardLayout } from '@/components/layouts/dashboard-layout'

function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button>Create New</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Cards */}
        </div>
      </div>
    </DashboardLayout>
  )
}
```

### Pattern 2: Card Grid

```typescript
function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </Card>
      ))}
    </div>
  )
}
```

## Accessibility Patterns

### Pattern 1: Keyboard Navigation

```typescript
function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null)

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

  return (
    <div className="relative">
      <Input ref={inputRef} placeholder="Search..." />
      <Kbd className="absolute right-2 top-2">⌘/</Kbd>
    </div>
  )
}
```

### Pattern 2: Screen Reader Support

```typescript
function IconButton({ icon: Icon, label, ...props }) {
  return (
    <Button variant="ghost" size="icon" aria-label={label} {...props}>
      <Icon />
      <span className="sr-only">{label}</span>
    </Button>
  )
}
```
