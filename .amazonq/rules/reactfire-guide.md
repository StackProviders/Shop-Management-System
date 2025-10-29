# ReactFire Integration Guide

## Overview

ReactFire provides React hooks for Firebase, enabling real-time data synchronization with Suspense support.

## Setup

### 1. App Initialization

```typescript
// main.tsx
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from '@/lib/firebase'

ReactDOM.createRoot(document.getElementById('root')).render(
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
        <App />
    </FirebaseAppProvider>
)
```

### 2. Firestore Provider

```typescript
// app/index.tsx
import { FirestoreProvider, useInitFirestore, SuspenseWithPerf } from 'reactfire'
import { initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore'

function FirestoreWrapper() {
    const { data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
        const db = initializeFirestore(firebaseApp, {})
        await enableIndexedDbPersistence(db)
        return db
    })

    return (
        <FirestoreProvider sdk={firestoreInstance}>
            <AppContent />
        </FirestoreProvider>
    )
}

export default function App() {
    return (
        <SuspenseWithPerf fallback={<LoadingSpinner />} traceId="app-init">
            <FirestoreWrapper />
        </SuspenseWithPerf>
    )
}
```

## Data Fetching Patterns

### Collection Data (Real-time)

```typescript
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

export function useParties(shopId: string) {
    const firestore = useFirestore()
    const partiesQuery = query(
        collection(firestore, 'parties'),
        where('shopId', '==', shopId)
    )

    const { status, data: parties } = useFirestoreCollectionData(partiesQuery, {
        idField: 'id'
    })

    return {
        parties: (parties as Party[]) ?? [],
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load') : null
    }
}
```

### Document Data (Real-time)

```typescript
import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'

export function useParty(id: string) {
    const firestore = useFirestore()
    const partyRef = doc(firestore, 'parties', id)

    const { status, data: party } = useFirestoreDocData(partyRef, {
        idField: 'id'
    })

    return {
        party: party as Party,
        isLoading: status === 'loading'
    }
}
```

### One-time Fetch

```typescript
import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocDataOnce } from 'reactfire'

export function usePartyOnce(id: string) {
    const firestore = useFirestore()
    const partyRef = doc(firestore, 'parties', id)

    const { data: party } = useFirestoreDocDataOnce(partyRef, {
        idField: 'id'
    })

    return party as Party
}
```

## CRUD Operations

### Create

```typescript
import { collection, doc, setDoc, Timestamp } from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'

export function usePartyActions(shopId: string) {
    const firestore = useFirestore()

    const createParty = async (data: CreatePartyData) => {
        const toastId = toast.loading('Creating...')

        try {
            const newDocRef = doc(collection(firestore, 'parties'))
            await setDoc(newDocRef, {
                ...data,
                shopId,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })

            toast.success('Created successfully', { id: toastId })
            return newDocRef.id
        } catch (error) {
            toast.error('Failed to create', { id: toastId })
            throw error
        }
    }

    return { createParty }
}
```

### Update

```typescript
import { doc, updateDoc, Timestamp } from 'firebase/firestore'

const updateParty = async (id: string, data: UpdatePartyData) => {
    const toastId = toast.loading('Updating...')

    try {
        await updateDoc(doc(firestore, 'parties', id), {
            ...data,
            updatedAt: Timestamp.now()
        })

        toast.success('Updated successfully', { id: toastId })
    } catch (error) {
        toast.error('Failed to update', { id: toastId })
        throw error
    }
}
```

### Delete

```typescript
import { doc, deleteDoc } from 'firebase/firestore'

const deleteParty = async (id: string) => {
    const toastId = toast.loading('Deleting...')

    try {
        await deleteDoc(doc(firestore, 'parties', id))
        toast.success('Deleted successfully', { id: toastId })
    } catch (error) {
        toast.error('Failed to delete', { id: toastId })
        throw error
    }
}
```

## Suspense Integration

### Page-Level Suspense

```typescript
import { SuspenseWithPerf } from 'reactfire'

export default function PartiesPage() {
    return (
        <SuspenseWithPerf fallback={<LoadingSkeleton />} traceId="parties-page">
            <PartiesContent />
        </SuspenseWithPerf>
    )
}
```

### Component-Level Suspense

```typescript
function PartyDetails({ id }: { id: string }) {
    return (
        <SuspenseWithPerf fallback={<Skeleton />} traceId="party-details">
            <PartyDetailsContent id={id} />
        </SuspenseWithPerf>
    )
}
```

## Advanced Patterns

### Conditional Queries

```typescript
export function useParties(shopId: string, type?: 'customer' | 'supplier') {
    const firestore = useFirestore()

    const partiesQuery = type
        ? query(
              collection(firestore, 'parties'),
              where('shopId', '==', shopId),
              where('type', '==', type)
          )
        : query(collection(firestore, 'parties'), where('shopId', '==', shopId))

    const { data: parties } = useFirestoreCollectionData(partiesQuery, {
        idField: 'id'
    })

    return parties as Party[]
}
```

### Pagination

```typescript
import { query, orderBy, limit, startAfter } from 'firebase/firestore'

export function usePartiesPaginated(
    shopId: string,
    pageSize: number,
    lastDoc?: any
) {
    const firestore = useFirestore()

    const partiesQuery = lastDoc
        ? query(
              collection(firestore, 'parties'),
              where('shopId', '==', shopId),
              orderBy('createdAt', 'desc'),
              startAfter(lastDoc),
              limit(pageSize)
          )
        : query(
              collection(firestore, 'parties'),
              where('shopId', '==', shopId),
              orderBy('createdAt', 'desc'),
              limit(pageSize)
          )

    const { data: parties } = useFirestoreCollectionData(partiesQuery, {
        idField: 'id'
    })

    return parties as Party[]
}
```

## Migration from Old Pattern

### Before (Zustand + Custom API)

```typescript
// ❌ OLD
import { useEffect } from 'react'
import { partiesApi, partyQueries } from '../api/parties.api'
import { usePartyStore } from './use-party-store'

export function useParties(shopId: string) {
    const { items, isLoading, error, setItems, setLoading, setError } =
        usePartyStore()

    useEffect(() => {
        setLoading(true)
        const unsubscribe = partiesApi.subscribe(
            partyQueries.byShop(shopId),
            (data) => {
                setItems(data)
                setLoading(false)
            },
            (err) => setError(err.message)
        )
        return () => unsubscribe()
    }, [shopId])

    return { parties: items, isLoading, error }
}
```

### After (ReactFire)

```typescript
// ✅ NEW
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

export function useParties(shopId: string) {
    const firestore = useFirestore()
    const partiesQuery = query(
        collection(firestore, 'parties'),
        where('shopId', '==', shopId)
    )

    const { status, data: parties } = useFirestoreCollectionData(partiesQuery, {
        idField: 'id'
    })

    return {
        parties: (parties as Party[]) ?? [],
        isLoading: status === 'loading'
    }
}
```

## Best Practices

1. **Always use Suspense**: Wrap components using ReactFire hooks with `SuspenseWithPerf`
2. **Use traceId**: Provide meaningful traceIds for performance monitoring
3. **Handle errors**: Use ErrorBoundary for error handling
4. **Type safety**: Always cast data to proper types
5. **Optimize queries**: Use indexes for complex queries
6. **Avoid over-fetching**: Fetch only needed fields
7. **Use idField**: Always specify `idField: 'id'` for collections

## Common Pitfalls

### ❌ Don't initialize Firestore multiple times

```typescript
// Wrong
const db = getFirestore(app) // Multiple times
```

### ✅ Use ReactFire's initialization

```typescript
// Correct
const { data: firestoreInstance } = useInitFirestore(async (firebaseApp) => {
    return initializeFirestore(firebaseApp, {})
})
```

### ❌ Don't use hooks without Suspense

```typescript
// Wrong - Will cause errors
function MyComponent() {
    const { data } = useFirestoreCollectionData(query) // No Suspense wrapper
    return <div>{data}</div>
}
```

### ✅ Always wrap with Suspense

```typescript
// Correct
function MyPage() {
    return (
        <SuspenseWithPerf fallback={<Loading />} traceId="my-page">
            <MyComponent />
        </SuspenseWithPerf>
    )
}
```

## Performance Tips

1. **Use indexes**: Create Firestore indexes for complex queries
2. **Limit data**: Use `limit()` to fetch only needed documents
3. **Cache queries**: ReactFire automatically caches query results
4. **Avoid unnecessary re-renders**: Use React.memo for expensive components
5. **Use startAfter**: Implement pagination for large datasets
