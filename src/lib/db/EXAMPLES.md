# Firestore Repository - Complete Examples

## Table of Contents

1. [Basic CRUD](#basic-crud)
2. [Queries](#queries)
3. [Real-time Updates](#real-time-updates)
4. [Batch Operations](#batch-operations)
5. [Transactions](#transactions)
6. [React Hooks](#react-hooks)
7. [Advanced Patterns](#advanced-patterns)

---

## Basic CRUD

### Create a Shop

```typescript
import { shopsRepo } from '@/lib/db'
import { ShopStatus } from '@/types/shop'

const createNewShop = async (userId: string) => {
    const shop = {
        id: crypto.randomUUID(),
        shopname: 'My New Shop',
        logo_url: 'https://example.com/logo.png',
        phone_number: '+1234567890',
        email: 'shop@example.com',
        shop_type: 'retail',
        shop_category: 'electronics',
        shop_address: '123 Main St',
        status: ShopStatus.ACTIVE,
        created_userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    await shopsRepo.set(shop)
    return shop
}
```

### Read a Shop

```typescript
import { shopsRepo } from '@/lib/db'

const shop = await shopsRepo.get({ id: 'shop-id-123' })

if (shop) {
    console.log(shop.shopname)
    console.log(shop.status)
}
```

### Update a Shop

```typescript
import { shopsRepo } from '@/lib/db'

const updateShopInfo = async (shopId: string) => {
    const shop = await shopsRepo.get({ id: shopId })

    if (shop) {
        await shopsRepo.set({
            ...shop,
            shopname: 'Updated Shop Name',
            phone_number: '+9876543210',
            updatedAt: new Date()
        })
    }
}
```

### Delete a Shop

```typescript
import { shopsRepo } from '@/lib/db'

await shopsRepo.delete({ id: 'shop-id-123' })
```

---

## Queries

### Simple Query

```typescript
import { shopMembersRepo, getUserShopsQuery } from '@/lib/db'

const userShops = await shopMembersRepo.list(getUserShopsQuery(userId))
console.log(`User has ${userShops.length} shops`)
```

### Custom Query

```typescript
import { shopsRepo, shopsCollection } from '@/lib/db'
import {
    condition as $,
    query,
    limit,
    orderBy
} from 'firestore-repository/query'

const activeShops = await shopsRepo.list(
    query(
        shopsCollection,
        $('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(10)
    )
)
```

### Complex Query with Multiple Conditions

```typescript
import { shopsRepo, shopsCollection } from '@/lib/db'
import { condition as $, query } from 'firestore-repository/query'

const filteredShops = await shopsRepo.list(
    query(
        shopsCollection,
        $('status', '==', 'active'),
        $('shop_category', '==', 'electronics'),
        $('created_userId', '==', userId)
    )
)
```

### Query with 'in' Operator

```typescript
import { shopMembersRepo, shopMembersCollection } from '@/lib/db'
import { condition as $, query } from 'firestore-repository/query'

const admins = await shopMembersRepo.list(
    query(
        shopMembersCollection,
        $('shopId', '==', shopId),
        $('role', 'in', ['owner', 'admin'])
    )
)
```

---

## Real-time Updates

### Listen to Shop Changes

```typescript
import { shopsRepo } from '@/lib/db'

const unsubscribe = shopsRepo.getOnSnapshot({ id: 'shop-id-123' }, (shop) => {
    if (shop) {
        console.log('Shop updated:', shop.shopname)
    } else {
        console.log('Shop deleted')
    }
})

// Cleanup when done
unsubscribe()
```

### Listen to Query Results

```typescript
import { shopMembersRepo, getUserShopsQuery } from '@/lib/db'

const unsubscribe = shopMembersRepo.listOnSnapshot(
    getUserShopsQuery(userId),
    (members) => {
        console.log(`User has ${members.length} shop memberships`)
        members.forEach((member) => {
            console.log(`Shop: ${member.shopId}, Role: ${member.role}`)
        })
    }
)

// Cleanup
unsubscribe()
```

### React Hook with Real-time Updates

```typescript
import { useState, useEffect } from 'react'
import { shopsRepo } from '@/lib/db'

function useShop(shopId: string) {
    const [shop, setShop] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const unsubscribe = shopsRepo.getOnSnapshot({ id: shopId }, (data) => {
            setShop(data)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [shopId])

    return { shop, loading }
}
```

---

## Batch Operations

### Batch Create Multiple Shops

```typescript
import { shopsRepo } from '@/lib/db'
import { ShopStatus } from '@/types/shop'

const shops = [
    {
        id: crypto.randomUUID(),
        shopname: 'Shop 1',
        status: ShopStatus.ACTIVE,
        created_userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: crypto.randomUUID(),
        shopname: 'Shop 2',
        status: ShopStatus.ACTIVE,
        created_userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

await shopsRepo.batchSet(shops)
```

### Batch Delete

```typescript
import { shopMembersRepo } from '@/lib/db'

const memberIds = ['member-1', 'member-2', 'member-3']

await shopMembersRepo.batchDelete(memberIds.map((id) => ({ id })))
```

### Mixed Batch Operations

```typescript
import { writeBatch } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { shopsRepo, shopMembersRepo } from '@/lib/db'

const batch = writeBatch(db)

// Add shop
await shopsRepo.set(newShop, { tx: batch })

// Add members
await shopMembersRepo.batchSet([member1, member2], { tx: batch })

// Delete old member
await shopMembersRepo.delete({ id: 'old-member-id' }, { tx: batch })

// Commit all at once
await batch.commit()
```

---

## Transactions

### Simple Transaction

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
                status: 'inactive',
                updatedAt: new Date()
            },
            { tx }
        )
    }
})
```

### Complex Transaction with Multiple Operations

```typescript
import { runTransaction } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { shopsRepo, shopMembersRepo } from '@/lib/db'

await runTransaction(db, async (tx) => {
    // Get current data
    const shop = await shopsRepo.get({ id: shopId }, { tx })
    const members = await shopMembersRepo.list(getShopMembersQuery(shopId))

    if (!shop) throw new Error('Shop not found')

    // Update shop
    await shopsRepo.set(
        {
            ...shop,
            status: 'suspended',
            updatedAt: new Date()
        },
        { tx }
    )

    // Remove all members
    await shopMembersRepo.batchDelete(
        members.map((m) => ({ id: m.id })),
        { tx }
    )
})
```

---

## React Hooks

### Custom Hook for Shops List

```typescript
import { useState, useEffect } from 'react'
import { shopMembersRepo, shopsRepo, getUserShopsQuery } from '@/lib/db'
import { UserShopAccess } from '@/types/shop'

export function useUserShops(userId: string | undefined) {
    const [shops, setShops] = useState<UserShopAccess[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!userId) {
            setShops([])
            setLoading(false)
            return
        }

        const unsubscribe = shopMembersRepo.listOnSnapshot(
            getUserShopsQuery(userId),
            async (members) => {
                try {
                    const userShops: UserShopAccess[] = []

                    for (const member of members) {
                        const shop = await shopsRepo.get({ id: member.shopId })
                        if (shop) {
                            userShops.push({
                                shopId: shop.id,
                                shopName: shop.shopname,
                                role: member.role,
                                permissions: member.permissions,
                                isOwner: shop.created_userId === userId,
                                logoUrl: shop.logo_url,
                                shopCategory: shop.shop_category,
                                shopAddress: shop.shop_address
                            })
                        }
                    }

                    setShops(userShops)
                    setError(null)
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed')
                } finally {
                    setLoading(false)
                }
            }
        )

        return () => unsubscribe()
    }, [userId])

    return { shops, loading, error }
}
```

### Usage in Component

```typescript
import { useUserShops } from '@/hooks/use-user-shops'

function ShopsList() {
    const { shops, loading, error } = useUserShops(userId)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div>
            {shops.map(shop => (
                <div key={shop.shopId}>
                    <h3>{shop.shopName}</h3>
                    <p>Role: {shop.role}</p>
                </div>
            ))}
        </div>
    )
}
```

---

## Advanced Patterns

### Pagination

```typescript
import { shopsRepo, shopsCollection } from '@/lib/db'
import {
    condition as $,
    query,
    limit,
    orderBy,
    startAfter
} from 'firestore-repository/query'

let lastShop = null
const pageSize = 10

// First page
const firstPage = await shopsRepo.list(
    query(
        shopsCollection,
        $('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
    )
)

lastShop = firstPage[firstPage.length - 1]

// Next page
const nextPage = await shopsRepo.list(
    query(
        shopsCollection,
        $('status', '==', 'active'),
        orderBy('createdAt', 'desc'),
        startAfter(lastShop.createdAt),
        limit(pageSize)
    )
)
```

### Optimistic Updates

```typescript
import { shopsRepo } from '@/lib/db'

const updateShopOptimistically = async (shopId: string, newName: string) => {
    // Update UI immediately
    const shop = await shopsRepo.get({ id: shopId })
    if (!shop) return

    const optimisticShop = { ...shop, shopname: newName }

    // Update local state immediately
    setLocalShop(optimisticShop)

    try {
        // Sync to server
        await shopsRepo.set({
            ...optimisticShop,
            updatedAt: new Date()
        })
    } catch (error) {
        // Revert on error
        setLocalShop(shop)
        throw error
    }
}
```

### Aggregation (Count)

```typescript
import { shopMembersRepo, getShopMembersQuery } from '@/lib/db'
import { count } from 'firestore-repository/query'

const result = await shopMembersRepo.aggregate(getShopMembersQuery(shopId), {
    memberCount: count()
})

console.log(`Shop has ${result.memberCount} members`)
```

### Search with Debounce

```typescript
import { useState, useEffect } from 'react'
import { shopsRepo, shopsCollection } from '@/lib/db'
import { condition as $, query, limit } from 'firestore-repository/query'

function useShopSearch(searchTerm: string) {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!searchTerm) {
            setResults([])
            return
        }

        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                const shops = await shopsRepo.list(
                    query(
                        shopsCollection,
                        $('shopname', '>=', searchTerm),
                        $('shopname', '<=', searchTerm + '\uf8ff'),
                        limit(20)
                    )
                )
                setResults(shops)
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm])

    return { results, loading }
}
```

### Conditional Updates

```typescript
import { shopsRepo } from '@/lib/db'
import { ShopStatus } from '@/types/shop'

const activateShopIfInactive = async (shopId: string) => {
    const shop = await shopsRepo.get({ id: shopId })

    if (shop && shop.status === ShopStatus.INACTIVE) {
        await shopsRepo.set({
            ...shop,
            status: ShopStatus.ACTIVE,
            updatedAt: new Date()
        })
        return true
    }

    return false
}
```

---

## Error Handling

### With Try-Catch

```typescript
import { shopsRepo } from '@/lib/db'

try {
    const shop = await shopsRepo.get({ id: shopId })
    if (!shop) {
        throw new Error('Shop not found')
    }
    // Process shop
} catch (error) {
    if (error instanceof Error) {
        console.error('Error:', error.message)
    }
    // Handle error
}
```

### With Promise Rejection

```typescript
import { shopsRepo } from '@/lib/db'

shopsRepo
    .get({ id: shopId })
    .then((shop) => {
        if (shop) {
            console.log(shop.shopname)
        }
    })
    .catch((error) => {
        console.error('Failed to get shop:', error)
    })
```
