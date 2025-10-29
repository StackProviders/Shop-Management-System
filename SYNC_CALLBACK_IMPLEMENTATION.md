# Sync Callback Implementation

## Overview

Implemented `onPendingWritesResolved` callback in Firestore subscription to dynamically handle UI state (loading, dialog close, navigation) when sync completes.

## How It Works

### Flow Diagram

```
User submits form
    ↓
setIsSubmitting(true) → Form disabled
    ↓
createParty() → Optimistic update
    ↓
setPendingPartyId(party.id) → Store party ID
    ↓
Firestore write → hasPendingWrites = true
    ↓
"Syncing..." indicator appears
    ↓
Server acknowledges write
    ↓
hasPendingWrites: true → false (transition detected)
    ↓
onPendingWritesResolved() callback fires
    ↓
setIsFormOpen(false) → Dialog closes
setIsSubmitting(false) → Form enabled
navigate(`/parties/${pendingPartyId}`) → Navigate to party
setPendingPartyId(null) → Clear pending ID
```

## Implementation Details

### 1. Firestore Utility

```typescript
subscribe: (
    q: Query<DocumentData>,
    onData: (data: T[], hasPendingWrites: boolean) => void,
    onError?: (error: Error) => void,
    onPendingWritesResolved?: () => void // NEW CALLBACK
) => {
    let wasPending = false

    return onSnapshot(
        q,
        { includeMetadataChanges: true },
        (snapshot) => {
            const hasPending = snapshot.metadata.hasPendingWrites

            // Detect transition from pending to resolved
            if (wasPending && !hasPending && onPendingWritesResolved) {
                onPendingWritesResolved()
            }

            wasPending = hasPending
            onData(data, hasPending)
        },
        onError
    )
}
```

**Key Features:**

- Tracks previous pending state with `wasPending`
- Detects transition from `true` → `false`
- Fires callback only when sync completes
- No callback on initial load or when already synced

### 2. Hook Layer

```typescript
export function useParties(
    shopId: string,
    onSyncComplete?: () => void // NEW PARAMETER
) {
    useEffect(() => {
        const unsubscribe = partiesApi.subscribe(
            partyQueries.byShop(shopId),
            (data, pending) => {
                usePartyStore.getState().setItems(data)
                usePartyStore.getState().setPendingWrites(pending)
            },
            (err) => {
                usePartyStore.getState().setError(err.message)
            },
            onSyncComplete // PASS CALLBACK
        )
        return () => unsubscribe()
    }, [shopId, onSyncComplete])

    return { parties, isLoading, error, hasPendingWrites }
}
```

### 3. Component Layer

```typescript
const [isSubmitting, setIsSubmitting] = useState(false)
const [pendingPartyId, setPendingPartyId] = useState<string | null>(null)

const { parties, hasPendingWrites } = useParties(shopId, () => {
    // Called when sync completes
    if (pendingPartyId) {
        setIsFormOpen(false)
        setIsSubmitting(false)
        navigate(`/parties/${pendingPartyId}`)
        setPendingPartyId(null)
    }
})

const handleCreateParty = async (data: PartyFormData) => {
    setIsSubmitting(true)
    try {
        const party = await createParty(data)
        setPendingPartyId(party.id)
        // UI updates happen in callback when sync completes
    } catch (error) {
        setIsSubmitting(false)
        setPendingPartyId(null)
    }
}
```

## Benefits

### 1. Automatic UI Updates

- Dialog closes automatically when sync completes
- No manual timing or polling needed
- Works with offline persistence

### 2. Better UX

- Form stays disabled until sync completes
- User sees "Syncing..." indicator
- Navigation happens after confirmation
- No premature navigation

### 3. Error Resilience

- If sync fails, callback never fires
- Dialog stays open for retry
- Loading state resets on error

### 4. Offline Support

- Works seamlessly with offline writes
- Callback fires when back online and synced
- No special offline handling needed

## Use Cases

### Create Operation

```typescript
const handleCreate = async (data) => {
    setIsSubmitting(true)
    try {
        const item = await create(data)
        setPendingId(item.id)
        // Callback closes dialog and navigates when synced
    } catch (error) {
        setIsSubmitting(false)
    }
}
```

### Update Operation

```typescript
const handleUpdate = async (id, data) => {
    setIsSubmitting(true)
    try {
        await update(id, data)
        setPendingUpdate(true)
        // Callback closes dialog when synced
    } catch (error) {
        setIsSubmitting(false)
    }
}
```

### Delete Operation

```typescript
const handleDelete = async (id) => {
    setIsDeleting(true)
    try {
        await deleteItem(id)
        setPendingDelete(true)
        // Callback navigates away when synced
    } catch (error) {
        setIsDeleting(false)
    }
}
```

## Comparison

### Before (Manual Timing)

```typescript
const handleCreate = async (data) => {
    setIsSubmitting(true)
    try {
        await create(data)
        setIsFormOpen(false) // Closes immediately
        navigate('/item') // Navigates before sync
    } finally {
        setIsSubmitting(false)
    }
}
```

**Issues:**

- Dialog closes before sync completes
- Navigation happens before server confirms
- No feedback during sync
- Race conditions possible

### After (Callback-Based)

```typescript
const { items } = useItems(shopId, () => {
    if (pendingId) {
        setIsFormOpen(false) // Closes after sync
        navigate(`/item/${pendingId}`) // Navigates after confirm
        setPendingId(null)
    }
})

const handleCreate = async (data) => {
    setIsSubmitting(true)
    try {
        const item = await create(data)
        setPendingId(item.id)
        // Callback handles UI updates
    } catch (error) {
        setIsSubmitting(false)
    }
}
```

**Benefits:**

- Dialog closes after sync completes
- Navigation after server confirms
- "Syncing..." feedback during sync
- No race conditions

## Edge Cases Handled

### 1. Multiple Pending Writes

```typescript
// Only fires when ALL pending writes resolve
if (wasPending && !hasPending && onPendingWritesResolved) {
    onPendingWritesResolved()
}
```

### 2. Error During Sync

```typescript
try {
    const party = await createParty(data)
    setPendingPartyId(party.id)
} catch (error) {
    setIsSubmitting(false) // Reset on error
    setPendingPartyId(null) // Clear pending
    // Callback never fires, dialog stays open
}
```

### 3. Component Unmount

```typescript
useEffect(() => {
    const unsubscribe = partiesApi.subscribe(...)
    return () => unsubscribe()  // Cleanup
}, [shopId, onSyncComplete])
```

### 4. Offline Mode

```typescript
// Callback fires when back online and synced
// No special handling needed
// Works automatically with Firestore persistence
```

## Migration Guide

### Step 1: Update Firestore Utility

Already done in `firestore.ts`

### Step 2: Update Hook

```typescript
export function useMyItems(
    shopId: string,
    onSyncComplete?: () => void // Add parameter
) {
    useEffect(() => {
        const unsubscribe = myItemsApi.subscribe(
            myItemsQueries.byShop(shopId),
            (data, pending) => {
                // ... state updates
            },
            (err) => {
                // ... error handling
            },
            onSyncComplete // Pass callback
        )
        return () => unsubscribe()
    }, [shopId, onSyncComplete]) // Add to deps
}
```

### Step 3: Update Component

```typescript
const [isSubmitting, setIsSubmitting] = useState(false)
const [pendingId, setPendingId] = useState<string | null>(null)

const { items } = useMyItems(shopId, () => {
    if (pendingId) {
        setIsFormOpen(false)
        setIsSubmitting(false)
        navigate(`/items/${pendingId}`)
        setPendingId(null)
    }
})

const handleCreate = async (data) => {
    setIsSubmitting(true)
    try {
        const item = await create(data)
        setPendingId(item.id)
    } catch (error) {
        setIsSubmitting(false)
        setPendingId(null)
    }
}
```

## Testing

### Manual Tests

- [x] Create party → Dialog closes after sync
- [x] Create party → Navigation after sync
- [x] Create party → "Syncing..." shows during sync
- [x] Error case → Dialog stays open
- [x] Offline → Callback fires when back online
- [x] Multiple writes → Callback fires after all complete

### Expected Behavior

1. Submit form → Form disabled
2. Optimistic update → Item appears in list
3. "Syncing..." appears
4. Server confirms → "Syncing..." disappears
5. Dialog closes automatically
6. Navigation happens automatically

## Performance

- **No polling**: Event-driven, not timer-based
- **Single callback**: Fires once per sync completion
- **Minimal re-renders**: Only when pending state changes
- **Efficient**: Uses Firestore metadata, no extra queries

## Files Modified

1. `src/features/shared/utils/firestore.ts`
2. `src/features/parties/hooks/use-parties.ts`
3. `src/app/routes/parties/index.tsx`
