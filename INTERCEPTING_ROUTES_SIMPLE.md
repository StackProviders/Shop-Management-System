# Intercepting Routes - Simplified Implementation

## Overview

Reusable `InterceptingRoute` component eliminates boilerplate. Just wrap your form and configure the modal type.

## Quick Start (2 Steps)

### Step 1: Add Search Schema to Route

```typescript
// src/routes/_protected/_dashboard/parties/new.tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import NewPartyPage from '@/app/pages/parties/new'

const searchSchema = z.object({
    fromParties: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/parties/new')({
    validateSearch: searchSchema,
    component: NewPartyPage
})
```

### Step 2: Use InterceptingRoute Component

```typescript
// src/app/pages/parties/new.tsx
import { useNavigate, useSearch } from '@tanstack/react-router'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { PartyForm } from '@/features/parties'

export default function NewPartyPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/parties/new' })
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromParties === true,
        '/parties'
    )

    const handleCreate = async (data) => {
        const id = await createParty(data)
        navigate({ to: `/parties/${id}`, replace: isIntercepting })
    }

    return (
        <InterceptingRoute
            isIntercepting={isIntercepting}
            fallbackPath="/parties"
            modalType="form"
            modalProps={{
                title: 'Create New Party',
                description: 'Add a new customer or supplier',
                formId: 'create-party-form',
                submitLabel: 'Create',
                className: 'max-w-2xl'
            }}
        >
            <PartyForm onSubmit={handleCreate} onCancel={handleClose} />
        </InterceptingRoute>
    )
}
```

## InterceptingRoute Props

```typescript
interface InterceptingRouteProps {
    isIntercepting: boolean // From search params
    fallbackPath: string // Where to go when not intercepting
    children: ReactNode // Your form/content
    fullPageClassName?: string // Full page wrapper class
    modalType?: 'form' | 'responsive' // Modal type
    modalProps?: {
        // FormModal props
        title?: string
        description?: string
        formId?: string
        isDirty?: boolean
        submitLabel?: string
        className?: string

        // ResponsiveModal props
        showHeader?: boolean
        contentClassName?: string
    }
}
```

## Examples

### Example 1: Form Modal (Parties)

```typescript
import { useNavigate, useSearch } from '@tanstack/react-router'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { PartyForm } from '@/features/parties'

export default function NewPartyPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/parties/new' })
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromParties === true,
        '/parties'
    )

    const handleCreate = async (data) => {
        const id = await createParty(data)
        navigate({ to: `/parties/${id}`, replace: isIntercepting })
    }

    return (
        <InterceptingRoute
            isIntercepting={isIntercepting}
            fallbackPath="/parties"
            modalType="form"
            modalProps={{
                title: 'Create New Party',
                description: 'Add a new customer or supplier',
                formId: 'create-party-form',
                submitLabel: 'Create',
                className: 'max-w-2xl'
            }}
        >
            <PartyForm
                onSubmit={handleCreate}
                onCancel={handleClose}
                formId="create-party-form"
            />
        </InterceptingRoute>
    )
}
```

### Example 2: Responsive Modal (Items)

```typescript
import { useNavigate, useSearch } from '@tanstack/react-router'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { ItemForm } from '@/features/items'

export default function CreateItemPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/items/create' })
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromItems === true,
        '/items'
    )

    const handleCreate = async (data) => {
        await createItem(data)
        navigate({ to: '/items', replace: isIntercepting })
    }

    return (
        <InterceptingRoute
            isIntercepting={isIntercepting}
            fallbackPath="/items"
            modalType="responsive"
            fullPageClassName="h-full overflow-y-auto"
            modalProps={{
                showHeader: false,
                className: '!max-w-6xl',
                contentClassName: 'p-0'
            }}
        >
            <ItemForm onSubmit={handleCreate} onCancel={handleClose} />
        </InterceptingRoute>
    )
}
```

### Example 3: With Dirty State

```typescript
import { useState } from 'react'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'

export default function NewPartyPage() {
    const [isDirty, setIsDirty] = useState(false)
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromParties === true,
        '/parties'
    )

    return (
        <InterceptingRoute
            isIntercepting={isIntercepting}
            fallbackPath="/parties"
            modalType="form"
            modalProps={{
                title: 'Create New Party',
                isDirty // Warns before closing if form is dirty
            }}
        >
            <PartyForm onDirtyChange={setIsDirty} />
        </InterceptingRoute>
    )
}
```

### Example 4: Edit Modal

```typescript
// In detail page
export default function PartyDetailPage() {
    const { id } = useParams()
    const location = useLocation()
    const isEditOpen = location.pathname === `/parties/${id}/edit`
    const editSearch = isEditOpen ? useSearch({ strict: false }) : undefined
    const isEditIntercepting = editSearch?.fromDetail === true

    return (
        <>
            <PartyDetail party={party} />

            {isEditOpen && isEditIntercepting && (
                <FormModal
                    open
                    onOpenChange={(open) => !open && handleEditClose()}
                    title="Edit Party"
                >
                    <PartyForm party={party} onSubmit={handleUpdate} />
                </FormModal>
            )}
        </>
    )
}
```

## Navigation

Use `useTypedNavigate` for type-safe navigation:

```typescript
import { useTypedNavigate } from '@/lib/router-utils'

function PartiesList() {
    const nav = useTypedNavigate()

    return (
        <>
            <Button onClick={() => nav.toNewParty(true)}>
                Create (Modal)
            </Button>
            <Button onClick={() => nav.toNewParty(false)}>
                Create (Full Page)
            </Button>
        </>
    )
}
```

## Benefits

✅ **90% less code** - No manual modal/page rendering
✅ **Consistent** - Same pattern everywhere
✅ **Type-safe** - Full TypeScript support
✅ **Flexible** - Supports both modal types
✅ **Clean** - Separation of concerns

## Before vs After

### Before (Manual)

```typescript
export default function NewPartyPage() {
    const navigate = useNavigate()
    const router = useRouter()
    const search = useSearch({ from: '/_protected/_dashboard/parties/new' })
    const isIntercepting = search.fromParties === true

    const handleClose = useCallback(() => {
        if (isIntercepting) {
            router.history.back()
        } else {
            navigate({ to: '/parties' })
        }
    }, [isIntercepting, router, navigate])

    if (!isIntercepting) {
        return (
            <div className="h-full overflow-y-auto p-6">
                <PartyForm onSubmit={handleCreate} />
            </div>
        )
    }

    return (
        <FormModal open onOpenChange={(open) => !open && handleClose()}>
            <PartyForm onSubmit={handleCreate} />
        </FormModal>
    )
}
```

### After (With InterceptingRoute)

```typescript
export default function NewPartyPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/parties/new' })
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromParties === true,
        '/parties'
    )

    return (
        <InterceptingRoute
            isIntercepting={isIntercepting}
            fallbackPath="/parties"
            modalType="form"
            modalProps={{ title: 'Create New Party' }}
        >
            <PartyForm onSubmit={handleCreate} onCancel={handleClose} />
        </InterceptingRoute>
    )
}
```

## Migration Checklist

For each intercepting route:

- [ ] Add search schema to route file
- [ ] Import `InterceptingRoute` and `useInterceptingRoute`
- [ ] Replace manual rendering with `InterceptingRoute` component
- [ ] Configure `modalType` and `modalProps`
- [ ] Remove manual `handleClose` logic (use hook)
- [ ] Update navigation to pass modal flag
- [ ] Test modal and full page views

## Common Patterns

### Pattern 1: Simple Create Form

```typescript
<InterceptingRoute
    isIntercepting={isIntercepting}
    fallbackPath="/items"
    modalType="form"
    modalProps={{ title: 'Create Item' }}
>
    <ItemForm onSubmit={handleCreate} />
</InterceptingRoute>
```

### Pattern 2: Large Responsive Modal

```typescript
<InterceptingRoute
    isIntercepting={isIntercepting}
    fallbackPath="/items"
    modalType="responsive"
    modalProps={{
        showHeader: false,
        className: '!max-w-6xl',
        contentClassName: 'p-0'
    }}
>
    <ItemForm onSubmit={handleCreate} />
</InterceptingRoute>
```

### Pattern 3: With Custom Full Page Layout

```typescript
<InterceptingRoute
    isIntercepting={isIntercepting}
    fallbackPath="/parties"
    modalType="form"
    fullPageClassName="h-full overflow-y-auto p-3 sm:p-4 md:p-6"
    modalProps={{ title: 'Create Party' }}
>
    <div className={isIntercepting ? '' : 'max-w-2xl mx-auto'}>
        {!isIntercepting && <h1>Create New Party</h1>}
        <PartyForm onSubmit={handleCreate} />
    </div>
</InterceptingRoute>
```

## Troubleshooting

### Modal doesn't open

- Check search param is passed: `nav.toNewParty(true)`
- Verify search schema in route file

### Back button doesn't work

- Use `handleClose` from `useInterceptingRoute` hook
- Don't create custom close handlers

### Type errors

- Ensure search schema matches search param name
- Use correct route path in `useSearch`

## Next Steps

1. Convert existing intercepting routes to use `InterceptingRoute`
2. Add search schemas to all route files
3. Update navigation calls to use `useTypedNavigate`
4. Remove manual modal/page rendering logic
5. Test all scenarios

Done! 🎉
