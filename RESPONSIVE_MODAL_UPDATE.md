# Responsive Modal System Update

## Summary

Updated the responsive modal system to provide better desktop dialog views and mobile drawer experiences with full customization support.

## Changes Made

### 1. Enhanced ResponsiveModal Component

**New Props:**

- `description?: string` - Optional description text below title
- `contentClassName?: string` - Custom className for content wrapper
- `showHeader?: boolean` - Toggle header visibility (default: true)
- `header?: ReactNode` - Custom header component (overrides title/description)

**Improvements:**

- Desktop: Better dialog with `max-w-2xl` and `max-h-[90vh]` with scroll
- Mobile: Drawer with proper padding and responsive layout
- Both views now support custom headers and descriptions
- Better content wrapping with customizable classes

### 2. Simplified ResponsiveRouteView

**Changes:**

- Now uses ResponsiveModal internally (DRY principle)
- Inherits all ResponsiveModal props
- Automatically handles navigation on close
- Supports both desktop dialog and mobile drawer

**New Props:**

- All ResponsiveModal props are now available
- `description?: string`
- `contentClassName?: string`
- `showHeader?: boolean`
- `header?: ReactNode`

### 3. Removed Unused Components

**Deleted:**

- `src/components/modal.tsx` - Duplicate ResponsiveDialog component (unused)

## Usage Examples

### Basic Usage

```typescript
<ResponsiveModal
    open={isOpen}
    onOpenChange={setIsOpen}
    title="Create Item"
    description="Fill in the details below"
>
    <MyForm />
</ResponsiveModal>
```

### With Custom Header

```typescript
<ResponsiveModal
    open={isOpen}
    onOpenChange={setIsOpen}
    header={
        <div className="flex items-center justify-between p-4">
            <h2>Custom Header</h2>
            <Button>Action</Button>
        </div>
    }
>
    <MyContent />
</ResponsiveModal>
```

### Route View (Desktop Dialog + Mobile Drawer)

```typescript
<ResponsiveRouteView
    isOpen={true}
    baseRoute="/parties"
    title="Create New Party"
    description="Add a new customer or supplier"
    className="max-w-2xl"
>
    <PartyForm onSubmit={handleCreate} />
</ResponsiveRouteView>
```

### Without Header

```typescript
<ResponsiveModal
    open={isOpen}
    onOpenChange={setIsOpen}
    showHeader={false}
>
    <CustomLayout />
</ResponsiveModal>
```

## Updated Files

1. ✅ `src/components/responsive/responsive-modal.tsx` - Enhanced with new props
2. ✅ `src/components/responsive/responsive-route-view.tsx` - Simplified to use ResponsiveModal
3. ✅ `src/app/routes/parties/[id].tsx` - Updated to use new props
4. ✅ `src/app/routes/parties/new.tsx` - Updated to use new props
5. ✅ `src/components/modal.tsx` - Removed (unused duplicate)

## Benefits

### Desktop View

- ✅ Better dialog size (`max-w-2xl` default)
- ✅ Scrollable content with `max-h-[90vh]`
- ✅ Customizable dialog width via `className`
- ✅ Optional descriptions for better UX

### Mobile View

- ✅ Native drawer experience
- ✅ Proper padding and spacing
- ✅ Responsive layout
- ✅ Same customization options

### Developer Experience

- ✅ Single component for both views
- ✅ Full prop customization
- ✅ Type-safe with TypeScript
- ✅ Consistent API across app
- ✅ Less code duplication

## Migration Guide

### Old Pattern

```typescript
<ResponsiveRouteView
    isOpen={true}
    baseRoute="/parties"
    title="Edit Party"
    className="max-w-2xl"
>
    <PartyForm />
</ResponsiveRouteView>
```

### New Pattern (Enhanced)

```typescript
<ResponsiveRouteView
    isOpen={true}
    baseRoute="/parties"
    title="Edit Party"
    description="Update party information"  // NEW
    className="max-w-2xl"
    contentClassName="space-y-4"  // NEW
>
    <PartyForm />
</ResponsiveRouteView>
```

## Component Props Reference

### ResponsiveModal

| Prop               | Type                      | Default  | Description               |
| ------------------ | ------------------------- | -------- | ------------------------- |
| `open`             | `boolean`                 | required | Modal open state          |
| `onOpenChange`     | `(open: boolean) => void` | required | Open state handler        |
| `title`            | `string`                  | optional | Modal title               |
| `description`      | `string`                  | optional | Modal description         |
| `children`         | `ReactNode`               | required | Modal content             |
| `className`        | `string`                  | optional | Dialog/Drawer className   |
| `contentClassName` | `string`                  | optional | Content wrapper className |
| `showHeader`       | `boolean`                 | `true`   | Show/hide header          |
| `header`           | `ReactNode`               | optional | Custom header component   |

### ResponsiveRouteView

Inherits all ResponsiveModal props plus:

| Prop        | Type      | Default  | Description                |
| ----------- | --------- | -------- | -------------------------- |
| `isOpen`    | `boolean` | required | Route view open state      |
| `baseRoute` | `string`  | required | Route to navigate on close |

## Testing Checklist

- [x] Desktop dialog displays correctly
- [x] Mobile drawer displays correctly
- [x] Title and description render properly
- [x] Custom headers work
- [x] Content className applies correctly
- [x] Navigation works on close
- [x] Scroll works for long content
- [x] No unused components remain

## Next Steps

Consider applying this pattern to other modal usages in:

- Settings pages
- Shop management
- Todo items
- Any other modal/drawer implementations
