# Scaling Guide - Shop Management System

## Quick Reference

### Current Architecture Pattern

**ReactFire + Firestore** for real-time data (PRIMARY)

- Query hooks: `use-*-queries.ts`
- Mutation hooks: `use-*-mutations.ts`
- No Zustand for data (only UI state)

### Feature Structure

```
src/features/feature-name/
├── hooks/
│   ├── use-feature-queries.ts    # Read operations
│   └── use-feature-mutations.ts  # Write operations
├── components/                    # UI components
├── types/                        # TypeScript types
└── index.ts                      # Barrel export
```

## Adding New Features (5 Steps)

### 1. Create Types

```typescript
// src/features/my-feature/types/index.ts
export interface MyEntity {
    id: string
    shopId: string
    name: string
    createdAt: Date | Timestamp
    updatedAt: Date | Timestamp
}

export interface CreateMyEntityData {
    name: string
}
```

### 2. Create Query Hook

```typescript
// src/features/my-feature/hooks/use-my-entity-queries.ts
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'

export function useMyEntities(shopId: string) {
    const firestore = useFirestore()
    const q = query(
        collection(firestore, 'my-entities'),
        where('shopId', '==', shopId)
    )

    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })

    return {
        entities: (data as MyEntity[]) ?? [],
        isLoading: status === 'loading'
    }
}
```

### 3. Create Mutation Hook

```typescript
// src/features/my-feature/hooks/use-my-entity-mutations.ts
import { useFirestore } from 'reactfire'
import { collection, doc, Timestamp } from 'firebase/firestore'
import { setDocWithTimeout } from '@/lib/firestore-utils'
import { toast } from 'sonner'

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
            toast.success('Created', { id: toastId })
            return newDocRef.id
        } catch (error) {
            toast.error('Failed', { id: toastId })
            throw error
        }
    }

    return { createEntity }
}
```

### 4. Create Component

```typescript
// src/features/my-feature/components/my-entity-list.tsx
import { useMyEntities } from '../hooks/use-my-entity-queries'
import { Skeleton } from '@/components/ui/skeleton'

export function MyEntityList({ shopId }: { shopId: string }) {
    const { entities, isLoading } = useMyEntities(shopId)

    if (isLoading) return <Skeleton className="h-20 w-full" />

    return (
        <div>
            {entities.map(e => <div key={e.id}>{e.name}</div>)}
        </div>
    )
}
```

### 5. Export from Feature

```typescript
// src/features/my-feature/index.ts
export * from './hooks/use-my-entity-queries'
export * from './hooks/use-my-entity-mutations'
export * from './components/my-entity-list'
export * from './types'
```

## Performance Optimization

### Memoization

```typescript
// Expensive calculations
const filtered = useMemo(
    () => items.filter((i) => i.name.includes(search)),
    [items, search]
)

// Callbacks
const handleClick = useCallback(
    (id: string) => {
        navigate(`/items/${id}`)
    },
    [navigate]
)
```

### Code Splitting

```typescript
// Lazy load routes
const ItemsPage = lazy(() => import('./routes/items'))

<Suspense fallback={<Skeleton />}>
    <ItemsPage />
</Suspense>
```

### Firestore Optimization

```typescript
// Use indexes for complex queries
const q = query(
    collection(firestore, 'items'),
    where('shopId', '==', shopId),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc')
)
// Create composite index in Firebase Console
```

## Common Patterns

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

### Sorting Timestamps

```typescript
const sorted = (data ?? []).sort((a, b) => {
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

### Draft State (Local Storage)

```typescript
export function useDraft(key: string) {
    const [draft, setDraft] = useState<any>()

    useEffect(() => {
        const saved = localStorage.getItem(key)
        if (saved) setDraft(JSON.parse(saved))
    }, [key])

    const save = (data: any) => {
        setDraft(data)
        localStorage.setItem(key, JSON.stringify(data))
    }

    const clear = () => {
        localStorage.removeItem(key)
        setDraft(undefined)
    }

    return { draft, save, clear }
}
```

## Responsive Design Checklist

- [ ] Use `useIsMobile()` hook
- [ ] Drawer for mobile, Dialog for desktop
- [ ] Tailwind responsive classes (`md:`, `lg:`)
- [ ] Test on mobile and desktop
- [ ] Mobile card view for tables

## Feature Checklist

- [ ] Types in `types/index.ts`
- [ ] Query hook in `hooks/use-*-queries.ts`
- [ ] Mutation hook in `hooks/use-*-mutations.ts`
- [ ] Components with loading states
- [ ] Barrel export in `index.ts`
- [ ] Route added to router
- [ ] Responsive design
- [ ] Error handling with toast
- [ ] TypeScript (no `any`)

## Best Practices

### DO

✅ Use ReactFire for all data fetching
✅ Use firestore-utils for all writes
✅ Separate queries and mutations
✅ Handle loading/error states
✅ Use toast for feedback
✅ Type everything with TypeScript
✅ Design for mobile and desktop
✅ Use shadcn/ui components first

### DON'T

❌ Use Zustand for data (only UI state)
❌ Use SWR (use ReactFire instead)
❌ Skip loading states
❌ Use `any` type
❌ Forget mobile design
❌ Create custom components when shadcn exists
❌ Import from internal feature paths

## Migration from Old Patterns

### Old: Zustand + Custom API

```typescript
// ❌ Don't use
const { items, setItems } = useStore()
useEffect(() => {
    api.subscribe(query, setItems)
}, [])
```

### New: ReactFire

```typescript
// ✅ Use this
const { items, isLoading } = useItems(shopId)
```

## Documentation

- **Complete Guide**: `project-rules.md`
- **ReactFire**: `reactfire-guide.md`
- **Components**: `component-patterns.md`
- **Data Display**: `data-display-patterns.md`
- **Feature Guide**: `feature-guide.md`
- **Quick Start**: `quick-start.md`
