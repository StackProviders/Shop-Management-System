# Component Quick Reference

## 🚀 Common Components Cheat Sheet

### Dialogs

```typescript
// Confirmation Dialog
import { ConfirmationDialog } from '@/components/common'

<ConfirmationDialog
  open={open}
  onOpenChange={setOpen}
  onConfirm={handleConfirm}
  title="Confirm Action"
  description="Are you sure?"
  confirmText="Yes"
  cancelText="No"
  variant="destructive" // or "default"
/>
```

### Feedback

```typescript
// Empty State
import { EmptyState } from '@/components/common'

<EmptyState
  icon={<Icon />}
  title="No items"
  description="Get started by creating one"
  action={<Button>Create</Button>}
/>

// Loading State
import { LoadingState } from '@/components/common'

<LoadingState message="Loading..." size="md" />

// Error State
import { ErrorState } from '@/components/common'

<ErrorState
  title="Error"
  message="Something went wrong"
  onRetry={refetch}
/>
```

### Actions

```typescript
// Detail Actions Menu
import { DetailActionsMenu } from '@/components/common'

<DetailActionsMenu
  item={item}
  itemName="Item"
  editPath="/items/:id/edit"
  duplicatePath="/items/new"
  listPath="/items"
  onDelete={deleteItem}
  getDuplicateData={(item) => ({ ...item })}
/>
```

### Forms

```typescript
// CRUD Form
import { CrudForm } from '@/components/common'

<CrudForm
  form={form}
  onSubmit={handleSubmit}
  submitLabel="Save"
  cancelLabel="Cancel"
  onCancel={handleCancel}
>
  {/* Form fields */}
</CrudForm>
```

### Layouts

```typescript
// List Detail Page
import { ListDetailPage } from '@/components/common'

<ListDetailPage
  title="Items"
  items={items}
  searchKeys={['name']}
  renderItem={(item, isSelected) => <ItemCard item={item} />}
  onItemClick={(item) => navigate(`/items/${item.id}`)}
  createPath="/items/new"
>
  <Outlet />
</ListDetailPage>
```

### Responsive

```typescript
// Responsive Modal
import { ResponsiveModal } from '@/components'

<ResponsiveModal
  open={open}
  onOpenChange={setOpen}
  title="Title"
  description="Description"
>
  {/* Content */}
</ResponsiveModal>

// Form Modal
import { FormModal } from '@/components'

<FormModal
  open={open}
  onOpenChange={setOpen}
  title="Edit Item"
  formId="item-form"
  isDirty={form.formState.isDirty}
>
  {/* Form */}
</FormModal>
```

## 📦 Feature Imports

### Auth

```typescript
import {
    // Components
    LoginForm,
    ProfileForm,
    OTPInput,
    LogoutButton,
    UserMenu,

    // Hooks
    useAuth,
    useAuthActions,
    useCurrentUser,

    // Utils
    OTPEmail,
    renderOTPEmail
} from '@/features/auth'
```

### Shop

```typescript
import {
    // Components
    ShopProvider,
    CreateShopModal,
    EditShopModal,
    ShopDashboard,
    ShopItem,
    ShopSwitcher,

    // Hooks
    useShopContext,
    useShopActions,
    useCurrentShop,
    useUserShops,

    // Utils
    hasPermission,
    canManageShop
} from '@/features/shop'
```

### Shared

```typescript
import {
    // Hooks
    useDebounce,
    useCrudOperations,
    useSearchFilter,
    useAsync,

    // Utils
    formatDate,
    formatCurrency,
    isValidEmail
} from '@/features/shared'
```

## 🎨 UI Components

### Buttons

```typescript
import { Button, SubmitButton } from '@/components/ui/button'

<Button variant="default" size="md">Click</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline" size="lg">Cancel</Button>
<Button variant="ghost" size="xs">Link</Button>

<SubmitButton loading={isLoading}>Submit</SubmitButton>
```

### Forms

```typescript
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

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
```

### Modals

```typescript
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from '@/components/ui/drawer'
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
```

### Feedback

```typescript
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { Skeleton } from '@/components/ui/skeleton'

toast.success('Success!')
toast.error('Error!')
toast.info('Info')

<Spinner className="size-6" />
<Skeleton className="h-4 w-full" />
```

## 🔧 Hooks

### Common Patterns

```typescript
// Debounce
const debouncedValue = useDebounce(value, 500)

// CRUD Operations
const { create, update, remove } = useCrudOperations('items', shopId)

// Search Filter
const filtered = useSearchFilter(items, search, ['name', 'description'])

// Mobile Detection
const isMobile = useIsMobile()

// Async State
const { execute, loading, error } = useAsync(asyncFunction)
```

## 📝 Validation

```typescript
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email'),
    age: z.number().min(18, 'Must be 18+')
})

const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', age: 0 }
})
```

## 🎯 Quick Patterns

### Create Feature (45 lines)

```typescript
// 1. Types
export interface MyItem { id: string; shopId: string; name: string }

// 2. Query
export function useMyItems(shopId: string) {
  const firestore = useFirestore()
  const q = query(collection(firestore, 'items'), where('shopId', '==', shopId))
  const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })
  return { items: (data as MyItem[]) ?? [], isLoading: status === 'loading' }
}

// 3. Mutations
export function useMyItemMutations(shopId: string) {
  return useCrudOperations<MyItem>('items', shopId)
}

// 4. Page
export default function MyItemsPage({ children }) {
  const { items } = useMyItems(shopId)
  return (
    <ListDetailPage
      title="Items"
      items={items as unknown as Array<Record<string, unknown> & { id: string }>}
      searchKeys={['name']}
      renderItem={(item) => <div>{(item as unknown as MyItem).name}</div>}
      onItemClick={(item) => navigate(`/items/${item.id}`)}
      createPath="/items/new"
    >
      {children}
    </ListDetailPage>
  )
}
```

### Responsive Modal

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

export function MyModal({ open, onOpenChange, children }) {
  const isMobile = useIsMobile()
  if (isMobile) {
    return <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  }
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>{children}</DialogContent>
  </Dialog>
}
```

## 🎨 Styling

```typescript
import { cn } from '@/lib/utils'

// Merge classes
<div className={cn('base-class', condition && 'conditional-class', className)} />

// Responsive
<div className="flex flex-col md:flex-row gap-4" />

// Variants
<div className="text-sm md:text-base lg:text-lg" />
```

## 📚 Resources

- [Full Refactoring Guide](./REFACTORING_GUIDE.md)
- [Architecture Patterns](./ai-rules/02-architecture-patterns.md)
- [Component Patterns](./ai-rules/03-component-patterns.md)
- [Quick Start](./ai-rules/05-quick-start.md)

---

**Tip**: Always import from feature roots (`@/features/auth`) not internal paths
