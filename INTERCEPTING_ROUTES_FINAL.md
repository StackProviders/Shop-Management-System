# Intercepting Routes - Final Implementation Guide

## Overview

Type-safe intercepting routes using TanStack Router's **search params** (not state). Routes automatically render as modals or full pages based on navigation context.

## Quick Start (3 Steps)

### Step 1: Define Search Schema in Route

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

### Step 2: Use Hook in Page Component

```typescript
// src/app/pages/parties/new.tsx
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { FormModal } from '@/components'
import { PartyForm } from '@/features/parties'

export default function NewPartyPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/parties/new' })

    // Use the hook - handles all navigation logic
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromParties === true,
        '/parties'
    )

    const handleCreate = async (data) => {
        const id = await createParty(data)
        navigate({ to: `/parties/${id}`, replace: isIntercepting })
    }

    // Render as full page if not intercepting
    if (!isIntercepting) {
        return (
            <div className="h-full overflow-y-auto p-6">
                <h1>Create New Party</h1>
                <PartyForm onSubmit={handleCreate} />
            </div>
        )
    }

    // Render as modal if intercepting
    return (
        <FormModal
            open={true}
            onOpenChange={(open) => !open && handleClose()}
            title="Create New Party"
        >
            <PartyForm onSubmit={handleCreate} />
        </FormModal>
    )
}
```

### Step 3: Navigate with Modal Flag

```typescript
// In your list component
import { useTypedNavigate } from '@/lib/router-utils'

function PartiesList() {
    const nav = useTypedNavigate()

    return (
        <Button onClick={() => nav.toNewParty(true)}>
            {/* Pass true for modal, false/undefined for full page */}
            Create Party
        </Button>
    )
}
```

## Available Navigation Helpers

```typescript
import { useTypedNavigate } from '@/lib/router-utils'

const nav = useTypedNavigate()

// Parties
nav.toNewParty(true) // Opens as modal
nav.toNewParty(false) // Opens as full page
nav.toPartyEdit(id, true) // Edit as modal
nav.toPartyEdit(id, false) // Edit as full page

// Items
nav.toCreateItem(true) // Opens as modal
nav.toCreateItem(false) // Opens as full page
```

## Complete Examples

### Example 1: Create Party

**Route file:**

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

**Page component:**

```typescript
// src/app/pages/parties/new.tsx
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { FormModal } from '@/components'
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

    if (!isIntercepting) {
        return (
            <div className="h-full overflow-y-auto p-6">
                <h1>Create New Party</h1>
                <PartyForm onSubmit={handleCreate} onCancel={handleClose} />
            </div>
        )
    }

    return (
        <FormModal open onOpenChange={(open) => !open && handleClose()}>
            <PartyForm onSubmit={handleCreate} onCancel={handleClose} />
        </FormModal>
    )
}
```

**Navigation:**

```typescript
// In parties list
import { useTypedNavigate } from '@/lib/router-utils'

function PartiesList() {
    const nav = useTypedNavigate()

    return (
        <Button onClick={() => nav.toNewParty(true)}>
            Create Party
        </Button>
    )
}
```

### Example 2: Edit Party

**Route file:**

```typescript
// src/routes/_protected/_dashboard/parties/$id.edit.tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import EditPartyPage from '@/app/pages/parties/[id]/edit'

const searchSchema = z.object({
    fromDetail: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/parties/$id/edit')(
    {
        validateSearch: searchSchema,
        component: EditPartyPage
    }
)
```

**Page component:**

```typescript
// src/app/pages/parties/[id]/edit.tsx
import { useParams, useNavigate, useSearch } from '@tanstack/react-router'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { FormModal } from '@/components'
import { PartyForm, useParty } from '@/features/parties'

export default function EditPartyPage() {
    const { id } = useParams({ from: '/_protected/_dashboard/parties/$id/edit' })
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/parties/$id/edit' })
    const { party } = useParty(id)
    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromDetail === true,
        `/parties/${id}`
    )

    const handleUpdate = async (data) => {
        await updateParty(id, data)
        navigate({ to: `/parties/${id}`, replace: isIntercepting })
    }

    if (!isIntercepting) {
        return (
            <div className="h-full overflow-y-auto p-6">
                <h1>Edit Party</h1>
                <PartyForm party={party} onSubmit={handleUpdate} />
            </div>
        )
    }

    return (
        <FormModal open onOpenChange={(open) => !open && handleClose()}>
            <PartyForm party={party} onSubmit={handleUpdate} />
        </FormModal>
    )
}
```

**Navigation:**

```typescript
// In party detail page
import { useTypedNavigate } from '@/lib/router-utils'

function PartyDetail({ id }) {
    const nav = useTypedNavigate()

    return (
        <Button onClick={() => nav.toPartyEdit(id, true)}>
            Edit
        </Button>
    )
}
```

### Example 3: Create Item

**Route file:**

```typescript
// src/routes/_protected/_dashboard/items/create.tsx
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import CreateItemPage from '@/app/pages/items/create'

const searchSchema = z.object({
    fromItems: z.boolean().optional()
})

export const Route = createFileRoute('/_protected/_dashboard/items/create')({
    validateSearch: searchSchema,
    component: CreateItemPage
})
```

**Page component:**

```typescript
// src/app/pages/items/create.tsx
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { ResponsiveModal } from '@/components/ui/responsive-modal'
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

    if (!isIntercepting) {
        return (
            <div className="h-full overflow-y-auto">
                <ItemForm onSubmit={handleCreate} onCancel={handleClose} />
            </div>
        )
    }

    return (
        <ResponsiveModal
            open
            onOpenChange={(open) => !open && handleClose()}
            className="max-w-6xl h-[90vh]"
        >
            <ItemForm onSubmit={handleCreate} onCancel={handleClose} />
        </ResponsiveModal>
    )
}
```

## How It Works

### 1. Search Params (Not State)

TanStack Router uses **search params** for type-safe navigation:

```typescript
// ✅ Correct - Uses search params
navigate({ to: '/parties/new', search: { fromParties: true } })

// ❌ Wrong - TanStack Router doesn't use state
navigate({ to: '/parties/new', state: { fromParties: true } })
```

### 2. Type-Safe Schema

Define search params schema in route file:

```typescript
const searchSchema = z.object({
    fromParties: z.boolean().optional()
})
```

### 3. Smart Navigation

The `useInterceptingRoute` hook handles navigation:

- **Intercepting**: Uses `router.history.back()`
- **Not intercepting**: Navigates to fallback path

### 4. Conditional Rendering

Routes render differently based on context:

- **Direct URL**: Full page
- **With search param**: Modal

## Benefits

✅ **Type-safe** - Zod schema validation
✅ **Clean API** - Single hook handles all logic
✅ **Browser back** - Works correctly
✅ **SEO friendly** - Direct URLs work
✅ **No duplication** - One route, two views

## Migration Checklist

For each intercepting route:

- [ ] Add search schema to route file
- [ ] Import `useInterceptingRoute` hook
- [ ] Replace manual navigation logic with hook
- [ ] Add conditional rendering (modal vs full page)
- [ ] Update navigation calls to pass modal flag
- [ ] Test: modal open, close, back button, direct URL

## Common Patterns

### Pattern 1: Form with Dirty State

```typescript
const [isDirty, setIsDirty] = useState(false)
const { handleClose, isIntercepting } = useInterceptingRoute(
    search.fromParties === true,
    '/parties'
)

return (
    <FormModal
        open
        onOpenChange={(open) => !open && handleClose()}
        isDirty={isDirty}
    >
        <Form onDirtyChange={setIsDirty} />
    </FormModal>
)
```

### Pattern 2: Success Navigation

```typescript
const handleCreate = async (data) => {
    const id = await createItem(data)
    // Replace history if intercepting to avoid back button issues
    navigate({ to: `/items/${id}`, replace: isIntercepting })
}
```

### Pattern 3: Multiple Search Params

```typescript
const searchSchema = z.object({
    fromItems: z.boolean().optional(),
    type: z.enum(['product', 'service']).optional()
})

const { handleClose, isIntercepting } = useInterceptingRoute(
    search.fromItems === true,
    '/items'
)
```

## Troubleshooting

### Issue: Type error on search params

**Solution**: Add search schema to route file

### Issue: Modal doesn't open

**Solution**: Pass `true` to navigation helper: `nav.toNewParty(true)`

### Issue: Back button doesn't work

**Solution**: Use `handleClose` from hook, not manual navigation

### Issue: Full page shows instead of modal

**Solution**: Check search param is being passed in navigation

## Testing

```bash
# Test modal open
Click button → Modal opens → URL changes

# Test back button
Click back → Modal closes → Returns to list

# Test direct URL
Type /parties/new → Full page shows

# Test form submission
Submit form → Navigates to detail → History correct
```

## Next Steps

1. Update existing intercepting routes to use new pattern
2. Add search schemas to all route files
3. Replace manual navigation with `useInterceptingRoute` hook
4. Update navigation calls to use `useTypedNavigate`
5. Test all scenarios (modal, full page, back button)

Done! 🎉
