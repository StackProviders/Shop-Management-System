# Migration Guide: Firebase SDK → firestore-repository

This guide helps you migrate from the standard Firebase SDK to firestore-repository.

## Key Changes

### 1. Imports

**Before:**

```typescript
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
```

**After:**

```typescript
import { shopsRepo, shopMembersRepo } from '@/lib/db'
import { condition as $, query } from 'firestore-repository/query'
```

### 2. Creating Documents

**Before:**

```typescript
const shopRef = await addDoc(collection(db, 'shops'), {
    shopname: 'My Shop',
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
})

const shopId = shopRef.id
```

**After:**

```typescript
const shopId = crypto.randomUUID()

await shopsRepo.set({
    id: shopId,
    shopname: 'My Shop',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
})
```

### 3. Reading Documents

**Before:**

```typescript
const shopDoc = await getDoc(doc(db, 'shops', shopId))

if (shopDoc.exists()) {
    const data = shopDoc.data()
    const shop = {
        id: shopDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate()
    }
}
```

**After:**

```typescript
const shop = await shopsRepo.get({ id: shopId })

if (shop) {
    // shop is fully typed and dates are already Date objects
    console.log(shop.shopname)
}
```

### 4. Updating Documents

**Before:**

```typescript
await updateDoc(doc(db, 'shops', shopId), {
    shopname: 'Updated Name',
    updatedAt: serverTimestamp()
})
```

**After:**

```typescript
const shop = await shopsRepo.get({ id: shopId })

if (shop) {
    await shopsRepo.set({
        ...shop,
        shopname: 'Updated Name',
        updatedAt: new Date()
    })
}
```

### 5. Deleting Documents

**Before:**

```typescript
await deleteDoc(doc(db, 'shops', shopId))
```

**After:**

```typescript
await shopsRepo.delete({ id: shopId })
```

### 6. Queries

**Before:**

```typescript
const q = query(
    collection(db, 'shop_members'),
    where('userId', '==', userId),
    where('shopId', '==', shopId)
)

const snapshot = await getDocs(q)
const members = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate()
}))
```

**After:**

```typescript
import { condition as $, query } from 'firestore-repository/query'
import { shopMembersCollection } from '@/lib/db'

const members = await shopMembersRepo.list(
    query(
        shopMembersCollection,
        $('userId', '==', userId),
        $('shopId', '==', shopId)
    )
)
// members is fully typed with Date objects
```

### 7. Real-time Listeners

**Before:**

```typescript
import { onSnapshot } from 'firebase/firestore'

const unsubscribe = onSnapshot(doc(db, 'shops', shopId), (snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.data()
        setShop({
            id: snapshot.id,
            ...data,
            createdAt: data.createdAt?.toDate()
        })
    }
})
```

**After:**

```typescript
const unsubscribe = shopsRepo.getOnSnapshot({ id: shopId }, (shop) => {
    if (shop) {
        setShop(shop) // Fully typed
    }
})
```

### 8. Query Listeners

**Before:**

```typescript
import { onSnapshot, query, where, collection } from 'firebase/firestore'

const q = query(collection(db, 'shop_members'), where('userId', '==', userId))

const unsubscribe = onSnapshot(q, (snapshot) => {
    const members = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    setMembers(members)
})
```

**After:**

```typescript
import { getUserShopsQuery } from '@/lib/db'

const unsubscribe = shopMembersRepo.listOnSnapshot(
    getUserShopsQuery(userId),
    (members) => {
        setMembers(members) // Fully typed
    }
)
```

### 9. Batch Operations

**Before:**

```typescript
import { writeBatch } from 'firebase/firestore'

const batch = writeBatch(db)

batch.set(doc(db, 'shops', shop1Id), shop1Data)
batch.set(doc(db, 'shops', shop2Id), shop2Data)
batch.delete(doc(db, 'shops', shop3Id))

await batch.commit()
```

**After:**

```typescript
// Simple batch
await shopsRepo.batchSet([shop1, shop2])
await shopsRepo.batchDelete([{ id: shop3Id }])

// Or with custom batch
import { writeBatch } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const batch = writeBatch(db)

await shopsRepo.set(shop1, { tx: batch })
await shopsRepo.set(shop2, { tx: batch })
await shopsRepo.delete({ id: shop3Id }, { tx: batch })

await batch.commit()
```

### 10. Transactions

**Before:**

```typescript
import { runTransaction } from 'firebase/firestore'

await runTransaction(db, async (transaction) => {
    const shopRef = doc(db, 'shops', shopId)
    const shopDoc = await transaction.get(shopRef)

    if (!shopDoc.exists()) {
        throw new Error('Shop not found')
    }

    transaction.update(shopRef, {
        status: 'inactive',
        updatedAt: serverTimestamp()
    })
})
```

**After:**

```typescript
import { runTransaction } from 'firebase/firestore'
import { db } from '@/lib/firebase'

await runTransaction(db, async (tx) => {
    const shop = await shopsRepo.get({ id: shopId }, { tx })

    if (!shop) {
        throw new Error('Shop not found')
    }

    await shopsRepo.set(
        {
            ...shop,
            status: 'inactive',
            updatedAt: new Date()
        },
        { tx }
    )
})
```

## Complete Service Migration Example

### Before: services/shop.ts

```typescript
import {
    collection,
    addDoc,
    getDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const createShop = async (userId: string, shopData: any) => {
    const shopRef = await addDoc(collection(db, 'shops'), {
        ...shopData,
        created_userId: userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    })

    return { id: shopRef.id, ...shopData }
}

export const getShop = async (shopId: string) => {
    const shopDoc = await getDoc(doc(db, 'shops', shopId))

    if (!shopDoc.exists()) return null

    return {
        id: shopDoc.id,
        ...shopDoc.data()
    }
}
```

### After: services/shop.ts

```typescript
import { shopsRepo } from '@/lib/db'
import { ShopStatus } from '@/types/shop'

export const createShop = async (userId: string, shopData: any) => {
    const shop = {
        id: crypto.randomUUID(),
        ...shopData,
        created_userId: userId,
        status: ShopStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    await shopsRepo.set(shop)
    return shop
}

export const getShop = async (shopId: string) => {
    return await shopsRepo.get({ id: shopId })
}
```

## Benefits After Migration

✅ **Type Safety** - Full TypeScript support, no manual type casting
✅ **Simpler Code** - Less boilerplate, cleaner syntax
✅ **Date Handling** - Automatic Date conversion, no more Timestamp.toDate()
✅ **Reusable Queries** - Define once, use everywhere
✅ **Better DX** - Autocomplete and IntelliSense support
✅ **Offline Support** - Built-in with proper configuration
✅ **Consistent API** - Same patterns for all operations

## Common Pitfalls

### ❌ Don't use serverTimestamp()

```typescript
// Wrong
createdAt: serverTimestamp()

// Correct
createdAt: new Date()
```

### ❌ Don't forget to generate IDs

```typescript
// Wrong
await shopsRepo.set({ shopname: 'Test' })

// Correct
await shopsRepo.set({
    id: crypto.randomUUID(),
    shopname: 'Test'
})
```

### ❌ Don't forget to spread existing data on updates

```typescript
// Wrong - overwrites entire document
await shopsRepo.set({ id: shopId, shopname: 'New Name' })

// Correct - preserves other fields
const shop = await shopsRepo.get({ id: shopId })
await shopsRepo.set({ ...shop, shopname: 'New Name' })
```

## Testing the Migration

1. **Test offline mode**: Disconnect network and verify app still works
2. **Test real-time updates**: Open multiple tabs and verify sync
3. **Test transactions**: Verify atomic operations work correctly
4. **Test batch operations**: Verify bulk updates work
5. **Check TypeScript**: Ensure no type errors

## Rollback Plan

If you need to rollback:

1. Keep old service files as `.old.ts`
2. Test thoroughly before removing old code
3. Monitor error logs after deployment
4. Have database backup ready

## Need Help?

- Check `EXAMPLES.md` for usage patterns
- Check `README.md` for architecture overview
- Review existing converted services
- Test in development environment first
