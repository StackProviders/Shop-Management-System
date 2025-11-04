# TanStack Router Migration Guide

## Installation Complete ✅

```bash
pnpm remove react-router-dom
pnpm add @tanstack/react-router
pnpm add -D @tanstack/router-vite-plugin @tanstack/router-devtools
```

## Routes Created ✅

- `src/routes/__root.tsx` - Root layout
- `src/routes/auth.tsx` - Auth page
- `src/routes/_protected.tsx` - Protected layout
- `src/routes/_protected/shops.tsx` - Shops page
- `src/routes/_protected/_dashboard.tsx` - Dashboard layout
- `src/routes/_protected/_dashboard/index.tsx` - Home page

## Remaining Routes to Create

### Parties Routes

```bash
# Create directories
mkdir src\routes\_protected\_dashboard\parties
```

**src/routes/\_protected/\_dashboard/parties.tsx**

```typescript
import { createFileRoute, Outlet } from '@tanstack/react-router'
import PartiesLayout from '@/app/routes/parties'

export const Route = createFileRoute('/_protected/_dashboard/parties')({
  component: () => <PartiesLayout><Outlet /></PartiesLayout>
})
```

**src/routes/\_protected/\_dashboard/parties/index.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import PartiesEmptyState from '@/app/routes/parties/empty'

export const Route = createFileRoute('/_protected/_dashboard/parties/')({
    component: PartiesEmptyState
})
```

**src/routes/\_protected/\_dashboard/parties/new.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import NewPartyPage from '@/app/routes/parties/new'

export const Route = createFileRoute('/_protected/_dashboard/parties/new')({
    component: NewPartyPage
})
```

**src/routes/\_protected/\_dashboard/parties/$id.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import PartyDetailPage from '@/app/routes/parties/[id]'

export const Route = createFileRoute('/_protected/_dashboard/parties/$id')({
    component: PartyDetailPage
})
```

**src/routes/\_protected/\_dashboard/parties/$id.edit.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import PartyDetailPage from '@/app/routes/parties/[id]'

export const Route = createFileRoute('/_protected/_dashboard/parties/$id/edit')(
    {
        component: PartyDetailPage
    }
)
```

### Items Routes

```bash
mkdir src\routes\_protected\_dashboard\items
mkdir src\routes\_protected\_dashboard\items\products
mkdir src\routes\_protected\_dashboard\items\services
mkdir src\routes\_protected\_dashboard\items\category
mkdir src\routes\_protected\_dashboard\items\units
```

**src/routes/\_protected/\_dashboard/items.tsx**

```typescript
import { createFileRoute, Outlet } from '@tanstack/react-router'
import ItemsPage from '@/app/routes/items'

export const Route = createFileRoute('/_protected/_dashboard/items')({
  component: () => <ItemsPage><Outlet /></ItemsPage>
})
```

**src/routes/\_protected/\_dashboard/items/create.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import CreateItemPage from '@/app/routes/items/create'

export const Route = createFileRoute('/_protected/_dashboard/items/create')({
    component: CreateItemPage
})
```

**src/routes/\_protected/\_dashboard/items/products/$id.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import ProductDetailPage from '@/app/routes/items/products/[id]'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/products/$id'
)({
    component: ProductDetailPage
})
```

**src/routes/\_protected/\_dashboard/items/services/$id.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import ServiceDetailPage from '@/app/routes/items/services/[id]'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/services/$id'
)({
    component: ServiceDetailPage
})
```

**src/routes/\_protected/\_dashboard/items/category/$id.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import CategoryDetailPage from '@/app/routes/items/category/[id]'

export const Route = createFileRoute(
    '/_protected/_dashboard/items/category/$id'
)({
    component: CategoryDetailPage
})
```

**src/routes/\_protected/\_dashboard/items/units/$id.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import UnitDetailPage from '@/app/routes/items/units/[id]'

export const Route = createFileRoute('/_protected/_dashboard/items/units/$id')({
    component: UnitDetailPage
})
```

### Other Routes

**src/routes/\_protected/\_dashboard/todos.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'
import TodosPage from '@/app/routes/todos'

export const Route = createFileRoute('/_protected/_dashboard/todos')({
    component: TodosPage
})
```

**src/routes/\_protected/\_dashboard/settings.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_dashboard/settings')({
    component: () => import('@/app/routes/settings').then((m) => m.default)
})
```

**src/routes/\_protected/\_dashboard/scanner.tsx**

```typescript
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/_dashboard/scanner')({
    component: () => import('@/app/routes/scanner').then((m) => m.default)
})
```

## Update Main App

**src/main.tsx** - Replace router import:

```typescript
// Remove
import AppRouter from '@/app/router'

// Add
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

// In render, replace <AppRouter /> with:
<RouterProvider router={router} />
```

## Update Navigation Hooks

Replace all instances:

```typescript
// OLD
import { useNavigate, useParams, useLocation } from 'react-router-dom'

// NEW
import { useNavigate, useParams, useLocation } from '@tanstack/react-router'
```

## Update Link Components

```typescript
// OLD
import { Link } from 'react-router-dom'

// NEW
import { Link } from '@tanstack/react-router'
```

## Key Differences

1. **File naming**: `[id]` → `$id`
2. **Index routes**: `index.tsx` instead of `{ index: true }`
3. **Layout routes**: Prefix with `_` (e.g., `_protected`, `_dashboard`)
4. **Nested routes**: Use folder structure instead of children array
5. **Lazy loading**: Use dynamic imports in component function

## Generate Route Tree

After creating all routes, run:

```bash
pnpm dev
```

TanStack Router will auto-generate `src/routeTree.gen.ts`

## Benefits

- ✅ Type-safe routing with autocomplete
- ✅ Automatic route tree generation
- ✅ Better code splitting
- ✅ Built-in devtools
- ✅ Search params validation
- ✅ Route loaders and actions
