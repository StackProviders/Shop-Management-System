# Quick Start for AI Assistants

## Critical Rules (ALWAYS Follow)

1. **Package Manager**: ALWAYS use `pnpm` (never npm, yarn, etc.)
2. **TypeScript**: ALWAYS use proper types (never `any`)
3. **Responsive**: ALWAYS consider desktop AND mobile
4. **Components**: ALWAYS use shadcn/ui components first
5. **Features**: ALWAYS import from feature roots, not internals

## Quick Commands

```bash
pnpm install              # Install dependencies
pnpm tauri dev            # Desktop development
pnpm tauri:android        # Android development
pnpm tauri:ios            # iOS development
pnpm lint                 # Run linter
pnpm format               # Format code
pnpm test                 # Run tests
```

## Import Patterns

```typescript
// ✅ CORRECT
import { useAuthActions } from '@/features/auth'
import { useShopContext } from '@/features/shop'
import { useDebounce } from '@/features/shared'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

// ❌ WRONG
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'
```

## Responsive Pattern (CRITICAL)

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function MyModal({ open, onOpenChange, children }) {
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

## Component Template

```typescript
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface MyComponentProps {
  title: string
  onAction?: () => void
  className?: string
}

export function MyComponent({ title, onAction, className }: MyComponentProps) {
  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      {onAction && (
        <Button onClick={onAction} className="mt-2">
          Action
        </Button>
      )}
    </Card>
  )
}
```

## Form Template

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/button'

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters')
})

export function MyForm({ onSuccess }: { onSuccess?: () => void }) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '' }
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    // Handle submission
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <SubmitButton loading={form.formState.isSubmitting}>
          Submit
        </SubmitButton>
      </form>
    </Form>
  )
}
```

## Hook Template

```typescript
import useSWR from 'swr'
import { useState } from 'react'
import { toast } from 'sonner'

// Data fetching hook
export function useMyData() {
    const { data, error, isLoading, mutate } = useSWR('/api/data', fetcher)

    return {
        data: data ?? [],
        isLoading,
        error,
        refresh: mutate
    }
}

// Action hook
export function useMyActions() {
    const [loading, setLoading] = useState(false)

    const createItem = async (data: any) => {
        setLoading(true)
        try {
            await api.create(data)
            toast.success('Created successfully')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Failed')
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { createItem, loading }
}
```

## Available shadcn/ui Components

**Layout**: Card, Sheet, Dialog, Drawer, Tabs, Accordion, Separator, Sidebar

**Forms**: Input, Button, Select, Checkbox, Label, Form, PhoneInput

**Navigation**: DropdownMenu, Command, Popover

**Feedback**: Alert, AlertDialog, Spinner, Skeleton, Sonner

**Data**: Table, Pagination, Avatar, Badge, Typography, Empty

**Utility**: Tooltip, ScrollArea, AspectRatio, Calendar

## Button Variants

```typescript
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

<Button size="xs">XS</Button>
<Button size="sm">SM</Button>
<Button size="md">MD</Button>
<Button size="lg">LG</Button>

<SubmitButton loading={isLoading}>Submit</SubmitButton>
```

## Styling Pattern

```typescript
import { cn } from '@/lib/utils'

// Always use cn() to merge classes
<div className={cn(
  "base-classes",
  "md:desktop-classes",
  condition && "conditional-classes",
  className
)}>
```

## Error Handling

```typescript
import { toast } from 'sonner'

try {
    await action()
    toast.success('Success message')
} catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    toast.error(message)
}
```

## Loading States

```typescript
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'

if (isLoading) {
  return <Skeleton className="h-20 w-full" />
  // or
  return <Spinner />
}
```

## Empty States

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

## Checklist Before Generating Code

- [ ] Using `pnpm` for any package operations?
- [ ] Using TypeScript with proper types (no `any`)?
- [ ] Considering both desktop and mobile?
- [ ] Using shadcn/ui components when available?
- [ ] Importing from feature roots, not internals?
- [ ] Using `cn()` for class merging?
- [ ] Adding error handling with toast?
- [ ] Including loading and empty states?
- [ ] Following responsive design patterns?
- [ ] Using proper form validation with Zod?

## Documentation References

- **Full Rules**: `project-rules.md`
- **Patterns**: `component-patterns.md`
- **Feature Guide**: `feature-guide.md`
- **Features List**: `../FEATURES.md`
- **Architecture**: `../ARCHITECTURE.md`
- **AI Guide**: `../AI_ASSISTANT_GUIDE.md`
