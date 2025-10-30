# Responsive Routing Pattern

## Overview

Two minimal components for responsive routing: dialogs on desktop, pages on mobile.

## Components

### 1. ResponsiveRouteView

Shows content in dialog (desktop) or page (mobile).

```tsx
import { ResponsiveRouteView } from '@/components'

;<ResponsiveRouteView isOpen={!!id} baseRoute="/parties" className="max-w-2xl">
    <PartyDetail id={id} />
</ResponsiveRouteView>
```

### 2. ListDetailLayout

Complete list-detail pattern with automatic responsive behavior.

```tsx
import { ListDetailLayout } from '@/components'

;<ListDetailLayout
    isDetailOpen={!!id}
    baseRoute="/parties"
    list={<PartyList />}
    detail={<PartyDetail />}
/>
```

## Usage Examples

### Basic Pattern

```tsx
import { useParams } from 'react-router'
import { ListDetailLayout } from '@/components'

export default function PartiesPage() {
    const { id } = useParams()

    return (
        <ListDetailLayout
            isDetailOpen={!!id}
            baseRoute="/parties"
            list={<PartyList />}
        />
    )
}
```

### With Outlet (Nested Routes)

```tsx
<ListDetailLayout
    isDetailOpen={!!id}
    baseRoute="/parties"
    list={<PartyList />}
    // detail prop omitted - uses <Outlet /> automatically
/>
```

### Custom Dialog Size

```tsx
<ListDetailLayout
    isDetailOpen={!!id}
    baseRoute="/parties"
    list={<PartyList />}
    detailClassName="max-w-6xl"
/>
```

## Router Setup

```tsx
{
    path: '/parties',
    element: <PartiesLayout />,
    children: [
        {
            path: ':id',
            element: <PartyDetail />
        }
    ]
}
```

## Benefits

- ✅ **3 lines of code** for full responsive routing
- ✅ **Desktop**: Dialog overlay, list stays visible
- ✅ **Mobile**: Full page navigation, list hidden
- ✅ **Auto cleanup**: Navigates back on dialog close
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Performance**: Minimal re-renders
