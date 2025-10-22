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

- Layout: `Card`, `Sheet`, `Dialog`, `Drawer`, `Tabs`, `Accordion`, `Separator`
- Forms: `Input`, `Button`, `Select`, `Checkbox`, `Label`, `Form`, `PhoneInput`
- Navigation: `Sidebar`, `DropdownMenu`, `Command`
- Feedback: `Alert`, `AlertDialog`, `Spinner`, `Skeleton`, `Sonner` (toast)
- Data: `Table`, `Pagination`, `Avatar`, `Badge`
- Utility: `Tooltip`, `Popover`, `ScrollArea`, `AspectRatio`

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

### Global State

- Auth: `stores/auth-store.ts` (Zustand)
- Shop context: `features/shop/components/shop-provider.tsx`

### Server State

- Use SWR for data fetching
- Automatic caching and revalidation
- Error handling built-in

```typescript
import useSWR from 'swr'

function useShops() {
    const { data, error, isLoading } = useSWR('/shops', fetcher)
    return { shops: data, error, isLoading }
}
```

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
