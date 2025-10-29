# ReactFire Migration Complete

## Overview

The application has been fully migrated to use **ReactFire** hooks for all Firestore operations. This eliminates the need for Zustand stores and custom API layers, resulting in cleaner, more maintainable code.

## What Changed

### ✅ Removed

- ❌ Zustand stores (`use-party-store`, `use-todo-store`, `use-entity-store`)
- ❌ Custom Firestore API layer (`createFirestoreApi`, `firestore.ts`)
- ❌ Old hooks (`use-parties`, `use-party-actions`, `use-todos`, `use-todo-actions`)
- ❌ API directories (`features/*/api/`)

### ✅ Added

- ✅ Query hooks (`use-party-queries`, `use-todo-queries`)
- ✅ Mutation hooks (`use-party-mutations`, `use-todo-mutations`)
- ✅ ReactFire Suspense integration
- ✅ Proper Firestore initialization via `useInitFirestore`

## New Architecture

### Query Hooks (Read Operations)

```typescript
// features/parties/hooks/use-party-queries.ts
export function usePartiesByShop(shopId: string) {
    const firestore = useFirestore()
    const partiesQuery = query(
        collection(firestore, 'parties'),
        where('shopId', '==', shopId),
        orderBy('createdAt', 'desc')
    )

    const { status, data } = useFirestoreCollectionData(partiesQuery, {
        idField: 'id'
    })

    return {
        parties: (data as Party[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load') : null
    }
}

export function usePartyById(partyId: string) {
    const firestore = useFirestore()
    const partyRef = doc(firestore, 'parties', partyId)

    const { status, data } = useFirestoreDocData(partyRef, { idField: 'id' })

    return {
        party: data as Party | undefined,
        isLoading: status === 'loading'
    }
}
```

### Mutation Hooks (Write Operations)

```typescript
// features/parties/hooks/use-party-mutations.ts
export function usePartyMutations(shopId: string) {
    const firestore = useFirestore()

    const createParty = async (data: CreatePartyData) => {
        const toastId = toast.loading('Creating...')
        try {
            const newDocRef = doc(collection(firestore, 'parties'))
            await setDoc(newDocRef, {
                shopId,
                ...data,
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

    const updateParty = async (partyId: string, data: UpdatePartyData) => {
        await updateDoc(doc(firestore, 'parties', partyId), {
            ...data,
            updatedAt: Timestamp.now()
        })
    }

    const deleteParty = async (partyId: string) => {
        await deleteDoc(doc(firestore, 'parties', partyId))
    }

    return { createParty, updateParty, deleteParty }
}
```

## Usage Examples

### Before (Old Pattern)

```typescript
// ❌ OLD
import {
    useParties,
    usePartyActions,
    usePartyFormStore
} from '@/features/parties'

function PartiesPage() {
    const { parties, isLoading } = useParties(shopId)
    const { createParty, loading } = usePartyActions(shopId)
    const { isFormOpen, setFormOpen } = usePartyFormStore()

    // Manual state management, Zustand stores, etc.
}
```

### After (New Pattern)

```typescript
// ✅ NEW
import { usePartiesByShop, usePartyMutations } from '@/features/parties'
import { SuspenseWithPerf } from 'reactfire'

function PartiesContent() {
    const { parties } = usePartiesByShop(shopId)
    const { createParty } = usePartyMutations(shopId)
    const [isFormOpen, setFormOpen] = useState(false)

    // Clean, simple state management
}

export default function PartiesPage() {
    return (
        <SuspenseWithPerf fallback={<Loading />} traceId="parties">
            <PartiesContent />
        </SuspenseWithPerf>
    )
}
```

## Benefits

### 1. **Simpler Code**

- No Zustand stores to manage
- No custom API layers
- Direct Firestore operations

### 2. **Real-time by Default**

- `useFirestoreCollectionData` and `useFirestoreDocData` provide real-time updates
- Automatic re-renders on data changes

### 3. **Better Performance**

- ReactFire handles caching automatically
- Suspense integration for optimal loading states
- No manual subscription management

### 4. **Type Safety**

- Full TypeScript support
- Type inference from Firestore queries

### 5. **Developer Friendly**

- Less boilerplate
- Easier to understand
- Standard React patterns

## Migration Checklist

- [x] Removed Zustand stores
- [x] Removed custom Firestore API layer
- [x] Created query hooks for all features
- [x] Created mutation hooks for all features
- [x] Updated all components to use new hooks
- [x] Added Suspense boundaries
- [x] Removed unused files
- [x] Updated exports

## File Structure

```
features/
├── parties/
│   ├── hooks/
│   │   ├── use-party-queries.ts    # Read operations
│   │   └── use-party-mutations.ts  # Write operations
│   ├── components/
│   ├── types/
│   └── index.ts
├── todo/
│   ├── hooks/
│   │   ├── use-todo-queries.ts
│   │   └── use-todo-mutations.ts
│   ├── components/
│   ├── types/
│   └── index.ts
└── shared/
    ├── hooks/
    │   ├── use-async.ts
    │   └── use-debounce.ts
    └── utils/
        ├── format.ts
        └── validation.ts
```

## Best Practices

### 1. Always Use Suspense

```typescript
<SuspenseWithPerf fallback={<Loading />} traceId="unique-id">
    <ComponentUsingReactFire />
</SuspenseWithPerf>
```

### 2. Separate Queries and Mutations

- **Query hooks**: Read operations, return data and loading state
- **Mutation hooks**: Write operations, return functions

### 3. Handle Errors Gracefully

```typescript
const { parties, error } = usePartiesByShop(shopId)

if (error) {
    return <ErrorDisplay error={error} />
}
```

### 4. Use Proper TypeScript Types

```typescript
const { data } = useFirestoreCollectionData(query, { idField: 'id' })
return (data as Party[]) ?? []
```

## Performance Tips

1. **Use indexes**: Create Firestore indexes for complex queries
2. **Limit data**: Use `limit()` in queries
3. **Optimize queries**: Fetch only what you need
4. **Use Suspense**: Let React handle loading states

## Troubleshooting

### Issue: "Firestore has already been started"

**Solution**: Ensure Firestore is initialized only once via `useInitFirestore` in `app/index.tsx`

### Issue: Component suspends without Suspense boundary

**Solution**: Wrap component with `<SuspenseWithPerf>`

### Issue: Data not updating in real-time

**Solution**: Use `useFirestoreCollectionData` or `useFirestoreDocData`, not `useFirestoreCollectionDataOnce`

## Next Steps

To add a new feature with Firestore:

1. Create `use-[feature]-queries.ts` for read operations
2. Create `use-[feature]-mutations.ts` for write operations
3. Export from `features/[feature]/index.ts`
4. Wrap components with `SuspenseWithPerf`
5. Use the hooks in your components

## Resources

- [ReactFire Documentation](https://github.com/FirebaseExtended/reactfire)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [React Suspense](https://react.dev/reference/react/Suspense)
