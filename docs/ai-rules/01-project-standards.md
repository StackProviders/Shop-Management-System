# Project Standards & Conventions

## Package Manager

**CRITICAL**: ALWAYS use `pnpm` for all package operations.

```bash
pnpm install              # Install dependencies
pnpm add <package>        # Add package
pnpm remove <package>     # Remove package
pnpm tauri dev            # Run development
```

## TypeScript Standards

### Always Use Proper Types

```typescript
// ✅ CORRECT
interface User {
    id: string
    name: string
    email?: string
}

function getUser(id: string): Promise<User> {
    // ...
}

// ❌ WRONG - Never use 'any'
function getUser(id: any): any {
    // ...
}
```

### Generic Constraints

```typescript
// ✅ CORRECT - Proper constraints
function processItems<T extends Record<string, unknown> & { id: string }>(
    items: T[]
): T[] {
    return items.filter((item) => item.id)
}

// ❌ WRONG - No constraints
function processItems<T>(items: T[]): T[] {
    return items.filter((item: any) => item.id)
}
```

## Import Standards

### Feature Imports

```typescript
// ✅ CORRECT - Import from feature roots
import { useAuthActions, LoginForm } from '@/features/auth'
import { useShopContext } from '@/features/shop'
import { useCrudOperations, useSearchFilter } from '@/features/shared'

// ❌ WRONG - Don't import from internal paths
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'
import { LoginForm } from '@/features/auth/components/login-form'
```

### Component Imports

```typescript
// ✅ CORRECT - Priority order
import { ListDetailPage, VirtualizedList } from '@/components/common'
import { Button, Input } from '@/components/ui'
import { AppSidebar } from '@/components'

// ❌ WRONG - Importing from internal paths
import { ListDetailPage } from '@/components/common/list-detail-page'
```

## File Naming Conventions

- **Components**: PascalCase (`ItemForm.tsx`, `PartyList.tsx`)
- **Hooks**: kebab-case with `use-` prefix (`use-items.ts`, `use-crud-operations.ts`)
- **Utils**: kebab-case (`format-date.ts`, `validation.ts`)
- **Types**: kebab-case (`index.ts`, `settings.ts`)
- **Pages**: kebab-case (`index.tsx`, `[id].tsx`)

## Directory Structure

```
src/
├── features/              # Feature modules (PRIMARY)
│   ├── auth/             # Authentication feature
│   ├── shop/             # Shop management feature
│   ├── items/            # Items feature
│   ├── parties/          # Parties feature
│   └── shared/           # Shared utilities
├── components/           # Shared components
│   ├── common/           # Common reusable components (USE FIRST)
│   ├── ui/               # shadcn/ui components
│   └── layouts/          # Layout components
├── app/                  # Application layer
│   ├── pages/            # Page components
│   └── router.tsx        # Router configuration
├── hooks/                # Global hooks
├── lib/                  # Library configurations
└── stores/               # Global state stores
```

## Feature Structure

```
src/features/my-feature/
├── api/                  # API layer (optional)
├── components/           # Feature-specific components
├── hooks/                # Feature-specific hooks
│   ├── use-my-feature-queries.ts    # Read operations
│   └── use-my-feature-mutations.ts  # Write operations
├── types/                # TypeScript interfaces
├── utils/                # Feature utilities
└── index.ts              # Barrel export
```

## Code Style

### Styling with Tailwind

```typescript
import { cn } from '@/lib/utils'

// ✅ CORRECT - Use cn() for class merging
<div className={cn(
  "flex items-center gap-2",
  "md:gap-4 md:flex-row",
  isMobile && "flex-col",
  className
)}>

// ✅ CORRECT - Mobile-first responsive
<div className="text-sm md:text-base lg:text-lg">

// ❌ WRONG - Don't use inline styles
<div style={{ display: 'flex' }}>
```

### Component Structure

```typescript
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface MyComponentProps {
  title: string
  onAction?: () => void
  className?: string
}

export function MyComponent({ title, onAction, className }: MyComponentProps) {
  return (
    <div className={cn("p-4 rounded-lg border", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {onAction && (
        <Button onClick={onAction} className="mt-2">
          Action
        </Button>
      )}
    </div>
  )
}
```

## Error Handling

```typescript
import { toast } from 'sonner'

// ✅ CORRECT - Always use toast for user feedback
try {
    await createItem(data)
    toast.success('Item created successfully')
} catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    toast.error(message)
}

// ✅ CORRECT - Loading toast pattern
const toastId = toast.loading('Creating item...')
try {
    await createItem(data)
    toast.success('Item created', { id: toastId })
} catch (error) {
    toast.error('Failed to create', { id: toastId })
}
```

## Performance Standards

### Memoization

```typescript
// Memoize expensive calculations
const filteredItems = useMemo(() => {
    return items.filter((item) => item.name.includes(search))
}, [items, search])

// Memoize callbacks
const handleClick = useCallback(
    (id: string) => {
        navigate(`/items/${id}`)
    },
    [navigate]
)

// Memoize components
const MemoizedItem = React.memo(ItemCard)
```

### Code Splitting

```typescript
// Lazy load routes
const ItemsPage = lazy(() => import('./routes/items'))

// Use Suspense
<Suspense fallback={<Skeleton />}>
    <ItemsPage />
</Suspense>
```

## Security Standards

```typescript
// ✅ CORRECT - Check permissions
import { hasPermission } from '@/features/shop'

if (!hasPermission(userRole, 'manage_items')) {
    toast.error('You do not have permission')
    return
}

// ✅ CORRECT - Validate inputs
const schema = z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/)
})

// ✅ CORRECT - Never expose secrets
const apiKey = import.meta.env.NEXT_PUBLIC_API_KEY
```

## Documentation Standards

### Component Documentation

````typescript
/**
 * ListDetailPage - Reusable list-detail layout component
 *
 * @example
 * ```tsx
 * <ListDetailPage
 *   title="Items"
 *   items={items}
 *   searchKeys={['name']}
 *   renderItem={(item) => <ItemCard item={item} />}
 *   onItemClick={(item) => navigate(`/items/${item.id}`)}
 *   createPath="/items/new"
 * >
 *   {children}
 * </ListDetailPage>
 * ```
 */
export function ListDetailPage<
    T extends Record<string, unknown> & { id: string }
>(
    {
        // ...
    }
) {
    // ...
}
````

### Hook Documentation

````typescript
/**
 * useCrudOperations - Generic CRUD operations for Firestore
 *
 * @param collectionName - Firestore collection name
 * @param shopId - Shop ID for filtering
 * @returns Object with create, update, and remove functions
 *
 * @example
 * ```tsx
 * const { create, update, remove } = useCrudOperations<Item>('items', shopId)
 * await create({ name: 'New Item' })
 * ```
 */
export function useCrudOperations<T>(collectionName: string, shopId: string) {
    // ...
}
````

## Commit Standards

### Conventional Commits

```bash
feat: add new feature
fix: fix bug
docs: update documentation
style: format code
refactor: refactor code
test: add tests
chore: update dependencies
```

### Examples

```bash
feat(items): add virtualized list support
fix(auth): resolve login redirect issue
docs(ai-rules): update component patterns
refactor(parties): use ListDetailPage component
```

## Testing Standards

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { ItemList } from './item-list'

describe('ItemList', () => {
    it('renders items when loaded', async () => {
        render(<ItemList shopId="test-shop" />)

        await waitFor(() => {
            expect(screen.getByText('Item 1')).toBeInTheDocument()
        })
    })

    it('shows loading state', () => {
        render(<ItemList shopId="test-shop" />)
        expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })
})
```

## Checklist for AI Assistants

When generating code, ensure:

- [ ] Using `pnpm` for package management
- [ ] TypeScript with proper types (no `any`)
- [ ] Responsive design (mobile & desktop)
- [ ] Using common components first
- [ ] Following feature-based architecture
- [ ] Importing from feature roots
- [ ] Error handling with toast
- [ ] Form validation with Zod
- [ ] Loading and empty states
- [ ] Tailwind CSS with `cn()` utility
- [ ] Accessibility considerations
- [ ] Self-documenting code
