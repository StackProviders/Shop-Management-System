# Architecture Patterns

## Feature-Based Architecture

This project follows the **bulletproof-react** pattern for scalable feature organization.

### Feature Structure

```
src/features/my-feature/
├── api/                  # API layer (optional with ReactFire)
├── components/           # Feature-specific components
├── hooks/                # Feature-specific hooks
│   ├── use-my-feature-queries.ts    # Read operations (ReactFire)
│   └── use-my-feature-mutations.ts  # Write operations (Firestore)
├── types/                # TypeScript interfaces
├── utils/                # Feature utilities
└── index.ts              # Barrel export
```

### Barrel Exports

```typescript
// src/features/my-feature/index.ts

// Hooks - Queries
export * from './hooks/use-my-feature-queries'

// Hooks - Mutations
export * from './hooks/use-my-feature-mutations'

// Components
export * from './components/my-feature-list'
export * from './components/my-feature-form'

// Types
export * from './types'

// Utils
export * from './utils'
```

## State Management Architecture

### ReactFire + Firestore (PRIMARY)

Use ReactFire for all real-time data fetching:

```typescript
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'

export function useItems(shopId: string) {
    const firestore = useFirestore()
    const q = query(
        collection(firestore, 'items'),
        where('shopId', '==', shopId)
    )

    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })

    return {
        items: (data as Item[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load') : null
    }
}
```

### Firestore Mutations

Use shared `useCrudOperations` hook:

```typescript
import { useCrudOperations } from '@/features/shared'

export function useItemMutations(shopId: string) {
    return useCrudOperations<Item>('items', shopId)
}

// Usage
const { create, update, remove } = useItemMutations(shopId)
await create({ name: 'New Item', price: 100 })
await update('item-id', { price: 150 })
await remove('item-id')
```

### Zustand (SECONDARY - UI State Only)

Use Zustand ONLY for UI state:

```typescript
import { create } from 'zustand'

interface UIState {
    isModalOpen: boolean
    openModal: () => void
    closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
    isModalOpen: false,
    openModal: () => set({ isModalOpen: true }),
    closeModal: () => set({ isModalOpen: false })
}))
```

## Component Architecture

### Component Priority

1. **Common Components** (`@/components/common/*`) - Use FIRST
    - ListDetailPage, VirtualizedList, CrudForm
2. **shadcn/ui Components** (`@/components/ui/*`) - Use SECOND
    - Button, Input, Dialog, Drawer, etc.
3. **Custom Components** (`@/components/*`) - Use when needed
4. **Create New** - Only when absolutely necessary

### Common Component Pattern

```typescript
// src/components/common/my-component/index.tsx
import { cn } from '@/lib/utils'

interface MyComponentProps<T extends Record<string, unknown>> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  className?: string
}

export function MyComponent<T extends Record<string, unknown>>({
  items,
  renderItem,
  className
}: MyComponentProps<T>) {
  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  )
}
```

## Page Architecture

### List-Detail Pattern

Use `ListDetailPage` component for all list-detail interfaces:

```typescript
// src/app/pages/my-feature/index.tsx
import { ListDetailPage } from '@/components/common'
import { useMyFeatures } from '@/features/my-feature'

export default function MyFeaturePage({ children }) {
  const { items } = useMyFeatures()

  return (
    <ListDetailPage
      title="My Feature"
      items={items}
      searchKeys={['name', 'code']}
      renderItem={(item, isSelected) => (
        <ItemCard item={item} isSelected={isSelected} />
      )}
      onItemClick={(item) => navigate(`/my-feature/${item.id}`)}
      createPath="/my-feature/new"
    >
      {children}
    </ListDetailPage>
  )
}
```

### Route Pattern

Keep routes minimal, delegate to page components:

```typescript
// src/routes/_protected/_dashboard/my-feature.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import MyFeaturePage from '@/app/pages/my-feature'

export const Route = createFileRoute('/_protected/_dashboard/my-feature')({
  component: () => <MyFeaturePage><Outlet /></MyFeaturePage>
})
```

## Form Architecture

### Form Pattern with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CrudForm } from '@/components/common'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  price: z.number().min(0, 'Price must be positive')
})

type FormData = z.infer<typeof schema>

export function MyFeatureForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', price: 0 }
  })

  const { create } = useMyFeatureMutations(shopId)

  const onSubmit = async (data: FormData) => {
    await create(data)
    onSuccess?.()
  }

  return (
    <CrudForm
      form={form}
      onSubmit={onSubmit}
      submitLabel="Create"
      onCancel={() => navigate(-1)}
    >
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
    </CrudForm>
  )
}
```

## Hook Architecture

### Query Hook Pattern

```typescript
// src/features/my-feature/hooks/use-my-feature-queries.ts
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'
import type { MyFeature } from '../types'

export function useMyFeatures(shopId: string) {
    const firestore = useFirestore()
    const q = query(
        collection(firestore, 'my-features'),
        where('shopId', '==', shopId)
    )

    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })

    return {
        features: (data as MyFeature[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load') : null
    }
}
```

### Mutation Hook Pattern

```typescript
// src/features/my-feature/hooks/use-my-feature-mutations.ts
import { useCrudOperations } from '@/features/shared'
import type { MyFeature } from '../types'

export function useMyFeatureMutations(shopId: string) {
    return useCrudOperations<MyFeature>('my-features', shopId)
}
```

## Responsive Architecture

### Mobile-First Pattern

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

### Responsive Classes

```typescript
// Mobile-first approach
<div className="flex flex-col md:flex-row gap-2 md:gap-4">
  <div className="w-full md:w-1/2">Content</div>
</div>

// Responsive text
<h1 className="text-xl md:text-2xl lg:text-3xl">Title</h1>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">Content</div>
```

## Data Flow Architecture

```
User Action
    ↓
Component Event Handler
    ↓
Mutation Hook (useCrudOperations)
    ↓
Firestore Write (with timeout)
    ↓
Toast Notification
    ↓
ReactFire Auto-Update (real-time)
    ↓
Component Re-render
```

## Error Handling Architecture

### Centralized Error Handling

```typescript
// In mutation hooks
try {
    await operation()
    toast.success('Success message')
} catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    toast.error(message)
    throw error // Re-throw for component handling
}

// In components
try {
    await mutationHook()
    // Success handling
} catch (error) {
    // Additional error handling if needed
}
```

## Performance Architecture

### Virtualization for Large Lists

```typescript
import { VirtualizedList } from '@/components/common'

<VirtualizedList
  items={items}
  renderItem={(item) => <ItemCard item={item} />}
  estimateSize={60}
  className="h-full"
/>
```

### Memoization Strategy

```typescript
// Memoize expensive computations
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

## Testing Architecture

```typescript
// Unit tests for hooks
describe('useMyFeatures', () => {
    it('fetches features', async () => {
        const { result } = renderHook(() => useMyFeatures('shop-id'))
        await waitFor(() => expect(result.current.features).toHaveLength(2))
    })
})

// Integration tests for components
describe('MyFeaturePage', () => {
    it('renders list and handles click', async () => {
        render(<MyFeaturePage />)
        await waitFor(() => screen.getByText('Item 1'))
        fireEvent.click(screen.getByText('Item 1'))
        expect(mockNavigate).toHaveBeenCalledWith('/my-feature/1')
    })
})
```

## Security Architecture

### Permission Checks

```typescript
import { hasPermission } from '@/features/shop'

// In components
if (!hasPermission(userRole, 'manage_items')) {
    return <AccessDenied />
}

// In hooks
const canDelete = hasPermission(userRole, 'delete_items')
```

### Input Validation

```typescript
// Always use Zod schemas
const schema = z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    amount: z.number().min(0).max(1000000)
})
```

## Scalability Patterns

### Feature Isolation

- Each feature is self-contained
- No cross-feature imports (use shared/)
- Clear boundaries and responsibilities

### Code Splitting

```typescript
// Lazy load heavy features
const ItemsPage = lazy(() => import('./pages/items'))
const PartiesPage = lazy(() => import('./pages/parties'))

// Use Suspense boundaries
<Suspense fallback={<LoadingScreen />}>
    <Routes />
</Suspense>
```

### Bundle Optimization

```typescript
// Dynamic imports for heavy libraries
const loadPDF = () => import('pdfmake')
const loadExcel = () => import('xlsx')

// Use only when needed
const handleExport = async () => {
    const { default: XLSX } = await loadExcel()
    // Use XLSX
}
```
