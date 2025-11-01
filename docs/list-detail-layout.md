# List Detail Layout Components

A comprehensive, composable component system for building responsive list-detail interfaces following shadcn/ui patterns.

## Overview

The List Detail Layout system provides a set of reusable components for creating master-detail views that work seamlessly on both desktop and mobile devices. All components are built with TypeScript, support refs via `forwardRef`, and accept `className` for customization.

## Architecture

```
ListDetailRoot
├── ListDetailHeader (Page Header)
│   ├── ListDetailHeaderContent
│   │   ├── ListDetailHeaderTitle
│   │   └── ListDetailHeaderActions
│   └── ListDetailStats
│       └── ListDetailStat (multiple)
└── ListDetailBody
    ├── ListDetailList (Left Sidebar)
    │   ├── ListDetailListHeader
    │   └── ListDetailListContent
    └── ListDetailContent (Right Detail)
        ├── ListDetailContentHeader
        │   ├── ListDetailContentHeaderTitle
        │   └── ListDetailContentHeaderInfo
        │       └── ListDetailContentHeaderInfoItem (multiple)
        └── ListDetailContentBody
```

## Components Reference

### Layout Components

#### `ListDetailRoot`

Root container for the entire layout.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `h-full flex flex-col`

#### `ListDetailBody`

Main content area containing list and detail sections.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `flex-1 flex flex-col md:flex-row min-h-0`
- **Responsive**: Stacks vertically on mobile, horizontal on desktop

### Page Header Components

#### `ListDetailHeader`

Top header section for the page.

- **Props**: `HTMLAttributes<HTMLDivElement> & { isRouteActive?: boolean }`
- **Styling**: `border-b space-y-3 p-2`
- **Responsive**: Hidden on mobile when route is active

#### `ListDetailHeaderContent`

Container for title and actions.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `flex items-center gap-2 sm:gap-3 justify-between`

#### `ListDetailHeaderTitle`

Page title heading.

- **Props**: `HTMLAttributes<HTMLHeadingElement>`
- **Styling**: `text-lg sm:text-xl font-semibold`

#### `ListDetailHeaderActions`

Container for header action buttons.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `flex items-center gap-2`

#### `ListDetailStats`

Container for statistics display.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm`

#### `ListDetailStat`

Individual statistic item.

- **Props**: `{ label: string, value: string | number } & HTMLAttributes<HTMLDivElement>`
- **Required**: `label`, `value`

### List Components (Left Sidebar)

#### `ListDetailList`

Left sidebar container for the list.

- **Props**: `HTMLAttributes<HTMLDivElement> & { isRouteActive?: boolean }`
- **Styling**: `w-80 border-r` on desktop, `flex-1` on mobile
- **Responsive**: Hidden on mobile when route is active

#### `ListDetailListHeader`

Header section of the list (search, filters).

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `p-3 sm:p-4 border-b space-y-3 shrink-0`

#### `ListDetailListContent`

Scrollable content area for list items.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Features**: Uses `ScrollArea` for smooth scrolling

### Detail Content Components (Right Side)

#### `ListDetailContent`

Right side detail content container.

- **Props**: `HTMLAttributes<HTMLDivElement> & { isRouteActive?: boolean }`
- **Responsive**: Hidden on mobile when route is NOT active
- **Features**: Uses `ScrollArea` for smooth scrolling

#### `ListDetailContentHeader`

Header section for detail content.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `border-b p-3 sm:p-4`

#### `ListDetailContentHeaderTitle`

Title row with actions in detail header.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `flex items-center justify-between`

#### `ListDetailContentHeaderInfo`

Grid container for information items.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm mt-3`
- **Responsive**: 1 column mobile, 2 columns tablet, 3 columns desktop

#### `ListDetailContentHeaderInfoItem`

Individual information item (label + value).

- **Props**: `{ label: string, value: string } & HTMLAttributes<HTMLDivElement>`
- **Required**: `label`, `value`

#### `ListDetailContentBody`

Main body content area for detail.

- **Props**: `HTMLAttributes<HTMLDivElement>`
- **Styling**: `p-3 sm:p-4`

## Usage Examples

### Basic List-Detail Page

```tsx
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
    ListDetailContent
} from '@/components/ui/list-detail-layout'

function MyPage() {
    const isRouteActive = !!useParams().id

    return (
        <ListDetailRoot>
            <ListDetailHeader isRouteActive={isRouteActive}>
                <ListDetailHeaderContent>
                    <ListDetailHeaderTitle>My Items</ListDetailHeaderTitle>
                    <ListDetailHeaderActions>
                        <Button>Add New</Button>
                    </ListDetailHeaderActions>
                </ListDetailHeaderContent>
                <ListDetailStats>
                    <ListDetailStat label="Total" value={100} />
                    <ListDetailStat label="Active" value={80} />
                </ListDetailStats>
            </ListDetailHeader>

            <ListDetailBody>
                <ListDetailList isRouteActive={isRouteActive}>
                    <ListDetailListHeader>
                        <SearchInput placeholder="Search..." />
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
    )
}
```

### Detail Page with Header

```tsx
import {
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
} from '@/components/ui/list-detail-layout'

function ItemDetail({ item }) {
    return (
        <>
            <ListDetailContentHeader>
                <ListDetailContentHeaderTitle>
                    <h2>{item.name}</h2>
                    <Button onClick={onEdit}>Edit</Button>
                </ListDetailContentHeaderTitle>
                <ListDetailContentHeaderInfo>
                    <ListDetailContentHeaderInfoItem
                        label="Email"
                        value={item.email}
                    />
                    <ListDetailContentHeaderInfoItem
                        label="Phone"
                        value={item.phone}
                    />
                    <ListDetailContentHeaderInfoItem
                        label="Address"
                        value={item.address}
                    />
                </ListDetailContentHeaderInfo>
            </ListDetailContentHeader>

            <ListDetailContentBody>{/* Main content */}</ListDetailContentBody>
        </>
    )
}
```

### Custom Styling

```tsx
<ListDetailHeader className="bg-primary/5">
    <ListDetailHeaderContent className="max-w-7xl mx-auto">
        <ListDetailHeaderTitle className="text-primary">
            Custom Title
        </ListDetailHeaderTitle>
    </ListDetailHeaderContent>
</ListDetailHeader>
```

## Responsive Behavior

### Desktop (≥768px)

- List sidebar: Fixed width (320px)
- Detail content: Flexible width
- Both visible simultaneously

### Mobile (<768px)

- List: Full width when no item selected
- Detail: Full width when item selected
- Only one visible at a time (controlled by `isRouteActive`)

## Best Practices

### 1. Always Pass `isRouteActive`

```tsx
const isRouteActive = useMemo(
    () => !!id || pathname.includes('/new') || pathname.includes('/edit'),
    [id, pathname]
)

<ListDetailHeader isRouteActive={isRouteActive} />
<ListDetailList isRouteActive={isRouteActive} />
<ListDetailContent isRouteActive={isRouteActive} />
```

### 2. Use Outlet for Nested Routes

```tsx
<ListDetailContent isRouteActive={isRouteActive}>
    <Outlet />
</ListDetailContent>
```

### 3. Conditional Header Display

```tsx
{
    ;(hasInfo || !isMobile) && (
        <ListDetailContentHeader>
            {/* Header content */}
        </ListDetailContentHeader>
    )
}
```

### 4. Compose Components

```tsx
// ✅ Good - Compose for flexibility
<ListDetailHeaderContent>
    <div className="flex items-center gap-2">
        <Icon />
        <ListDetailHeaderTitle>Title</ListDetailHeaderTitle>
    </div>
    <ListDetailHeaderActions>
        <Button>Action</Button>
    </ListDetailHeaderActions>
</ListDetailHeaderContent>

// ❌ Avoid - Don't hardcode structure
<div className="flex justify-between">
    <h2>Title</h2>
    <button>Action</button>
</div>
```

## AI Assistant Rules

### When to Use

- Building master-detail interfaces
- Creating list views with detail panels
- Implementing responsive data browsers
- Any page with list + detail pattern

### Component Selection

1. **Always start with** `ListDetailRoot`
2. **Page header?** Use `ListDetailHeader` components
3. **List sidebar?** Use `ListDetailList` components
4. **Detail content?** Use `ListDetailContent` components
5. **Detail header?** Use `ListDetailContentHeader` components

### Code Generation Guidelines

1. Import only needed components
2. Always pass `isRouteActive` prop
3. Use `Outlet` for nested routes
4. Maintain responsive behavior
5. Follow composition pattern
6. Add `className` for customization

### Common Patterns

**List Page:**

```tsx
ListDetailRoot → ListDetailHeader → ListDetailBody → ListDetailList + ListDetailContent
```

**Detail Page:**

```tsx
ListDetailContentHeader → ListDetailContentBody
```

**With Stats:**

```tsx
ListDetailHeader → ListDetailHeaderContent + ListDetailStats
```

## TypeScript Support

All components are fully typed with:

- `forwardRef` support for refs
- `HTMLAttributes<HTMLDivElement>` base props
- Custom props (e.g., `isRouteActive`, `label`, `value`)
- Full IntelliSense support

## Accessibility

- Semantic HTML elements
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly
- Focus management

## Performance

- Memoized with `forwardRef`
- Efficient re-renders
- Optimized responsive hooks
- Smooth scrolling with `ScrollArea`

## Migration Guide

### From Old Pattern

```tsx
// ❌ Old
<div className="h-full flex flex-col">
    <div className="border-b p-4">
        <h1>Title</h1>
    </div>
    <div className="flex-1 flex">
        <div className="w-80 border-r">List</div>
        <div className="flex-1">Detail</div>
    </div>
</div>

// ✅ New
<ListDetailRoot>
    <ListDetailHeader>
        <ListDetailHeaderContent>
            <ListDetailHeaderTitle>Title</ListDetailHeaderTitle>
        </ListDetailHeaderContent>
    </ListDetailHeader>
    <ListDetailBody>
        <ListDetailList>List</ListDetailList>
        <ListDetailContent>Detail</ListDetailContent>
    </ListDetailBody>
</ListDetailRoot>
```

## Examples in Codebase

- **Parties Page**: `src/app/routes/parties/index.tsx`
- **Party Detail**: `src/features/parties/components/party-detail.tsx`

## Support

For issues or questions, refer to:

- Component source: `src/components/ui/list-detail-layout.tsx`
- Project rules: `.amazonq/rules/component-patterns.md`
- Architecture: `ARCHITECTURE.md`
