# Firestore Repository Implementation

This directory contains the type-safe Firestore implementation using `firestore-repository` with full offline support.

## Structure

- `schema.ts` - Collection schema definitions
- `repositories.ts` - Repository instances
- `queries.ts` - Reusable query definitions
- `index.ts` - Barrel exports

## Features

✅ **Type-safe** - Full TypeScript support with compile-time type checking
✅ **Offline Support** - Multi-tab IndexedDB persistence enabled
✅ **Real-time Updates** - Snapshot listeners for live data
✅ **Batch Operations** - Efficient bulk operations
✅ **Query Reusability** - Predefined, reusable queries

## Usage Examples

### Basic CRUD Operations

```typescript
import { shopsRepo } from '@/lib/db'

// Create
await shopsRepo.set({
    id: crypto.randomUUID(),
    shopname: 'My Shop',
    status: ShopStatus.ACTIVE,
    created_userId: userId,
    createdAt: new Date(),
    updatedAt: new Date()
})

// Read
const shop = await shopsRepo.get({ id: shopId })

// Update
await shopsRepo.set({
    ...shop,
    shopname: 'Updated Name',
    updatedAt: new Date()
})

// Delete
await shopsRepo.delete({ id: shopId })
```

### Queries

```typescript
import { shopsRepo, getUserShopsQuery } from '@/lib/db'

// List with query
const shops = await shopMembersRepo.list(getUserShopsQuery(userId))

// Custom query
import { condition as $, query } from 'firestore-repository/query'
const activeShops = await shopsRepo.list(
    query(shopsCollection, $('status', '==', 'active'))
)
```

### Real-time Updates

```typescript
import { shopsRepo, getUserShopsQuery } from '@/lib/db'

// Listen to changes
const unsubscribe = shopMembersRepo.listOnSnapshot(
    getUserShopsQuery(userId),
    (members) => {
        console.log('Members updated:', members)
    }
)

// Cleanup
unsubscribe()
```

### Batch Operations

```typescript
import { shopsRepo } from '@/lib/db'

// Batch set
await shopsRepo.batchSet([shop1, shop2, shop3])

// Batch delete
await shopsRepo.batchDelete([{ id: 'shop1' }, { id: 'shop2' }])
```

### Transactions

```typescript
import { runTransaction } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { shopsRepo } from '@/lib/db'

await runTransaction(db, async (tx) => {
    const shop = await shopsRepo.get({ id: shopId }, { tx })

    if (shop) {
        await shopsRepo.set(
            {
                ...shop,
                status: ShopStatus.INACTIVE,
                updatedAt: new Date()
            },
            { tx }
        )
    }
})
```

### Custom Hooks

```typescript
// Use real-time hooks
import { useRealtimeShops } from '@/hooks/use-realtime-shops'

function MyComponent() {
    const { shops, loading, error } = useRealtimeShops(userId)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return <div>{shops.map(shop => ...)}</div>
}
```

## Offline Support

The app automatically syncs when online and works offline with cached data:

- **Multi-tab persistence** - Data synced across browser tabs
- **Automatic retry** - Failed operations retry when connection restored
- **Optimistic updates** - UI updates immediately, syncs in background

## Migration from Old Code

### Before (Firebase SDK)

```typescript
import { collection, getDocs, query, where } from 'firebase/firestore'

const q = query(collection(db, 'shops'), where('status', '==', 'active'))
const snapshot = await getDocs(q)
const shops = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
```

### After (firestore-repository)

```typescript
import { shopsRepo } from '@/lib/db'
import { condition as $, query } from 'firestore-repository/query'

const shops = await shopsRepo.list(
    query(shopsCollection, $('status', '==', 'active'))
)
```

## Best Practices

1. **Use predefined queries** from `queries.ts` for consistency
2. **Always handle dates** - Use `new Date()` instead of `serverTimestamp()`
3. **Use crypto.randomUUID()** for generating IDs
4. **Leverage real-time hooks** for live data in components
5. **Batch operations** when updating multiple documents
6. **Clean up subscriptions** in useEffect cleanup functions
