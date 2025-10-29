# Quick Start - ReactFire Architecture

## Creating a New Feature

### 1. Define Types

```typescript
// features/my-feature/types/index.ts
export interface MyEntity {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateMyEntityData {
    name: string
}

export interface UpdateMyEntityData {
    name?: string
}
```

### 2. Create Query Hook (Read)

```typescript
// features/my-feature/hooks/use-my-entity-queries.ts
import { collection, query, doc } from 'firebase/firestore'
import {
    useFirestore,
    useFirestoreCollectionData,
    useFirestoreDocData
} from 'reactfire'
import { MyEntity } from '../types'

export function useMyEntities() {
    const firestore = useFirestore()
    const entitiesQuery = query(collection(firestore, 'my-entities'))

    const { status, data } = useFirestoreCollectionData(entitiesQuery, {
        idField: 'id'
    })

    return {
        entities: (data as MyEntity[]) ?? [],
        isLoading: status === 'loading'
    }
}

export function useMyEntityById(id: string) {
    const firestore = useFirestore()
    const entityRef = doc(firestore, 'my-entities', id)

    const { status, data } = useFirestoreDocData(entityRef, { idField: 'id' })

    return {
        entity: data as MyEntity | undefined,
        isLoading: status === 'loading'
    }
}
```

### 3. Create Mutation Hook (Write)

```typescript
// features/my-feature/hooks/use-my-entity-mutations.ts
import {
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'
import { CreateMyEntityData, UpdateMyEntityData } from '../types'

export function useMyEntityMutations() {
    const firestore = useFirestore()

    const createEntity = async (data: CreateMyEntityData) => {
        const toastId = toast.loading('Creating...')
        try {
            const newDocRef = doc(collection(firestore, 'my-entities'))
            await setDoc(newDocRef, {
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

    const updateEntity = async (id: string, data: UpdateMyEntityData) => {
        await updateDoc(doc(firestore, 'my-entities', id), {
            ...data,
            updatedAt: Timestamp.now()
        })
    }

    const deleteEntity = async (id: string) => {
        await deleteDoc(doc(firestore, 'my-entities', id))
    }

    return { createEntity, updateEntity, deleteEntity }
}
```

### 4. Export from Feature

```typescript
// features/my-feature/index.ts
export * from './hooks/use-my-entity-queries'
export * from './hooks/use-my-entity-mutations'
export * from './types'
```

### 5. Use in Component

```typescript
// app/routes/my-feature.tsx
import { useMyEntities, useMyEntityMutations } from '@/features/my-feature'
import { SuspenseWithPerf } from 'reactfire'
import { Skeleton } from '@/components/ui/skeleton'

function MyFeatureContent() {
    const { entities } = useMyEntities()
    const { createEntity } = useMyEntityMutations()

    return (
        <div>
            {entities.map(entity => (
                <div key={entity.id}>{entity.name}</div>
            ))}
        </div>
    )
}

export default function MyFeaturePage() {
    return (
        <SuspenseWithPerf fallback={<Skeleton />} traceId="my-feature">
            <MyFeatureContent />
        </SuspenseWithPerf>
    )
}
```

## Key Patterns

### Query Hooks (Read)

- Use `useFirestoreCollectionData` for collections
- Use `useFirestoreDocData` for single documents
- Always specify `{ idField: 'id' }`
- Return typed data with `isLoading` state

### Mutation Hooks (Write)

- Use Firestore SDK directly (`setDoc`, `updateDoc`, `deleteDoc`)
- Add toast notifications for user feedback
- Return async functions
- Handle errors gracefully

### Suspense

- Always wrap ReactFire hooks with `<SuspenseWithPerf>`
- Provide meaningful `traceId` for performance monitoring
- Use skeleton loaders as fallback

## Common Queries

### Filter by Field

```typescript
const entitiesQuery = query(
    collection(firestore, 'entities'),
    where('shopId', '==', shopId)
)
```

### Order Results

```typescript
const entitiesQuery = query(
    collection(firestore, 'entities'),
    orderBy('createdAt', 'desc')
)
```

### Limit Results

```typescript
const entitiesQuery = query(collection(firestore, 'entities'), limit(10))
```

### Multiple Conditions

```typescript
const entitiesQuery = query(
    collection(firestore, 'entities'),
    where('shopId', '==', shopId),
    where('status', '==', 'active'),
    orderBy('createdAt', 'desc')
)
```

## Checklist

- [ ] Types defined
- [ ] Query hook created
- [ ] Mutation hook created
- [ ] Exported from feature index
- [ ] Component wrapped with Suspense
- [ ] Toast notifications added
- [ ] Error handling implemented
- [ ] TypeScript types used throughout
