# State Management & Firestore Integration Guide

## Architecture Overview

This application uses a **query-based architecture** with **optimistic updates** for optimal performance and user experience.

### Key Components

1. **Firestore Utilities** (`@/features/shared/utils/firestore.ts`)
2. **Entity Store Generator** (`@/features/shared/hooks/use-entity-store.ts`)
3. **Query-based API Layer** (per feature)
4. **Zustand Stores** (per feature)
5. **Real-time Hooks** (per feature)
6. **Action Hooks with Optimistic Updates** (per feature)

## Creating a New Feature with State Management

### Step 1: Define Types

```typescript
// src/features/my-feature/types/index.ts
export interface MyEntity {
    id: string
    name: string
    description?: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateMyEntityData {
    name: string
    description?: string
}

export interface UpdateMyEntityData {
    name?: string
    description?: string
}
```

### Step 2: Create Query-Based API

```typescript
// src/features/my-feature/api/my-entity.api.ts
import { collection, query, orderBy, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { createFirestoreApi } from '@/features/shared'
import { MyEntity, CreateMyEntityData, UpdateMyEntityData } from '../types'

const COLLECTION = 'my-entities'
const baseApi = createFirestoreApi<MyEntity>(COLLECTION)

// Define queries for different use cases
export const myEntityQueries = {
    all: () => query(collection(db, COLLECTION), orderBy('createdAt', 'desc')),

    byShop: (shopId: string) =>
        query(
            collection(db, COLLECTION),
            where('shopId', '==', shopId),
            orderBy('createdAt', 'desc')
        ),

    active: () =>
        query(
            collection(db, COLLECTION),
            where('status', '==', 'active'),
            orderBy('createdAt', 'desc')
        )
}

export const myEntityApi = {
    subscribe: baseApi.subscribe,

    create: async (data: CreateMyEntityData) => {
        return baseApi.create(
            data as Omit<MyEntity, 'id' | 'createdAt' | 'updatedAt'>
        )
    },

    update: async (id: string, data: UpdateMyEntityData) => {
        return baseApi.update(id, data)
    },

    delete: async (id: string) => {
        return baseApi.delete(id)
    }
}
```

### Step 3: Create Zustand Store

```typescript
// src/features/my-feature/hooks/use-my-entity-store.ts
import { createEntityStore } from '@/features/shared'
import { MyEntity } from '../types'

export const useMyEntityStore = createEntityStore<MyEntity>()
```

### Step 4: Create Real-time Hook

```typescript
// src/features/my-feature/hooks/use-my-entities.ts
import { useEffect } from 'react'
import { myEntityApi, myEntityQueries } from '../api/my-entity.api'
import { useMyEntityStore } from './use-my-entity-store'

export function useMyEntities(shopId?: string) {
    const { items, isLoading, error, setItems, setLoading, setError } =
        useMyEntityStore()

    useEffect(() => {
        setLoading(true)

        const q = shopId
            ? myEntityQueries.byShop(shopId)
            : myEntityQueries.all()

        const unsubscribe = myEntityApi.subscribe(
            q,
            (data) => {
                setItems(data)
                setLoading(false)
                setError(null)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [shopId])

    return {
        entities: items,
        isLoading,
        error
    }
}
```

### Step 5: Create Actions Hook with Optimistic Updates

```typescript
// src/features/my-feature/hooks/use-my-entity-actions.ts
import { useState } from 'react'
import { toast } from 'sonner'
import { myEntityApi } from '../api/my-entity.api'
import { useMyEntityStore } from './use-my-entity-store'
import { CreateMyEntityData, UpdateMyEntityData, MyEntity } from '../types'

export function useMyEntityActions() {
    const [loading, setLoading] = useState(false)
    const { addItemOptimistic, updateItemOptimistic, deleteItemOptimistic } =
        useMyEntityStore()

    const createEntity = async (data: CreateMyEntityData) => {
        const tempId = `temp-${Date.now()}`
        const optimisticEntity: MyEntity = {
            id: tempId,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        setLoading(true)
        addItemOptimistic(optimisticEntity)
        const toastId = toast.loading('Creating...')

        try {
            await myEntityApi.create(data)
            toast.success('Created successfully', { id: toastId })
        } catch (error) {
            deleteItemOptimistic(tempId)
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            toast.error(message, { id: toastId })
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateEntity = async (id: string, data: UpdateMyEntityData) => {
        const toastId = toast.loading('Updating...')
        updateItemOptimistic(id, data)

        try {
            await myEntityApi.update(id, data)
            toast.success('Updated successfully', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    const deleteEntity = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        deleteItemOptimistic(id)

        try {
            await myEntityApi.delete(id)
            toast.success('Deleted successfully', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    return {
        createEntity,
        updateEntity,
        deleteEntity,
        loading
    }
}
```

## Benefits of This Architecture

### 1. Optimistic Updates

- Instant UI feedback before Firestore confirms
- Automatic rollback on errors
- Better perceived performance

### 2. Real-time Synchronization

- Automatic updates across all clients
- No manual refresh needed
- Always up-to-date data

### 3. Centralized State

- Single source of truth with Zustand
- Minimal re-renders
- Easy to debug

### 4. Query-Based API

- Flexible data fetching
- Reusable queries
- Better developer experience

### 5. Type Safety

- Full TypeScript coverage
- Compile-time error checking
- Better IDE support

### 6. Scalability

- Reusable utilities
- Consistent patterns
- Easy to extend

## Advanced Patterns

### Filtered Queries

```typescript
export const myEntityQueries = {
    byStatus: (status: string) =>
        query(
            collection(db, COLLECTION),
            where('status', '==', status),
            orderBy('createdAt', 'desc')
        ),

    byDateRange: (startDate: Date, endDate: Date) =>
        query(
            collection(db, COLLECTION),
            where('createdAt', '>=', startDate),
            where('createdAt', '<=', endDate),
            orderBy('createdAt', 'desc')
        )
}
```

### Pagination

```typescript
export const myEntityQueries = {
    paginated: (limit: number, startAfter?: DocumentSnapshot) => {
        const q = query(
            collection(db, COLLECTION),
            orderBy('createdAt', 'desc'),
            limit(limit)
        )
        return startAfter ? query(q, startAfter(startAfter)) : q
    }
}
```

### Search

```typescript
export const myEntityQueries = {
    search: (searchTerm: string) =>
        query(
            collection(db, COLLECTION),
            where('name', '>=', searchTerm),
            where('name', '<=', searchTerm + '\uf8ff'),
            orderBy('name', 'asc')
        )
}
```

## Best Practices

1. **Always use queries** - Define queries in the API layer, not in hooks
2. **Optimistic updates** - Always implement for better UX
3. **Error handling** - Always rollback optimistic updates on errors
4. **Loading states** - Use toast notifications for user feedback
5. **Type safety** - Never use `any`, always define proper types
6. **Cleanup** - Always return unsubscribe function from useEffect
7. **Dependencies** - Include all dependencies in useEffect array

## Migration Guide

### Old Pattern (SWR-based)

```typescript
// ❌ OLD - Don't use this anymore
import useSWR from 'swr'

export function useMyEntities() {
    const { data, error, isLoading } = useSWR('/entities', fetcher)
    return { entities: data ?? [], error, isLoading }
}
```

### New Pattern (Query-based with Zustand)

```typescript
// ✅ NEW - Use this pattern
import { useEffect } from 'react'
import { myEntityApi, myEntityQueries } from '../api/my-entity.api'
import { useMyEntityStore } from './use-my-entity-store'

export function useMyEntities() {
    const { items, isLoading, error, setItems, setLoading, setError } =
        useMyEntityStore()

    useEffect(() => {
        setLoading(true)
        const unsubscribe = myEntityApi.subscribe(
            myEntityQueries.all(),
            (data) => {
                setItems(data)
                setLoading(false)
                setError(null)
            },
            (err) => {
                setError(err.message)
                setLoading(false)
            }
        )
        return () => unsubscribe()
    }, [])

    return { entities: items, isLoading, error }
}
```

## Naming Conventions

- **API file**: `my-entity.api.ts` (singular)
- **Queries export**: `myEntityQueries` (camelCase, plural)
- **API export**: `myEntityApi` (camelCase, singular)
- **Store hook**: `useMyEntityStore` (singular)
- **Data hook**: `useMyEntities` (plural)
- **Actions hook**: `useMyEntityActions` (singular)
- **Collection name**: `'my-entities'` (kebab-case, plural)

## Checklist for New Features

- [ ] Types defined with proper interfaces
- [ ] Query-based API with `createFirestoreApi`
- [ ] Queries exported as `entityQueries`
- [ ] Zustand store created with `createEntityStore`
- [ ] Real-time hook with subscription
- [ ] Actions hook with optimistic updates
- [ ] Error handling with rollback
- [ ] Toast notifications for feedback
- [ ] Proper cleanup in useEffect
- [ ] Full TypeScript coverage
