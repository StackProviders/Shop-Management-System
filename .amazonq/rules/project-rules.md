# Amazon Q Project Rules

## 📦 Package Manager

**ALWAYS use `pnpm`** - Never npm, yarn, or other package managers.

## 🏗️ Architecture

- **Feature-based** structure in `src/features/`
- **Import from feature roots**: `@/features/auth` not `@/features/auth/hooks/use-auth`
- **Component priority**: Common → shadcn/ui → Custom → Create new

## 🎯 Quick Patterns

### Create Feature (45 lines)

```typescript
// 1. Types (5 lines)
export interface MyFeature { id: string; shopId: string; name: string }

// 2. Query (10 lines)
export function useMyFeatures(shopId: string) {
    const firestore = useFirestore()
    const q = query(collection(firestore, 'my-features'), where('shopId', '==', shopId))
    const { status, data } = useFirestoreCollectionData(q, { idField: 'id' })
    return { features: (data as MyFeature[]) ?? [], isLoading: status === 'loading' }
}

// 3. Mutations (3 lines)
export function useMyFeatureMutations(shopId: string) {
    return useCrudOperations<MyFeature>('my-features', shopId)
}

// 4. Page (20 lines)
export default function MyFeaturePage({ children }) {
    const { features } = useMyFeatures(shopId)
    return (
        <ListDetailPage
            title="My Feature"
            items={features as unknown as Array<Record<string, unknown> & { id: string }>}
            searchKeys={['name']}
            renderItem={(item) => <div>{(item as unknown as MyFeature).name}</div>}
            onItemClick={(item) => navigate(`/my-feature/${item.id}`)}
            createPath="/my-feature/new"
        >
            {children}
        </ListDetailPage>
    )
}

// 5. Route (5 lines)
export const Route = createFileRoute('/_protected/_dashboard/my-feature')({
    component: () => <MyFeaturePage><Outlet /></MyFeaturePage>
})
```

### Responsive Modal

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

export function ResponsiveModal({ open, onOpenChange, children }) {
    const isMobile = useIsMobile()
    if (isMobile) return <Drawer open={open} onOpenChange={onOpenChange}><DrawerContent>{children}</DrawerContent></Drawer>
    return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent>{children}</DialogContent></Dialog>
}
```

### Form with Validation

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CrudForm } from '@/components/common'

const schema = z.object({ name: z.string().min(3) })

export function MyForm() {
    const form = useForm({ resolver: zodResolver(schema), defaultValues: { name: '' } })
    const { create } = useMyFeatureMutations(shopId)
    return <CrudForm form={form} onSubmit={async (data) => await create(data)} submitLabel="Create"><FormField .../></CrudForm>
}
```

## 📚 Full Documentation

See `/docs/ai-rules/` for comprehensive guides:

- `01-project-standards.md` - Standards & conventions
- `02-architecture-patterns.md` - Architecture patterns
- `03-component-patterns.md` - Component patterns
- `05-quick-start.md` - Quick reference

## ✅ Checklist

- [ ] Using `pnpm`?
- [ ] TypeScript with proper types (no `any`)?
- [ ] Responsive design (mobile & desktop)?
- [ ] Using common components first?
- [ ] Importing from feature roots?
- [ ] Error handling with toast?
- [ ] Form validation with Zod?
