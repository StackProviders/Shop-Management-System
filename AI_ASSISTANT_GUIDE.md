# AI Assistant Guide

This document provides comprehensive guidelines for AI assistants working on this project.

## Quick Reference

### Package Manager

**ALWAYS use `pnpm`** - Never use npm, yarn, or other package managers.

```bash
pnpm install          # Install dependencies
pnpm add <package>    # Add package
pnpm remove <package> # Remove package
pnpm tauri dev        # Run development
```

### Project Type

- **Desktop & Mobile Application** using Tauri
- **Responsive UI** for all screen sizes
- **TypeScript** with strict type checking
- **Feature-based architecture** (bulletproof-react pattern)

## Architecture Overview

### Directory Structure

```
src/
├── features/              # Feature modules (PRIMARY)
│   ├── auth/             # Authentication
│   ├── shop/             # Shop management
│   └── shared/           # Shared utilities
├── components/           # Shared UI components
│   └── ui/              # shadcn/ui components
├── app/                 # Application layer
│   ├── routes/          # Route components
│   └── router.tsx       # Router config
├── hooks/               # Global hooks
├── lib/                 # Library configs
└── stores/              # Global state
```

### Import Hierarchy

1. **Features** (PRIMARY): `@/features/auth`, `@/features/shop`, `@/features/shared`
2. **UI Components**: `@/components/ui/*`
3. **Custom Components**: `@/components/*`
4. **Hooks**: `@/hooks/*`
5. **Utils**: `@/lib/*`

## Code Generation Rules

### 1. Always Use TypeScript

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

// ❌ WRONG
function getUser(id) {
    // ...
}
```

### 2. Feature-Based Organization

```typescript
// ✅ CORRECT - Import from feature root
import { useAuthActions, LoginForm } from '@/features/auth'
import { useShopContext } from '@/features/shop'

// ❌ WRONG - Don't import from internal paths
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'
```

### 3. Responsive Design (CRITICAL)

**ALWAYS** consider both desktop and mobile:

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function ResponsiveModal({ children, open, onOpenChange }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
```

### 4. Use shadcn/ui Components First

**Component Priority:**

1. shadcn/ui components (`@/components/ui/*`)
2. Custom components (`@/components/*`)
3. Create new only when necessary

**Available Components:**

- Layout: Card, Sheet, Dialog, Drawer, Tabs, Accordion
- Forms: Input, Button, Select, Checkbox, Form
- Navigation: Sidebar, DropdownMenu, Command
- Feedback: Alert, Spinner, Skeleton, Sonner
- Data: Table, Pagination, Avatar, Badge

### 5. Styling with Tailwind

```typescript
import { cn } from '@/lib/utils'

// ✅ CORRECT - Use cn() to merge classes
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

### 6. State Management

```typescript
// Local state
const [value, setValue] = useState('')

// Global state (Zustand)
import { useAuthStore } from '@/stores/auth-store'

// Server state (SWR)
import useSWR from 'swr'
const { data, error, isLoading } = useSWR('/api/shops', fetcher)

// Form state (React Hook Form)
import { useForm } from 'react-hook-form'
const form = useForm()
```

### 7. Error Handling

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

### 8. Forms with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().email('Invalid email')
})

function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '' }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
```

## Common Tasks

### Creating a New Feature

1. Create directory: `src/features/my-feature/`
2. Add subdirectories: `api/`, `components/`, `hooks/`, `types/`, `utils/`
3. Define types in `types/index.ts`
4. Create API layer in `api/*.api.ts`
5. Create hooks in `hooks/use-*.ts`
6. Create components in `components/*.tsx`
7. Export from `index.ts`
8. Add route in `src/app/routes/`

See `.amazonq/rules/feature-guide.md` for detailed steps.

### Creating a New Component

```typescript
// src/components/my-component.tsx
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

### Creating a New Hook

```typescript
// src/features/my-feature/hooks/use-my-data.ts
import useSWR from 'swr'
import { myFeatureApi } from '../api/my-feature.api'

export function useMyData() {
    const { data, error, isLoading, mutate } = useSWR(
        '/my-feature/data',
        myFeatureApi.getData
    )

    return {
        data: data ?? [],
        isLoading,
        error,
        refresh: mutate
    }
}
```

### Adding a New Route

```typescript
// src/app/routes/my-page.tsx
import { MyFeatureList } from '@/features/my-feature'

export default function MyPage() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-2xl font-bold">My Page</h1>
      <MyFeatureList />
    </div>
  )
}

// Add to src/app/router.tsx
import MyPage from './routes/my-page'

{
  path: '/my-page',
  element: <MyPage />
}
```

## Button Variants Reference

```typescript
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="dashed">Dashed</Button>

// Sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon Only</Button>

// Special
<SubmitButton loading={isLoading}>Submit</SubmitButton>
<Button mode="link">Link Style</Button>
```

## Performance Optimization

```typescript
// Code splitting
const MyComponent = React.lazy(() => import('./MyComponent'))

// Debouncing
import { useDebounce } from '@/features/shared'
const debouncedValue = useDebounce(value, 500)

// Memoization
const memoizedValue = useMemo(() => computeExpensive(data), [data])
const memoizedCallback = useCallback(() => doSomething(), [])
```

## Testing

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from './my-component'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

## Common Patterns

### Loading States

```typescript
import { Skeleton } from '@/components/ui/skeleton'

if (isLoading) {
  return <Skeleton className="h-20 w-full" />
}
```

### Empty States

```typescript
import { Empty } from '@/components/ui/empty'

if (items.length === 0) {
  return (
    <Empty
      title="No items found"
      description="Create your first item"
      action={<Button>Create</Button>}
    />
  )
}
```

### Confirmation Dialogs

```typescript
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleConfirm}>
        Confirm
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Security Considerations

- Never expose API keys or secrets
- Validate all user inputs with Zod schemas
- Use role-based access control (RBAC)
- Check permissions before actions
- Sanitize user-generated content

## Documentation References

- **Architecture**: `ARCHITECTURE.md`
- **Features Guide**: `src/features/README.md`
- **Project Rules**: `.amazonq/rules/project-rules.md`
- **Component Patterns**: `.amazonq/rules/component-patterns.md`
- **Feature Development**: `.amazonq/rules/feature-guide.md`

## Checklist for AI Assistants

When generating code, ensure:

- [ ] Using `pnpm` for package management
- [ ] TypeScript with proper types (no `any`)
- [ ] Responsive design (mobile & desktop)
- [ ] Using shadcn/ui components when available
- [ ] Following feature-based architecture
- [ ] Importing from feature roots, not internals
- [ ] Error handling with toast notifications
- [ ] Form validation with Zod
- [ ] Loading and empty states
- [ ] Tailwind CSS for styling with `cn()` utility
- [ ] Accessibility considerations
- [ ] Comments only when necessary (self-documenting code)

## Getting Help

If you need clarification:

1. Check `ARCHITECTURE.md` for architecture details
2. Check `.amazonq/rules/` for specific patterns
3. Check `src/features/README.md` for feature examples
4. Look at existing code in similar features
5. Ask the user for clarification
