# Shop Management System - AI Assistant Rules

## Package Manager

- **ALWAYS use `pnpm`** for all package management operations
- Never use npm, yarn, or other package managers
- Commands: `pnpm install`, `pnpm add`, `pnpm remove`, `pnpm tauri dev`

## Project Architecture

### Feature-Based Structure

- Follow **bulletproof-react** architecture pattern
- Organize code by features in `src/features/`
- Each feature is self-contained with: `api/`, `components/`, `hooks/`, `types/`, `utils/`
- Use barrel exports (`index.ts`) for clean imports

### Import Patterns

```typescript
// ✅ CORRECT - Import from feature root
import { useAuthActions, LoginForm } from '@/features/auth'
import { useShopContext, ShopProvider } from '@/features/shop'
import { useDebounce, formatDate } from '@/features/shared'

// ❌ WRONG - Don't import from internal paths
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'
```

## UI/UX Guidelines

### Responsive Design (Desktop & Mobile)

- **ALWAYS** design for both desktop and mobile
- Use `useIsMobile()` hook from `@/hooks/use-mobile` to detect screen size
- Mobile breakpoint: 768px
- Use responsive Tailwind classes: `md:`, `lg:`, `sm:`

### Component Usage Priority

1. **shadcn/ui components** from `@/components/ui/` (PRIMARY)
2. **Custom components** from `@/components/` (SECONDARY)
3. Create new components only when necessary

### Available shadcn/ui Components

- Layout: `Card`, `Sheet`, `Dialog`, `Drawer`, `Tabs`, `Accordion`, `Separator`, `ListDetailLayout` (see below)
- Forms: `Input`, `Button`, `Select`, `Checkbox`, `Label`, `Form`, `PhoneInput`
- Navigation: `Sidebar`, `DropdownMenu`, `Command`
- Feedback: `Alert`, `AlertDialog`, `Spinner`, `Skeleton`, `Sonner` (toast)
- Data: `Table`, `Pagination`, `Avatar`, `Badge`
- Utility: `Tooltip`, `Popover`, `ScrollArea`, `AspectRatio`

### List Detail Layout System

**CRITICAL: Use for all master-detail interfaces**

Import from `@/components/ui/list-detail-layout`:

```typescript
import {
    ListDetailRoot,
    ListDetailHeader,
    ListDetailHeaderContent,
    ListDetailHeaderTitle,
    ListDetailHeaderActions,
    ListDetailStats,
    ListDetailStat,
    ListDetailBody,
    ListDetailList,
    ListDetailListHeader,
    ListDetailListContent,
    ListDetailContent,
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
} from '@/components/ui/list-detail-layout'
```

**When to Use:**

- Building list + detail views (e.g., Parties, Products, Orders)
- Creating master-detail interfaces
- Any page with sidebar list and detail panel

**Basic Structure:**

```typescript
<ListDetailRoot>
    <ListDetailHeader isRouteActive={isRouteActive}>
        <ListDetailHeaderContent>
            <ListDetailHeaderTitle>Title</ListDetailHeaderTitle>
            <ListDetailHeaderActions>
                <Button>Add New</Button>
            </ListDetailHeaderActions>
        </ListDetailHeaderContent>
        <ListDetailStats>
            <ListDetailStat label="Total" value={100} />
        </ListDetailStats>
    </ListDetailHeader>

    <ListDetailBody>
        <ListDetailList isRouteActive={isRouteActive}>
            <ListDetailListHeader>
                <SearchInput />
            </ListDetailListHeader>
            <ListDetailListContent>
                {/* List items */}
            </ListDetailListContent>
        </ListDetailList>

        <ListDetailContent isRouteActive={isRouteActive}>
            <Outlet />
        </ListDetailContent>
    </ListDetailBody>
</ListDetailRoot>
```

**Detail Page Structure:**

```typescript
<>
    <ListDetailContentHeader>
        <ListDetailContentHeaderTitle>
            <h2>Item Name</h2>
            <Button>Edit</Button>
        </ListDetailContentHeaderTitle>
        <ListDetailContentHeaderInfo>
            <ListDetailContentHeaderInfoItem label="Email" value="email@example.com" />
            <ListDetailContentHeaderInfoItem label="Phone" value="+1234567890" />
        </ListDetailContentHeaderInfo>
    </ListDetailContentHeader>

    <ListDetailContentBody>
        {/* Main content */}
    </ListDetailContentBody>
</>
```

**Required Props:**

- `isRouteActive`: Boolean indicating if detail route is active
    ```typescript
    const isRouteActive = useMemo(
        () => !!id || pathname.includes('/new') || pathname.includes('/edit'),
        [id, pathname]
    )
    ```

**Key Features:**

- ✅ Fully responsive (mobile/desktop)
- ✅ Automatic show/hide on mobile
- ✅ Composable components
- ✅ Type-safe with TypeScript
- ✅ Accepts `className` for customization
- ✅ Built-in `ScrollArea` support

**Documentation:** See `src/components/ui/list-detail-layout.md` for complete guide

**Examples:**

- Parties: `src/app/routes/parties/index.tsx`
- Party Detail: `src/features/parties/components/party-detail.tsx`

### Mobile-First Components

```typescript
// Use Drawer for mobile, Dialog for desktop
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function ResponsiveModal() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Drawer><DrawerContent>...</DrawerContent></Drawer>
  }

  return <Dialog><DialogContent>...</DialogContent></Dialog>
}
```

### Button Variants

```typescript
// Available variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<SubmitButton loading={isLoading}>Submit</SubmitButton>
```

## Code Style

### TypeScript

- **ALWAYS** use TypeScript with proper types
- Define interfaces for all data structures
- Use type inference where appropriate
- Avoid `any` type

```typescript
// ✅ CORRECT
interface CreateShopData {
    shopname: string
    email?: string
}

function createShop(data: CreateShopData): Promise<Shop> {
    // ...
}

// ❌ WRONG
function createShop(data: any) {
    // ...
}
```

### React Patterns

- Use functional components with hooks
- Extract business logic into custom hooks
- Keep components focused on UI
- Use `React.memo()` for expensive components

```typescript
// ✅ CORRECT - Logic in hook
function useShopForm() {
  const { createShop } = useShopActions()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data: CreateShopData) => {
    setLoading(true)
    await createShop(data)
    setLoading(false)
  }

  return { handleSubmit, loading }
}

// Component uses the hook
function ShopForm() {
  const { handleSubmit, loading } = useShopForm()
  return <form onSubmit={handleSubmit}>...</form>
}
```

### Styling

- Use Tailwind CSS for all styling
- Use `cn()` utility from `@/lib/utils` to merge classes
- Follow mobile-first approach
- Use design tokens from theme

```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  "flex items-center gap-2",
  "md:gap-4 md:flex-row",
  isMobile && "flex-col"
)}>
```

## State Management

### Local State

- Use `useState` for component-level state
- Use `useReducer` for complex state logic

### Global State (Zustand)

- Use `createEntityStore` from `@/features/shared` for entity management
- Automatic optimistic updates support
- Centralized state with minimal re-renders

### Server State (Firestore Real-time)

- Use query-based API with `createFirestoreApi`
- Real-time subscriptions with automatic updates
- Optimistic updates for instant UI feedback

```typescript
// Create store
import { createEntityStore } from '@/features/shared'
export const useMyStore = createEntityStore<MyEntity>()

// Use in hook
import { useEffect } from 'react'
import { myApi, myQueries } from '../api/my.api'
import { useMyStore } from './use-my-store'

export function useMyEntities() {
    const { items, setItems, setLoading, setError } = useMyStore()

    useEffect(() => {
        setLoading(true)
        const unsubscribe = myApi.subscribe(
            myQueries.all(),
            (data) => {
                setItems(data)
                setLoading(false)
            },
            (err) => setError(err.message)
        )
        return () => unsubscribe()
    }, [])

    return { entities: items }
}
```

**See `state-management.md` for complete guide**

## Error Handling

- Always wrap async operations in try-catch
- Use toast notifications for user feedback
- Provide meaningful error messages

```typescript
import { toast } from 'sonner'

try {
    await createShop(data)
    toast.success('Shop created successfully')
} catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    toast.error(message)
}
```

## Forms

- Use `react-hook-form` with `zod` validation
- Use `Form` component from `@/components/ui/form`
- Validate on submit, show errors inline

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  shopname: z.string().min(3, 'Name must be at least 3 characters')
})

function ShopForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })

  return <Form {...form}>...</Form>
}
```

## Performance

- Use `React.lazy()` for code splitting
- Debounce search inputs with `useDebounce` from `@/features/shared`
- Memoize expensive calculations with `useMemo`
- Memoize callbacks with `useCallback`

## Testing

- Write tests for utilities and hooks
- Use React Testing Library for components
- Test user interactions, not implementation details

## File Naming

- Components: PascalCase (`ShopDashboard.tsx`)
- Hooks: camelCase with `use` prefix (`use-shop-actions.ts`)
- Utils: kebab-case (`format-date.ts`)
- Types: kebab-case (`shop-types.ts`)

## Comments

- Minimize comments by writing self-documenting code
- Use JSDoc for public APIs
- Explain "why", not "what"

## Component Documentation

- List Detail Layout: `src/components/ui/list-detail-layout.md`
- Component Patterns: `.amazonq/rules/component-patterns.md`
- Feature Guide: `.amazonq/rules/feature-guide.md`

## Security

- Never expose API keys or secrets
- Validate all user inputs
- Use role-based access control (RBAC)
- Check permissions before actions

```typescript
import { hasPermission } from '@/features/shop'

if (!hasPermission(userRole, 'manage_members')) {
    toast.error('You do not have permission')
    return
}
```

## Tauri-Specific

- Use Tauri plugins for native features
- Handle both web and native contexts
- Test on both desktop and mobile platforms

## Git Workflow

- Write clear commit messages
- Use conventional commits format
- Run linter before committing (automatic via Husky)

## Documentation

- Update README.md when adding features
- Document complex logic
- Keep architecture docs in sync

## List Detail Layout Rules

**ALWAYS use List Detail Layout components for master-detail interfaces**

### Component Selection Rules

1. **List Page (with sidebar):**
    - Start with `ListDetailRoot`
    - Add `ListDetailHeader` for page header
    - Use `ListDetailBody` for main content
    - Use `ListDetailList` for left sidebar
    - Use `ListDetailContent` with `<Outlet />` for detail

2. **Detail Page (right side):**
    - Use `ListDetailContentHeader` for header card
    - Use `ListDetailContentHeaderInfo` for info grid
    - Use `ListDetailContentBody` for main content

3. **Always pass `isRouteActive`:**
    ```typescript
    const isRouteActive = useMemo(
        () => !!id || pathname.includes('/new') || pathname.includes('/edit'),
        [id, pathname]
    )
    ```

### Code Generation Rules

**DO:**

- ✅ Import only needed components
- ✅ Pass `isRouteActive` to Header, List, and Content
- ✅ Use `Outlet` in `ListDetailContent`
- ✅ Compose components for flexibility
- ✅ Add `className` for custom styling
- ✅ Use `ListDetailContentHeaderInfoItem` for info display

**DON'T:**

- ❌ Create custom divs for layout structure
- ❌ Use `Card` component for detail headers
- ❌ Hardcode responsive behavior
- ❌ Skip `isRouteActive` prop
- ❌ Mix old and new patterns

### Migration Pattern

```typescript
// ❌ OLD - Don't use
<Card>
    <CardContent>
        <div className="flex justify-between">
            <h2>{title}</h2>
            <Button>Edit</Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
            <div>
                <span>Label:</span>
                <span>{value}</span>
            </div>
        </div>
    </CardContent>
</Card>

// ✅ NEW - Use this
<ListDetailContentHeader>
    <ListDetailContentHeaderTitle>
        <h2>{title}</h2>
        <Button>Edit</Button>
    </ListDetailContentHeaderTitle>
    <ListDetailContentHeaderInfo>
        <ListDetailContentHeaderInfoItem label="Label" value={value} />
    </ListDetailContentHeaderInfo>
</ListDetailContentHeader>
```

### Quick Reference

**Page Header:** `ListDetailHeader` → `ListDetailHeaderContent` → `ListDetailHeaderTitle` + `ListDetailHeaderActions`

**List Sidebar:** `ListDetailList` → `ListDetailListHeader` + `ListDetailListContent`

**Detail Content:** `ListDetailContent` → `ListDetailContentHeader` + `ListDetailContentBody`

**Info Display:** `ListDetailContentHeaderInfo` → `ListDetailContentHeaderInfoItem` (multiple)

**Full docs:** `src/components/ui/list-detail-layout.md`
