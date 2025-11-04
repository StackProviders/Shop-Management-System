# Component Cleanup TODO

## 🎯 Refactoring Status

### ✅ Phase 1: Foundation (COMPLETE)

- [x] Created `ConfirmationDialog` in `common/dialogs/`
- [x] Created `DetailActionsMenu` in `common/actions/`
- [x] Updated barrel exports
- [x] Maintained backward compatibility
- [x] Re-exported auth components to `features/auth`
- [x] Re-exported shop components to `features/shop`

### 🔄 Phase 2: Migration (IN PROGRESS)

#### High Priority - Consolidate Duplicates

1. **Alert/Confirmation Dialogs** (3 files)
    - `components/shop/shop-item.tsx` - Uses inline AlertDialog
    - `components/auth/logout-button.tsx` - Uses inline AlertDialog
    - **Action**: Replace with `ConfirmationDialog`

2. **Empty States** (Multiple locations)
    - `components/shop/shop-dashboard.tsx` - Custom EmptyState
    - `components/common/list-detail-page/index.tsx` - Uses Empty component
    - **Action**: Create unified `EmptyState` in `common/feedback/`

3. **Loading States** (Multiple locations)
    - `components/shop/shop-dashboard.tsx` - Custom LoadingState
    - Various components use inline Spinner
    - **Action**: Create unified `LoadingState` in `common/feedback/`

#### Medium Priority - Move to Features

4. **Auth Components** (Currently in components/auth/)

    ```
    components/auth/
    ├── auth-guard.tsx        → features/auth/components/
    ├── otp-input.tsx         → ✅ Re-exported
    ├── logout-button.tsx     → ✅ Re-exported
    └── user-menu.tsx         → ✅ Re-exported
    ```

5. **Shop Components** (Currently in components/shop/)

    ```
    components/shop/
    ├── shop-dashboard.tsx    → ✅ Re-exported
    ├── shop-item.tsx         → ✅ Re-exported
    └── shop-switcher.tsx     → ✅ Re-exported
    ```

6. **Layout Components** (Review placement)
    ```
    components/layouts/
    ├── dashboard-header.tsx
    ├── dashboard-layout.tsx
    ├── mobile-bottom-actions.tsx
    └── protected-layout.tsx
    ```
    **Decision**: Keep in components/ (shared across features)

#### Low Priority - Organize Better

7. **Provider Components**

    ```
    components/providers/
    ├── app-bar.tsx
    ├── mobile-updater-provider.tsx
    ├── safe-area-provider.tsx
    └── theme-provider.tsx
    ```

    **Action**: Review if these should be in `app/providers/`

8. **Sidebar Components**
    ```
    components/sidebar/
    ├── badge-helpers.ts
    ├── menu-item.tsx
    ├── sub-menu-item.tsx
    └── types.ts
    ```
    **Action**: Consider moving to `components/layouts/sidebar/`

### 📦 Phase 3: Create New Common Components

#### Feedback Components

```typescript
// common/feedback/empty-state.tsx
interface EmptyStateProps {
    icon?: ReactNode
    title: string
    description: string
    action?: ReactNode
}

// common/feedback/loading-state.tsx
interface LoadingStateProps {
    message?: string
    size?: 'sm' | 'md' | 'lg'
}

// common/feedback/error-state.tsx
interface ErrorStateProps {
    title: string
    message: string
    onRetry?: () => void
}
```

#### Action Components

```typescript
// common/actions/bulk-actions-bar.tsx
interface BulkActionsBarProps {
    selectedCount: number
    onDelete: () => void
    onExport?: () => void
    onClear: () => void
}

// common/actions/item-actions-dropdown.tsx
interface ItemActionsDropdownProps {
    onEdit: () => void
    onDuplicate: () => void
    onDelete: () => void
    customActions?: ReactNode
}
```

#### Layout Components

```typescript
// common/layouts/page-header.tsx
interface PageHeaderProps {
    title: string
    description?: string
    actions?: ReactNode
    breadcrumbs?: Array<{ label: string; href?: string }>
}

// common/layouts/section-container.tsx
interface SectionContainerProps {
    title?: string
    children: ReactNode
    actions?: ReactNode
}
```

### 🗑️ Phase 4: Remove Old Files (After Migration)

**DO NOT DELETE YET** - Wait until all imports are updated

```
components/
├── delete-confirmation-dialog.tsx  → Remove (use ConfirmationDialog)
├── detail-actions-menu.tsx         → Remove (use common/actions/)
├── otp-email.tsx                   → Remove (use features/auth/utils/)
├── auth/                           → Move to features/auth/
└── shop/                           → Move to features/shop/
```

## 📝 Migration Steps

### Step 1: Update Shop Components

```typescript
// Before
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog'

// After
import { ConfirmationDialog } from '@/components/common'
```

**Files to update:**

- `components/shop/shop-item.tsx`
- Any other files using inline AlertDialog for confirmations

### Step 2: Create Feedback Components

1. Create `common/feedback/` directory
2. Implement `EmptyState`, `LoadingState`, `ErrorState`
3. Update existing components to use new patterns

### Step 3: Update Auth Components

1. Move actual files from `components/auth/` to `features/auth/components/`
2. Update re-exports
3. Test all auth flows

### Step 4: Update Shop Components

1. Move actual files from `components/shop/` to `features/shop/components/`
2. Update re-exports
3. Test all shop flows

### Step 5: Final Cleanup

1. Search codebase for old imports
2. Update all references
3. Remove old files
4. Update documentation

## 🔍 Search Commands

Find old imports:

```bash
# Find DeleteConfirmationDialog usage
pnpm exec grep -r "DeleteConfirmationDialog" src/

# Find direct component imports
pnpm exec grep -r "from '@/components/auth/" src/
pnpm exec grep -r "from '@/components/shop/" src/

# Find inline AlertDialog usage
pnpm exec grep -r "AlertDialog" src/ | grep -v "import"
```

## ✅ Testing Checklist

After each phase:

- [ ] All imports resolve correctly
- [ ] No TypeScript errors
- [ ] All features work as expected
- [ ] No console errors
- [ ] Mobile and desktop views work
- [ ] All modals/dialogs open and close properly
- [ ] All forms submit correctly

## 📊 Progress Tracking

| Component          | Status      | Priority | Assignee | Notes               |
| ------------------ | ----------- | -------- | -------- | ------------------- |
| ConfirmationDialog | ✅ Complete | High     | -        | Backward compatible |
| DetailActionsMenu  | ✅ Complete | High     | -        | Moved to common/    |
| Auth re-exports    | ✅ Complete | High     | -        | Feature-based       |
| Shop re-exports    | ✅ Complete | High     | -        | Feature-based       |
| EmptyState         | 📋 TODO     | Medium   | -        | Need to create      |
| LoadingState       | 📋 TODO     | Medium   | -        | Need to create      |
| ErrorState         | 📋 TODO     | Low      | -        | Need to create      |
| Move auth files    | 📋 TODO     | Medium   | -        | After testing       |
| Move shop files    | 📋 TODO     | Medium   | -        | After testing       |
| Remove old files   | 📋 TODO     | Low      | -        | Final step          |

## 🎯 Success Metrics

- **Code Reduction**: Target 30% reduction in component files
- **Import Consistency**: 100% feature-based imports
- **Duplication**: Zero duplicate confirmation/empty/loading patterns
- **Type Safety**: All components fully typed
- **Documentation**: All patterns documented

## 📚 Resources

- [Refactoring Guide](./REFACTORING_GUIDE.md)
- [Architecture Patterns](./ai-rules/02-architecture-patterns.md)
- [Component Patterns](./ai-rules/03-component-patterns.md)

---

**Last Updated**: $(date)
**Next Review**: After Phase 2 completion
