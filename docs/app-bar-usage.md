# App Bar & Header Usage Guide

Complete guide for implementing app bar and header configurations in the Shop Management System.

## Table of Contents

- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [Use Cases](#use-cases)
    - [Simple Title](#1-simple-title)
    - [Title with Actions](#2-title-with-actions)
    - [Complex Title (ReactNode)](#3-complex-title-reactnode)
    - [Back Button](#4-back-button)
    - [Bottom Actions (Mobile)](#5-bottom-actions-mobile)
    - [Custom Quick Actions](#6-custom-quick-actions)
    - [Hide Bottom Actions](#7-hide-bottom-actions)
    - [Desktop Only Configuration](#8-desktop-only-configuration)
- [API Reference](#api-reference)
- [Best Practices](#best-practices)

---

## Overview

The app bar system provides a flexible way to configure the header and mobile bottom actions across your application. It uses React Context and a custom hook for easy integration.

**Key Features:**

- ✅ Simple string or complex ReactNode titles
- ✅ Back button with custom navigation
- ✅ Header action buttons
- ✅ Mobile bottom quick actions
- ✅ Responsive design (mobile/desktop)
- ✅ Automatic cleanup on unmount

---

## Basic Usage

```typescript
import { useAppBar } from '@/hooks/use-app-bar'

function MyPage() {
  useAppBar({
    title: 'My Page',
    showBackButton: true,
    onBack: () => navigate(-1)
  })

  return <div>Page content</div>
}
```

---

## Use Cases

### 1. Simple Title

Basic page with just a title.

```typescript
import { useAppBar } from '@/hooks/use-app-bar'

function ShopsPage() {
  useAppBar({
    title: 'Shops'
  })

  return <div>Shop list...</div>
}
```

**Result:**

- Header shows "Shops" title
- Default bottom actions visible on mobile

---

### 2. Title with Actions

Add action buttons to the header (e.g., settings, filter, search).

```typescript
import { useAppBar } from '@/hooks/use-app-bar'
import { Button } from '@/components/ui/button'
import { Settings, Filter } from 'lucide-react'
import { useMemo } from 'react'

function ShopsPage() {
  const actions = useMemo(
    () => (
      <>
        <Button variant="ghost" size="icon" onClick={handleFilter}>
          <Filter className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleSettings}>
          <Settings className="h-5 w-5" />
        </Button>
      </>
    ),
    []
  )

  useAppBar({
    title: 'Shops',
    actions
  })

  return <div>Shop list...</div>
}
```

**Important:** Always wrap `actions` in `useMemo` to prevent infinite loops.

---

### 3. Complex Title (ReactNode)

Use custom JSX for rich header content with stats, buttons, etc.

```typescript
import { useAppBar } from '@/hooks/use-app-bar'
import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Heading2 } from '@/components/ui/typography'
import { Plus } from 'lucide-react'
import { useMemo } from 'react'

function PartiesPage() {
  const isMobile = useIsMobile()
  const { parties } = useParties()

  const customerCount = useMemo(
    () => parties.filter((p) => p.type === 'customer').length,
    [parties]
  )
  const supplierCount = useMemo(
    () => parties.filter((p) => p.type === 'supplier').length,
    [parties]
  )

  const title = useMemo(
    () => (
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3 justify-between">
          <Heading2>Parties</Heading2>
          <Button
            variant="primary"
            size={isMobile ? 'xs' : 'sm'}
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="size-4" />
            <span className="hidden xs:inline">Add Party</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-muted-foreground">Customers:</span>
            <span className="font-semibold">{customerCount}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-muted-foreground">Suppliers:</span>
            <span className="font-semibold">{supplierCount}</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold">{parties.length}</span>
          </div>
        </div>
      </div>
    ),
    [customerCount, supplierCount, parties.length, isMobile]
  )

  useAppBar({ title })

  return <div>Parties list...</div>
}
```

**Critical:** Always wrap complex title JSX in `useMemo` with proper dependencies to prevent infinite re-renders.

---

### 4. Back Button

Show back button on mobile (typically for detail pages).

```typescript
import { useAppBar } from '@/hooks/use-app-bar'
import { useNavigate } from 'react-router'

function PartyDetailPage() {
  const navigate = useNavigate()

  useAppBar({
    title: 'Party Details',
    showBackButton: true,
    onBack: () => navigate('/parties')
  })

  return <div>Party details...</div>
}
```

**Behavior:**

- Mobile: Shows back arrow instead of sidebar trigger
- Desktop: Shows sidebar trigger (back button ignored)

---

### 5. Bottom Actions (Mobile)

Default bottom actions are shown automatically. Customize them per page.

```typescript
import { useAppBar } from '@/hooks/use-app-bar'
import { Edit, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

function PartyDetailPage() {
  const bottomActions = useMemo(
    () => [
      {
        icon: Edit,
        label: 'Edit',
        onClick: () => setIsEditOpen(true),
        variant: 'outline' as const
      },
      {
        icon: Trash2,
        label: 'Delete',
        onClick: () => setDeleteConfirmOpen(true),
        variant: 'destructive' as const
      }
    ],
    []
  )

  useAppBar({
    title: 'Party Details',
    bottomActions
  })

  return <div>Party details...</div>
}
```

**Result:**

- Mobile: Shows 2 custom buttons + center quick action button
- Desktop: No bottom actions

---

### 6. Custom Quick Actions

Provide custom actions without the center quick action button.

```typescript
import { useAppBar } from '@/hooks/use-app-bar'
import { Save, X } from 'lucide-react'
import { useMemo } from 'react'

function EditPartyPage() {
  const bottomActions = useMemo(
    () => [
      {
        icon: X,
        label: 'Cancel',
        onClick: handleCancel,
        variant: 'outline' as const
      },
      {
        icon: Save,
        label: 'Save',
        onClick: handleSave,
        variant: 'primary' as const
      }
    ],
    []
  )

  useAppBar({
    title: 'Edit Party',
    bottomActions,
    showQuickActionCenter: false // Hide center button
  })

  return <div>Edit form...</div>
}
```

---

### 7. Hide Bottom Actions

Completely hide bottom actions on a page (e.g., full-screen forms).

```typescript
import { useAppBar } from '@/hooks/use-app-bar'

function LoginPage() {
  useAppBar({
    title: 'Login',
    showBottomActions: false
  })

  return <div>Login form...</div>
}
```

---

### 8. Desktop Only Configuration

Apply configuration only on desktop (not mobile).

```typescript
import { useAppBar } from '@/hooks/use-app-bar'

function ReportsPage() {
  useAppBar({
    title: 'Reports',
    mobileOnly: false // Apply to both mobile and desktop
  })

  return <div>Reports...</div>
}
```

**Default:** `mobileOnly: true` (configuration only applies on mobile)

---

## API Reference

### `useAppBar(config?: UseAppBarConfig)`

Hook to configure the app bar and header.

#### Configuration Options

```typescript
interface UseAppBarConfig {
    // Header title (string or custom JSX)
    title?: string | ReactNode

    // Show back button on mobile (replaces sidebar trigger)
    showBackButton?: boolean

    // Callback when back button is clicked
    onBack?: () => void

    // Action buttons in header (right side)
    actions?: ReactNode

    // Show/hide bottom actions on mobile
    showBottomActions?: boolean

    // Custom bottom action buttons (mobile only)
    bottomActions?: QuickAction[]

    // Show/hide center quick action button
    showQuickActionCenter?: boolean

    // Apply config only on mobile (default: true)
    mobileOnly?: boolean
}
```

#### QuickAction Interface

```typescript
interface QuickAction {
    icon: LucideIcon // Icon component
    label: string // Button label
    onClick: () => void // Click handler
    variant?: ButtonVariant // Button variant (optional)
    className?: string // Additional classes (optional)
}
```

#### Button Variants

- `'primary'` - Primary action (default)
- `'secondary'` - Secondary action
- `'outline'` - Outlined button
- `'ghost'` - Ghost button
- `'destructive'` - Destructive action (red)

---

## Best Practices

### 1. Always Use `useMemo` for Complex Values

```typescript
// ✅ CORRECT
const title = useMemo(() => <div>Complex JSX</div>, [dependencies])
const actions = useMemo(() => <Button>Action</Button>, [])

useAppBar({ title, actions })

// ❌ WRONG - Causes infinite loops
useAppBar({
  title: <div>Complex JSX</div>,
  actions: <Button>Action</Button>
})
```

### 2. Include All Dependencies

```typescript
// ✅ CORRECT
const title = useMemo(
  () => <div>{count} items</div>,
  [count] // Include count in dependencies
)

// ❌ WRONG - Stale data
const title = useMemo(
  () => <div>{count} items</div>,
  [] // Missing count dependency
)
```

### 3. Use Type Assertions for Variants

```typescript
// ✅ CORRECT
const bottomActions = useMemo(
    () => [
        {
            icon: Edit,
            label: 'Edit',
            onClick: handleEdit,
            variant: 'outline' as const // Type assertion
        }
    ],
    []
)

// ❌ WRONG - Type error
const bottomActions = [
    {
        icon: Edit,
        label: 'Edit',
        onClick: handleEdit,
        variant: 'outline' // String literal not assignable
    }
]
```

### 4. Clean Navigation Callbacks

```typescript
// ✅ CORRECT
useAppBar({
    onBack: () => navigate('/parties')
})

// ✅ ALSO CORRECT
useAppBar({
    onBack: () => navigate(-1) // Go back in history
})

// ❌ AVOID - Direct function reference may cause issues
useAppBar({
    onBack: navigate // Don't do this
})
```

### 5. Responsive Design

```typescript
// ✅ CORRECT - Consider mobile/desktop
const isMobile = useIsMobile()

const title = useMemo(
  () => (
    <div>
      <Button size={isMobile ? 'xs' : 'sm'}>
        <Plus className="size-4" />
        <span className="hidden xs:inline">Add</span>
      </Button>
    </div>
  ),
  [isMobile]
)
```

### 6. Cleanup is Automatic

The hook automatically resets configuration when the component unmounts. No manual cleanup needed.

```typescript
function MyPage() {
  useAppBar({ title: 'My Page' })
  // Automatically cleaned up on unmount
  return <div>Content</div>
}
```

---

## Common Patterns

### Pattern 1: List Page with Add Button

```typescript
function ListPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const isMobile = useIsMobile()

  const actions = useMemo(
    () => (
      <Button
        variant="primary"
        size={isMobile ? 'xs' : 'sm'}
        onClick={() => setIsFormOpen(true)}
      >
        <Plus className="size-4" />
        <span className="hidden xs:inline">Add</span>
      </Button>
    ),
    [isMobile]
  )

  useAppBar({
    title: 'Items',
    actions
  })

  return <div>List...</div>
}
```

### Pattern 2: Detail Page with Edit/Delete

```typescript
function DetailPage() {
  const navigate = useNavigate()
  const [isEditOpen, setIsEditOpen] = useState(false)

  const actions = useMemo(
    () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    []
  )

  useAppBar({
    title: 'Details',
    showBackButton: true,
    onBack: () => navigate(-1),
    actions
  })

  return <div>Details...</div>
}
```

### Pattern 3: Form Page with Save/Cancel

```typescript
function FormPage() {
  const navigate = useNavigate()

  const bottomActions = useMemo(
    () => [
      {
        icon: X,
        label: 'Cancel',
        onClick: () => navigate(-1),
        variant: 'outline' as const
      },
      {
        icon: Save,
        label: 'Save',
        onClick: handleSave,
        variant: 'primary' as const
      }
    ],
    []
  )

  useAppBar({
    title: 'New Item',
    showBackButton: true,
    onBack: () => navigate(-1),
    bottomActions,
    showQuickActionCenter: false
  })

  return <div>Form...</div>
}
```

---

## Troubleshooting

### Issue: Infinite Loop / Maximum Update Depth Exceeded

**Cause:** Not using `useMemo` for complex values.

**Solution:**

```typescript
// ❌ WRONG
useAppBar({
  title: <div>Title</div>
})

// ✅ CORRECT
const title = useMemo(() => <div>Title</div>, [])
useAppBar({ title })
```

### Issue: Stale Data in Title

**Cause:** Missing dependencies in `useMemo`.

**Solution:**

```typescript
// ❌ WRONG
const title = useMemo(() => <div>{count}</div>, [])

// ✅ CORRECT
const title = useMemo(() => <div>{count}</div>, [count])
```

### Issue: Actions Not Showing

**Cause:** Not wrapping actions in `useMemo`.

**Solution:**

```typescript
// ✅ CORRECT
const actions = useMemo(() => <Button>Action</Button>, [])
useAppBar({ actions })
```

---

## Examples

See these files for real-world examples:

- `src/app/routes/parties/index.tsx` - List page with stats
- `src/app/routes/parties/[id].tsx` - Detail page with actions
- `src/app/routes/shops/index.tsx` - Simple list page

---

## Related Documentation

- [Component Patterns](./.amazonq/rules/component-patterns.md)
- [Project Rules](./.amazonq/rules/project-rules.md)
- [Architecture](./ARCHITECTURE.md)
