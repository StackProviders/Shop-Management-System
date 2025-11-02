# Shop Management System - Project Rules

## Package Manager

- **ALWAYS use `pnpm`** for all package management operations
- Never use npm, yarn, or other package managers
- Commands: `pnpm install`, `pnpm add`, `pnpm remove`, `pnpm tauri dev`

## Project Architecture

### Feature-Based Structure (Bulletproof React Pattern)

```
src/features/feature-name/
├── api/              # API layer (optional, use hooks directly with ReactFire)
├── components/       # Feature-specific components
├── hooks/           # Feature-specific hooks (queries + mutations)
├── types/           # TypeScript interfaces
├── validations/     # Zod schemas (optional)
└── index.ts         # Barrel export
```

### Import Patterns

```typescript
// ✅ CORRECT - Import from feature root
import { useItems, useItemActions } from '@/features/items'
import { usePartiesByShop, usePartyMutations } from '@/features/parties'
import { useShopContext } from '@/features/shop'

// ❌ WRONG - Don't import from internal paths
import { useItems } from '@/features/items/hooks/use-items'
```

## State Management Architecture

### ReactFire + Firestore (PRIMARY)

**Use ReactFire hooks for all real-time data:**

```typescript
import {
    useFirestore,
    useFirestoreCollectionData,
    useFirestoreDocData
} from 'reactfire'
import { collection, query, where, doc } from 'firebase/firestore'

// Collection query
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
        error: status === 'error'
    }
}

// Document query
export function useItem(id: string) {
    const firestore = useFirestore()
    const itemRef = doc(firestore, 'items', id)

    const { status, data } = useFirestoreDocData(itemRef, { idField: 'id' })

    return {
        item: data as Item | undefined,
        isLoading: status === 'loading'
    }
}
```

### Mutations with Firestore Utils

**Use firestore-utils for all write operations:**

```typescript
import { collection, doc, Timestamp } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'
import {
    setDocWithTimeout,
    updateDocWithTimeout,
    deleteDocWithTimeout
} from '@/lib/firestore-utils'

export function useItemMutations(shopId: string) {
    const firestore = useFirestore()

    const createItem = async (data: CreateItemData) => {
        const toastId = toast.loading('Creating...')
        try {
            const newDocRef = doc(collection(firestore, 'items'))
            await setDocWithTimeout(newDocRef, {
                ...data,
                shopId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })
            toast.success('Created successfully', { id: toastId })
            return newDocRef.id
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed', {
                id: toastId
            })
            throw error
        }
    }

    const updateItem = async (id: string, data: Partial<CreateItemData>) => {
        const toastId = toast.loading('Updating...')
        try {
            await updateDocWithTimeout(doc(firestore, 'items', id), {
                ...data,
                updatedAt: Timestamp.now()
            })
            toast.success('Updated successfully', { id: toastId })
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed', {
                id: toastId
            })
            throw error
        }
    }

    const deleteItem = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            await deleteDocWithTimeout(doc(firestore, 'items', id))
            toast.success('Deleted successfully', { id: toastId })
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed', {
                id: toastId
            })
            throw error
        }
    }

    return { createItem, updateItem, deleteItem }
}
```

### Zustand (SECONDARY - Only for UI State)

**Use Zustand ONLY for:**

- UI state (modals, drawers, filters)
- Non-persistent app state
- Cross-component communication

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

## Feature Development Pattern

### Step 1: Define Types

```typescript
// src/features/my-feature/types/index.ts
export interface MyEntity {
    id: string
    shopId: string
    name: string
    status: 'active' | 'inactive'
    createdAt: Date | Timestamp
    updatedAt: Date | Timestamp
}

export interface CreateMyEntityData {
    name: string
    status?: 'active' | 'inactive'
}

export interface UpdateMyEntityData {
    name?: string
    status?: 'active' | 'inactive'
}
```

### Step 2: Create Query Hook

```typescript
// src/features/my-feature/hooks/use-my-entity-queries.ts
import { collection, query, where, doc } from 'firebase/firestore'
import {
    useFirestore,
    useFirestoreCollectionData,
    useFirestoreDocData
} from 'reactfire'
import { MyEntity } from '../types'

export function useMyEntities(shopId: string) {
    const firestore = useFirestore()
    const q = query(
        collection(firestore, 'my-entities'),
        where('shopId', '==', shopId)
    )

    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })

    return {
        entities: (data as MyEntity[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load') : null
    }
}

export function useMyEntity(id: string) {
    const firestore = useFirestore()
    const entityRef = doc(firestore, 'my-entities', id)

    const { status, data } = useFirestoreDocData(entityRef, { idField: 'id' })

    return {
        entity: data as MyEntity | undefined,
        isLoading: status === 'loading'
    }
}
```

### Step 3: Create Mutation Hook

```typescript
// src/features/my-feature/hooks/use-my-entity-mutations.ts
import { collection, doc, Timestamp } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'
import {
    setDocWithTimeout,
    updateDocWithTimeout,
    deleteDocWithTimeout
} from '@/lib/firestore-utils'
import { CreateMyEntityData, UpdateMyEntityData } from '../types'

export function useMyEntityMutations(shopId: string) {
    const firestore = useFirestore()

    const createEntity = async (data: CreateMyEntityData) => {
        const toastId = toast.loading('Creating...')
        try {
            const newDocRef = doc(collection(firestore, 'my-entities'))
            await setDocWithTimeout(newDocRef, {
                ...data,
                shopId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })
            toast.success('Created successfully', { id: toastId })
            return newDocRef.id
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed', {
                id: toastId
            })
            throw error
        }
    }

    const updateEntity = async (id: string, data: UpdateMyEntityData) => {
        const toastId = toast.loading('Updating...')
        try {
            await updateDocWithTimeout(doc(firestore, 'my-entities', id), {
                ...data,
                updatedAt: Timestamp.now()
            })
            toast.success('Updated successfully', { id: toastId })
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed', {
                id: toastId
            })
            throw error
        }
    }

    const deleteEntity = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        try {
            await deleteDocWithTimeout(doc(firestore, 'my-entities', id))
            toast.success('Deleted successfully', { id: toastId })
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed', {
                id: toastId
            })
            throw error
        }
    }

    return { createEntity, updateEntity, deleteEntity }
}
```

### Step 4: Create Components

```typescript
// src/features/my-feature/components/my-entity-list.tsx
import { useMyEntities } from '../hooks/use-my-entity-queries'
import { Skeleton } from '@/components/ui/skeleton'
import { Empty } from '@/components/ui/empty'

export function MyEntityList({ shopId }: { shopId: string }) {
    const { entities, isLoading, error } = useMyEntities(shopId)

    if (isLoading) {
        return <Skeleton className="h-20 w-full" />
    }

    if (error) {
        return <div className="text-destructive">Error loading data</div>
    }

    if (entities.length === 0) {
        return <Empty title="No items found" />
    }

    return (
        <div className="space-y-2">
            {entities.map((entity) => (
                <div key={entity.id}>{entity.name}</div>
            ))}
        </div>
    )
}
```

### Step 5: Create Barrel Export

```typescript
// src/features/my-feature/index.ts
export * from './hooks/use-my-entity-queries'
export * from './hooks/use-my-entity-mutations'
export * from './components/my-entity-list'
export * from './types'
```

## UI/UX Guidelines

### Responsive Design (CRITICAL)

**ALWAYS design for both desktop and mobile:**

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function ResponsiveModal({ open, onOpenChange, children }) {
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

### Component Priority

1. **shadcn/ui components** (`@/components/ui/*`) - ALWAYS use first
2. **Custom shared components** (`@/components/*`) - Use when needed
3. **Feature components** (`@/features/*/components/*`) - Feature-specific
4. **Create new** - Only when absolutely necessary

### Available shadcn/ui Components

**Layout**: Card, Sheet, Dialog, Drawer, Tabs, Accordion, Separator, Sidebar, ListDetailLayout

**Forms**: Input, Button, Select, Checkbox, Label, Form, PhoneInput, InputOTP, Textarea, RadioGroup, Switch, Slider

**Navigation**: DropdownMenu, Command, Popover

**Feedback**: Alert, AlertDialog, Spinner, Skeleton, Sonner (toast), Progress

**Data Display**: Table, DataTable, DataGrid, Pagination, Avatar, Badge, Typography, Empty

**Utility**: Tooltip, ScrollArea, AspectRatio, Calendar, Cropper

### List Detail Layout System

**Use for all master-detail interfaces:**

```typescript
import {
    ListDetailRoot,
    ListDetailHeader,
    ListDetailBody,
    ListDetailList,
    ListDetailListHeader,
    ListDetailListContent,
    ListDetailContent
} from '@/components/ui/list-detail-layout'

function MyListPage() {
    const { pathname } = useLocation()
    const { id } = useParams()

    const isRouteActive = useMemo(
        () => !!id || pathname.includes('/new') || pathname.includes('/edit'),
        [id, pathname]
    )

    return (
        <ListDetailRoot>
            <ListDetailHeader isRouteActive={isRouteActive}>
                {/* Header content */}
            </ListDetailHeader>

            <ListDetailBody>
                <ListDetailList isRouteActive={isRouteActive}>
                    <ListDetailListHeader>
                        <SearchInput />
                    </ListDetailListHeader>
                    <ListDetailListContent>
                        {/* List items */}
                    </ListDetailListContent>
                </ListDetailList>

                <ListDetailContent isRouteActive={isRouteActive}>
                    <Outlet />
                </ListDetailContent>
            </ListDetailBody>
        </ListDetailRoot>
    )
}
```

## Code Style & Best Practices

### TypeScript

```typescript
// ✅ CORRECT - Proper types
interface CreateItemData {
    name: string
    price: number
    description?: string
}

function createItem(data: CreateItemData): Promise<string> {
    // ...
}

// ❌ WRONG - Using any
function createItem(data: any) {
    // ...
}
```

### React Patterns

```typescript
// ✅ CORRECT - Hooks for logic, components for UI
function useItemForm() {
    const { createItem } = useItemMutations(shopId)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (data: CreateItemData) => {
        setLoading(true)
        try {
            await createItem(data)
        } finally {
            setLoading(false)
        }
    }

    return { handleSubmit, loading }
}

function ItemForm() {
    const { handleSubmit, loading } = useItemForm()
    return <form onSubmit={handleSubmit}>...</form>
}
```

### Styling with Tailwind

```typescript
import { cn } from '@/lib/utils'

// ✅ CORRECT - Use cn() for class merging
<div className={cn(
    "base-classes",
    "md:desktop-classes",
    condition && "conditional-classes",
    className
)}>

// ❌ WRONG - String concatenation
<div className={"base " + (condition ? "active" : "")}>
```

## Forms

### React Hook Form + Zod

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const schema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email')
})

type FormData = z.infer<typeof schema>

function MyForm() {
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { name: '', email: '' }
    })

    const onSubmit = async (data: FormData) => {
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

## Error Handling

```typescript
import { toast } from 'sonner'

// ✅ CORRECT - Always use toast for user feedback
try {
    await createItem(data)
    toast.success('Item created successfully')
} catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    toast.error(message)
}

// ✅ CORRECT - Loading toast pattern
const toastId = toast.loading('Creating item...')
try {
    await createItem(data)
    toast.success('Item created', { id: toastId })
} catch (error) {
    toast.error('Failed to create', { id: toastId })
}
```

## Performance Optimization

### Memoization

```typescript
// Memoize expensive calculations
const filteredItems = useMemo(() => {
    return items.filter((item) => item.name.includes(search))
}, [items, search])

// Memoize callbacks
const handleClick = useCallback(
    (id: string) => {
        navigate(`/items/${id}`)
    },
    [navigate]
)

// Memoize components
const MemoizedItem = React.memo(ItemCard)
```

### Code Splitting

```typescript
// Lazy load routes
const ItemsPage = lazy(() => import('./routes/items'))

// Use Suspense
<Suspense fallback={<Skeleton />}>
    <ItemsPage />
</Suspense>
```

## File Naming Conventions

- **Components**: PascalCase (`ItemForm.tsx`, `PartyList.tsx`)
- **Hooks**: camelCase with `use` prefix (`use-items.ts`, `use-party-mutations.ts`)
- **Utils**: kebab-case (`format-date.ts`, `validation.ts`)
- **Types**: kebab-case (`index.ts`, `settings.ts`)
- **API**: kebab-case (`items.api.ts`, `shop.api.ts`)

## Security Best Practices

```typescript
// ✅ CORRECT - Check permissions
import { hasPermission } from '@/features/shop'

if (!hasPermission(userRole, 'manage_items')) {
    toast.error('You do not have permission')
    return
}

// ✅ CORRECT - Validate inputs
const schema = z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/)
})

// ✅ CORRECT - Never expose secrets
// Use environment variables
const apiKey = import.meta.env.VITE_API_KEY
```

## Testing

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ItemList } from './item-list'

describe('ItemList', () => {
    it('renders items when loaded', async () => {
        render(<ItemList shopId="test-shop" />)

        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument()
        })
    })
})
```

## Feature Development Checklist

- [ ] Types defined in `types/index.ts`
- [ ] Query hooks in `hooks/use-*-queries.ts`
- [ ] Mutation hooks in `hooks/use-*-mutations.ts`
- [ ] Components with loading/error/empty states
- [ ] Responsive design (mobile & desktop)
- [ ] Form validation with Zod
- [ ] Error handling with toast
- [ ] Barrel export in `index.ts`
- [ ] Route created and added to router
- [ ] TypeScript with no `any` types
- [ ] Suspense boundaries for async components

## Common Patterns

### Sorting with Timestamp

```typescript
const sortedItems = (data ?? []).sort((a, b) => {
    const aTime =
        a.createdAt instanceof Date
            ? a.createdAt.getTime()
            : (a.createdAt as Timestamp).toMillis()
    const bTime =
        b.createdAt instanceof Date
            ? b.createdAt.getTime()
            : (b.createdAt as Timestamp).toMillis()
    return bTime - aTime
})
```

### Conditional Queries

```typescript
export function useItems(shopId: string, type?: ItemType) {
    const firestore = useFirestore()

    const q = type
        ? query(
              collection(firestore, 'items'),
              where('shopId', '==', shopId),
              where('type', '==', type)
          )
        : query(collection(firestore, 'items'), where('shopId', '==', shopId))

    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })

    return {
        items: (data as Item[]) ?? [],
        isLoading: status === 'loading'
    }
}
```

### Draft State (Local Storage)

```typescript
export function useDraftItem(itemId?: string) {
    const { currentShop } = useShopContext()
    const draftKey = `draft-item-${currentShop?.shopId || 'temp'}-${itemId || 'new'}`

    const [draftData, setDraftData] = useState<Partial<ItemFormData>>()

    useEffect(() => {
        const saved = localStorage.getItem(draftKey)
        if (saved) {
            try {
                setDraftData(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to load draft:', e)
            }
        }
    }, [draftKey])

    const saveDraft = (data: Partial<ItemFormData>) => {
        setDraftData(data)
        localStorage.setItem(draftKey, JSON.stringify(data))
    }

    const clearDraft = () => {
        localStorage.removeItem(draftKey)
        setDraftData(undefined)
    }

    return { draftData, saveDraft, clearDraft }
}
```

## Migration from Old Patterns

### Old: SWR + Custom API

```typescript
// ❌ OLD - Don't use
import useSWR from 'swr'
export function useItems() {
    const { data, error } = useSWR('/api/items', fetcher)
    return { items: data ?? [], error }
}
```

### New: ReactFire

```typescript
// ✅ NEW - Use this
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
export function useItems(shopId: string) {
    const firestore = useFirestore()
    const q = query(
        collection(firestore, 'items'),
        where('shopId', '==', shopId)
    )
    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })
    return {
        items: (data as Item[]) ?? [],
        isLoading: status === 'loading'
    }
}
```

## Documentation References

- **Scaling Guide**: `.amazonq/rules/SCALING_GUIDE.md` - Quick feature creation
- **Component Patterns**: `.amazonq/rules/component-patterns.md`
- **Data Display**: `.amazonq/rules/data-display-patterns.md`
- **Feature Guide**: `.amazonq/rules/feature-guide.md`
- **Quick Start**: `.amazonq/rules/quick-start.md`
- **ReactFire Guide**: `.amazonq/rules/reactfire-guide.md`
