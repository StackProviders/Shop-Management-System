# Intercepting Routes - Easy Implementation Guide

## What Are Intercepting Routes?

Intercepting routes allow forms to open as modals while keeping the page visible underneath. The URL changes, but the user stays on the same page.

**Example**: Click "Create Party" → Modal opens over the list → URL changes to `/parties/new`

## Quick Setup (3 Steps)

### Step 1: Create the Page Component

```typescript
// src/app/pages/parties/new.tsx
import { useCallback } from 'react'
import { useNavigate, useLocation, useRouter } from '@tanstack/react-router'
import { FormModal } from '@/components/ui/form-modal'
import { PartyForm } from '@/features/parties'

export default function NewPartyPage() {
  const navigate = useNavigate()
  const router = useRouter()
  const location = useLocation()

  // Check if opened as modal
  const isIntercepting = location.state?.fromParties === true

  // Smart close handler
  const handleClose = useCallback(() => {
    if (isIntercepting) {
      router.history.back() // Go back in history
    } else {
      navigate({ to: '/parties' }) // Navigate to list
    }
  }, [isIntercepting, router, navigate])

  // Handle form submission
  const handleCreate = async (data) => {
    const id = await createParty(data)
    navigate({ to: `/parties/${id}`, replace: isIntercepting })
  }

  // Render as full page if accessed directly
  if (!isIntercepting) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Party</h1>
        <PartyForm onSubmit={handleCreate} onCancel={handleClose} />
      </div>
    )
  }

  // Render as modal if intercepting
  return (
    <FormModal
      open={true}
      onOpenChange={(open) => !open && handleClose()}
      title="Create New Party"
      description="Add a new customer or supplier"
    >
      <PartyForm onSubmit={handleCreate} onCancel={handleClose} />
    </FormModal>
  )
}
```

### Step 2: Create the Route File

```typescript
// src/routes/_protected/_dashboard/parties/new.tsx
import { createFileRoute } from '@tanstack/react-router'
import NewPartyPage from '@/app/pages/parties/new'

export const Route = createFileRoute('/_protected/_dashboard/parties/new')({
    component: NewPartyPage
})
```

### Step 3: Add Navigation with State

```typescript
// In your list component (e.g., parties list)
import { useNavigate } from '@tanstack/react-router'

function PartiesList() {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate({
        to: '/parties/new',
        state: { fromParties: true } // ← This makes it intercept!
      })}
    >
      Create Party
    </Button>
  )
}
```

## That's It! 🎉

Now when you click the button:

- ✅ Modal opens over the list
- ✅ URL changes to `/parties/new`
- ✅ Back button closes the modal
- ✅ Direct URL access shows full page

## Common Patterns

### Pattern 1: Create Form (List → Modal)

**Use Case**: Create new item from list page

```typescript
// Page component
export default function NewItemPage() {
  const isIntercepting = useLocation().state?.fromItems === true

  const handleClose = () => {
    if (isIntercepting) router.history.back()
    else navigate({ to: '/items' })
  }

  if (!isIntercepting) {
    return <div className="p-6"><ItemForm /></div>
  }

  return <FormModal open onOpenChange={handleClose}><ItemForm /></FormModal>
}

// Navigation
<Button onClick={() => navigate({ to: '/items/create', state: { fromItems: true } })}>
  Create
</Button>
```

### Pattern 2: Edit Form (Detail → Modal)

**Use Case**: Edit item from detail page

```typescript
// Page component
export default function EditPartyPage() {
  const { id } = useParams()
  const isIntercepting = useLocation().state?.fromDetail === true

  const handleClose = () => {
    if (isIntercepting) router.history.back()
    else navigate({ to: `/parties/${id}` })
  }

  if (!isIntercepting) {
    return <div className="p-6"><PartyForm party={party} /></div>
  }

  return <FormModal open onOpenChange={handleClose}><PartyForm party={party} /></FormModal>
}

// Navigation
<Button onClick={() => navigate({
  to: `/parties/${id}/edit`,
  state: { fromDetail: true }
})}>
  Edit
</Button>
```

### Pattern 3: Responsive Modal (Mobile/Desktop)

**Use Case**: Different modal sizes for mobile/desktop

```typescript
import { ResponsiveModal } from '@/components/ui/responsive-modal'

export default function CreateItemPage() {
  const isIntercepting = useLocation().state?.fromItems === true

  if (!isIntercepting) {
    return <div className="h-full"><ItemForm /></div>
  }

  return (
    <ResponsiveModal
      open
      onOpenChange={(open) => !open && handleClose()}
      className="max-w-6xl h-[90vh]"
    >
      <ItemForm />
    </ResponsiveModal>
  )
}
```

## Checklist

Before implementing, make sure you have:

- [ ] `FormModal` or `ResponsiveModal` component
- [ ] Form component ready
- [ ] Mutation hook for create/update
- [ ] List/detail page to navigate from

## Quick Reference

### Key Concepts

| Concept                 | What It Does                              |
| ----------------------- | ----------------------------------------- |
| `location.state`        | Passes data between routes                |
| `router.history.back()` | Goes back in browser history              |
| `isIntercepting`        | Determines if route is modal or full page |
| `replace: true`         | Replaces history entry on success         |

### Navigation States

```typescript
// Open as modal
navigate({ to: '/path', state: { fromParent: true } })

// Open as full page
navigate({ to: '/path' })

// Close modal (go back)
router.history.back()

// Close modal (navigate)
navigate({ to: '/parent' })
```

### Conditional Rendering

```typescript
// Check if intercepting
const isIntercepting = location.state?.fromParent === true

// Render accordingly
if (!isIntercepting) {
  return <FullPageView />
}
return <ModalView />
```

## Troubleshooting

### Modal doesn't open

- ✅ Check if you're passing `state: { fromParent: true }`
- ✅ Verify `isIntercepting` is `true`

### Back button doesn't work

- ✅ Use `router.history.back()` instead of `navigate()`
- ✅ Check `handleClose` implementation

### Full page shows instead of modal

- ✅ Ensure navigation includes state
- ✅ Check conditional rendering logic

### Modal shows on direct URL access

- ✅ This is correct behavior! Direct URLs should show full page
- ✅ Only navigation with state should show modal

## Examples in Codebase

See these files for working examples:

- **Parties Create**: `src/app/pages/parties/new.tsx`
- **Parties Edit**: `src/app/pages/parties/[id]/edit.tsx`
- **Items Create**: `src/app/pages/items/create.tsx`

## Next Steps

1. Copy one of the patterns above
2. Replace entity names (parties → your-entity)
3. Update state keys (`fromParties` → `fromYourEntity`)
4. Test navigation and back button
5. Test direct URL access

That's all you need! 🚀
