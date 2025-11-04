# TanStack Router Guide - Quick Reference

## Navigation

### Using Type-Safe Navigation Helper

```typescript
import { useTypedNavigate } from '@/lib/router-utils'

function MyComponent() {
  const nav = useTypedNavigate()

  return (
    <>
      <Button onClick={nav.toParties}>View Parties</Button>
      <Button onClick={() => nav.toParty('123')}>View Party 123</Button>
      <Button onClick={nav.back}>Go Back</Button>
    </>
  )
}
```

### Using Link Component

```typescript
import { Link } from '@tanstack/react-router'

// Simple link
<Link to="/parties">Parties</Link>

// With params
<Link to="/parties/$id" params={{ id: '123' }}>
  View Party
</Link>

// With search params
<Link to="/items" search={{ filter: 'active' }}>
  Active Items
</Link>

// With styling
<Link
  to="/parties"
  className="text-primary"
  activeProps={{ className: 'font-bold' }}
>
  Parties
</Link>
```

### Using Navigate Hook

```typescript
import { useNavigate } from '@tanstack/react-router'

function MyComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({ to: '/parties/$id', params: { id: '123' } })
  }

  const handleBack = () => {
    navigate({ to: '..' }) // Go back one level
  }

  return <Button onClick={handleClick}>Navigate</Button>
}
```

## Route Parameters

### Accessing Params

```typescript
import { useParams } from '@tanstack/react-router'

function PartyDetail() {
  // Type-safe params
  const { id } = useParams({ from: '/_protected/_dashboard/parties/$id' })

  return <div>Party ID: {id}</div>
}
```

### Accessing Search Params

```typescript
import { useSearch } from '@tanstack/react-router'

function ItemsList() {
  const search = useSearch({ from: '/_protected/_dashboard/items' })

  return <div>Filter: {search.filter}</div>
}
```

## Creating New Routes

### 1. Create Route File

```typescript
// src/routes/_protected/_dashboard/my-feature.tsx
import { createFileRoute } from '@tanstack/react-router'
import MyFeaturePage from '@/app/routes/my-feature'

export const Route = createFileRoute('/_protected/_dashboard/my-feature')({
    component: MyFeaturePage
})
```

### 2. With Dynamic Params

```typescript
// src/routes/_protected/_dashboard/my-feature/$id.tsx
import { createFileRoute } from '@tanstack/react-router'
import MyFeatureDetail from '@/app/routes/my-feature/[id]'

export const Route = createFileRoute('/_protected/_dashboard/my-feature/$id')({
    component: MyFeatureDetail
})
```

### 3. With Lazy Loading

```typescript
// src/routes/_protected/_dashboard/my-feature.lazy.tsx
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_protected/_dashboard/my-feature')({
    component: () => import('@/app/routes/my-feature').then((m) => m.default)
})
```

### 4. With Layout

```typescript
// src/routes/_protected/_dashboard/my-feature.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import MyFeatureLayout from '@/app/routes/my-feature'

export const Route = createFileRoute('/_protected/_dashboard/my-feature')({
  component: () => <MyFeatureLayout><Outlet /></MyFeatureLayout>
})
```

## Advanced Features

### Route Loaders (Data Fetching)

```typescript
export const Route = createFileRoute('/_protected/_dashboard/parties/$id')({
  loader: async ({ params }) => {
    const party = await fetchParty(params.id)
    return { party }
  },
  component: PartyDetail
})

function PartyDetail() {
  const { party } = Route.useLoaderData()
  return <div>{party.name}</div>
}
```

### Search Params Validation

```typescript
import { z } from 'zod'

export const Route = createFileRoute('/_protected/_dashboard/items')({
    validateSearch: z.object({
        filter: z.enum(['active', 'inactive']).optional(),
        page: z.number().optional(),
        search: z.string().optional()
    })
})
```

### Before Load (Guards)

```typescript
import { redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
    beforeLoad: async ({ context }) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({ to: '/auth' })
        }
    }
})
```

### Pending Component

```typescript
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_protected/_dashboard/parties')({
  pendingComponent: () => <Skeleton className="h-full w-full" />
})
```

### Error Component

```typescript
export const Route = createFileRoute('/_protected/_dashboard/parties/$id')({
  errorComponent: ({ error }) => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-destructive">Error</h2>
      <p>{error.message}</p>
    </div>
  )
})
```

## Route Naming Conventions

### Layout Routes (Prefix `_`)

- `_protected.tsx` - Protected routes wrapper
- `_dashboard.tsx` - Dashboard layout wrapper
- Don't add to URL path

### Dynamic Routes (Prefix `$`)

- `$id.tsx` - Dynamic parameter
- `$slug.tsx` - Dynamic slug
- Access with `useParams()`

### Index Routes

- `index.tsx` - Default child route
- `/parties/index.tsx` → `/parties`

### Lazy Routes (Suffix `.lazy`)

- `settings.lazy.tsx` - Code-split route
- Loads only when accessed

### Nested Routes

```
parties.tsx              → /parties (layout)
  ├── index.tsx          → /parties (default)
  ├── new.tsx            → /parties/new
  ├── $id.tsx            → /parties/:id
  └── $id.edit.tsx       → /parties/:id/edit
```

## Best Practices

### ✅ DO

```typescript
// Use type-safe navigation
const nav = useTypedNavigate()
nav.toParty('123')

// Use Link for navigation
<Link to="/parties/$id" params={{ id }}>View</Link>

// Validate search params
validateSearch: z.object({ ... })

// Use lazy loading for large routes
createLazyFileRoute(...)

// Use pending components
pendingComponent: () => <Skeleton />
```

### ❌ DON'T

```typescript
// Don't use string navigation
navigate('/parties/123') // ❌ Not type-safe

// Don't skip validation
// Always validate search params

// Don't load everything eagerly
// Use lazy loading for heavy routes

// Don't skip loading states
// Always provide pending components
```

## Migration from React Router

### Old (React Router)

```typescript
import { useNavigate, useParams, Link } from 'react-router-dom'

navigate('/parties/123')
const { id } = useParams()
<Link to="/parties">Parties</Link>
```

### New (TanStack Router)

```typescript
import { useNavigate, useParams, Link } from '@tanstack/react-router'

navigate({ to: '/parties/$id', params: { id: '123' } })
const { id } = useParams({ from: '/_protected/_dashboard/parties/$id' })
<Link to="/parties">Parties</Link>
```

## Debugging

### Enable DevTools

DevTools are automatically enabled in development mode. Access them in the bottom-right corner.

### Check Route Tree

```typescript
// View generated route tree
import { routeTree } from '@/routeTree.gen'
console.log(routeTree)
```

### Type Errors

If you get type errors after adding routes:

1. Save all files
2. Wait for route tree regeneration
3. Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

## Performance Tips

1. **Use Lazy Loading**: For routes with heavy components
2. **Preload on Intent**: Routes preload on hover/focus automatically
3. **Code Splitting**: Automatic with lazy routes
4. **Pending States**: Show loading UI immediately
5. **Error Boundaries**: Handle errors gracefully per route

## Common Patterns

### Protected Route with Loader

```typescript
export const Route = createFileRoute('/_protected/_dashboard/parties/$id')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/auth' })
    }
  },
  loader: async ({ params }) => {
    const party = await fetchParty(params.id)
    return { party }
  },
  pendingComponent: () => <Skeleton />,
  errorComponent: ({ error }) => <ErrorDisplay error={error} />,
  component: PartyDetail
})
```

### List with Search

```typescript
export const Route = createFileRoute('/_protected/_dashboard/items')({
  validateSearch: z.object({
    search: z.string().optional(),
    filter: z.enum(['active', 'inactive']).optional()
  }),
  component: ItemsList
})

function ItemsList() {
  const { search, filter } = useSearch({ from: '/_protected/_dashboard/items' })
  const navigate = useNavigate()

  const handleSearch = (value: string) => {
    navigate({ search: { search: value, filter } })
  }

  return <SearchInput value={search} onChange={handleSearch} />
}
```

## Resources

- [TanStack Router Docs](https://tanstack.com/router)
- [Type Safety Guide](https://tanstack.com/router/latest/docs/framework/react/guide/type-safety)
- [File-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- [Data Loading](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading)
