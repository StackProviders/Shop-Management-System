# Quick Start Guide

## 🚀 Common Tasks

### Create New List-Detail Feature (5 minutes)

```typescript
// 1. Create types (src/features/my-feature/types/index.ts)
export interface MyFeature {
    id: string
    shopId: string
    name: string
    code: string
    createdAt: Date | Timestamp
    updatedAt: Date | Timestamp
}

// 2. Create query hook (src/features/my-feature/hooks/use-my-feature-queries.ts)
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'

export function useMyFeatures(shopId: string) {
    const firestore = useFirestore()
    const q = query(
        collection(firestore, 'my-features'),
        where('shopId', '==', shopId)
    )
    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })
    return {
        features: (data as MyFeature[]) ?? [],
        isLoading: status === 'loading'
    }
}

// 3. Create mutation hook (src/features/my-feature/hooks/use-my-feature-mutations.ts)
import { useCrudOperations } from '@/features/shared'
export function useMyFeatureMutations(shopId: string) {
    return useCrudOperations<MyFeature>('my-features', shopId)
}

// 4. Create page (src/app/pages/my-feature/index.tsx)
import { ListDetailPage } from '@/components/common'
import { useMyFeatures } from '@/features/my-feature'

export default function MyFeaturePage({ children }) {
    const { features } = useMyFeatures(shopId)
    return (
        <ListDetailPage
            title="My Feature"
            items={features}
            searchKeys={['name', 'code']}
            renderItem={(item) => <div>{item.name}</div>}
            onItemClick={(item) => navigate(`/my-feature/${item.id}`)}
            createPath="/my-feature/new"
        >
            {children}
        </ListDetailPage>
    )
}

// 5. Create route (src/routes/_protected/_dashboard/my-feature.tsx)
import { createFileRoute, Outlet } from '@tanstack/react-router'
import MyFeaturePage from '@/app/pages/my-feature'

export const Route = createFileRoute('/_protected/_dashboard/my-feature')({
    component: () => <MyFeaturePage><Outlet /></MyFeaturePage>
})

// 6. Export from feature (src/features/my-feature/index.ts)
export * from './hooks/use-my-feature-queries'
export * from './hooks/use-my-feature-mutations'
export * from './types'
```

**Total: ~50 lines instead of 300+!**

### Create Form Component

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CrudForm } from '@/components/common'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const schema = z.object({
    name: z.string().min(3),
    code: z.string().min(2)
})

export function MyFeatureForm({ onSuccess }: { onSuccess?: () => void }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { name: '', code: '' }
    })

    const { create } = useMyFeatureMutations(shopId)

    return (
        <CrudForm
            form={form}
            onSubmit={async (data) => {
                await create(data)
                onSuccess?.()
            }}
            submitLabel="Create"
        >
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
        </CrudForm>
    )
}
```

### Add Search/Filter

```typescript
import { useSearchFilter } from '@/features/shared'

const { search, setSearch, filtered } = useSearchFilter(
    items,
    ['name', 'code', 'description']
)

<SearchInput value={search} onValueChange={setSearch} />
{filtered.map(item => <ItemCard key={item.id} item={item} />)}
```

### Create Responsive Modal

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

export function ResponsiveModal({ open, onOpenChange, children }) {
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

## 📦 Common Imports

```typescript
// Common Components
import { ListDetailPage, VirtualizedList, CrudForm } from '@/components/common'

// UI Components
import { Button, Input, Select, Dialog, Drawer } from '@/components/ui'

// Shared Hooks
import { useCrudOperations, useSearchFilter } from '@/features/shared'

// Global Hooks
import { useIsMobile } from '@/hooks/use-mobile'

// Utils
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// ReactFire
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { collection, query, where } from 'firebase/firestore'

// Router
import { useNavigate, useParams, Link } from '@tanstack/react-router'

// Forms
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
```

## 🎨 Common Patterns

### Button Variants

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

### Error Handling

```typescript
import { toast } from 'sonner'

try {
    await action()
    toast.success('Success!')
} catch (error) {
    toast.error(error instanceof Error ? error.message : 'Failed')
}
```

### Responsive Design

```typescript
// Mobile-first classes
<div className="flex flex-col md:flex-row gap-2 md:gap-4">
    <div className="w-full md:w-1/2">Content</div>
</div>

// Responsive text
<h1 className="text-xl md:text-2xl lg:text-3xl">Title</h1>

// Responsive padding
<div className="p-4 md:p-6 lg:p-8">Content</div>
```

## 🔧 Common Scripts

```bash
# Development
pnpm tauri dev              # Desktop development
pnpm tauri:android          # Android development
pnpm tauri:ios              # iOS development

# Code Quality
pnpm check:types            # Type check
pnpm lint                   # Lint code
pnpm lint:fix               # Fix lint issues
pnpm format                 # Format code
pnpm validate               # Run all checks

# Build
pnpm build                  # Build web assets
pnpm tauri build            # Build desktop app

# Analysis
pnpm clean:unused           # Find unused files
pnpm analyze:bundle         # Analyze bundle size
pnpm check:circular         # Find circular dependencies
```

## ✅ Checklist

Before generating code:

- [ ] Using `pnpm` for package operations?
- [ ] TypeScript with proper types (no `any`)?
- [ ] Responsive design (mobile & desktop)?
- [ ] Using common components first?
- [ ] Importing from feature roots?
- [ ] Error handling with toast?
- [ ] Loading and empty states?
- [ ] Form validation with Zod?

## 📚 Quick Reference Links

- **[01-project-standards.md](./01-project-standards.md)** - Standards & conventions
- **[02-architecture-patterns.md](./02-architecture-patterns.md)** - Architecture patterns
- **[03-component-patterns.md](./03-component-patterns.md)** - Component patterns
- **[06-feature-development.md](./06-feature-development.md)** - Detailed feature guide
