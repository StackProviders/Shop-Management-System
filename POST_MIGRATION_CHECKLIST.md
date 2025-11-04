# Post-Migration Checklist

## Immediate Actions (Required)

### 1. Generate Route Tree ✅

```bash
pnpm dev
```

- Wait for `src/routeTree.gen.ts` to be generated
- Check console for any errors
- Verify DevTools appear in bottom-right corner

### 2. Test Core Routes ✅

- [ ] Open http://localhost:1420/auth
- [ ] Login successfully
- [ ] Navigate to /shops
- [ ] Select a shop
- [ ] Navigate to / (home)
- [ ] Verify dashboard loads

### 3. Test All Feature Routes ✅

#### Parties

- [ ] Navigate to /parties
- [ ] Click "New Party"
- [ ] Create a party
- [ ] View party detail
- [ ] Edit party
- [ ] Navigate back

#### Items

- [ ] Navigate to /items
- [ ] Click "Create Item"
- [ ] Create an item
- [ ] View product detail
- [ ] View service detail
- [ ] View category detail
- [ ] View unit detail

#### Other Features

- [ ] Navigate to /todos
- [ ] Navigate to /settings
- [ ] Navigate to /scanner

### 4. Test Navigation Patterns ✅

- [ ] Browser back button works
- [ ] Browser forward button works
- [ ] Direct URL access works
- [ ] Deep linking works
- [ ] Route transitions are smooth
- [ ] Loading states appear correctly
- [ ] No console errors

### 5. Test Mobile Experience ✅

- [ ] Open DevTools (F12)
- [ ] Toggle device toolbar (Ctrl+Shift+M)
- [ ] Test on mobile viewport
- [ ] Verify responsive navigation
- [ ] Test drawer/dialog behavior
- [ ] Verify touch interactions

## Code Quality Checks

### 1. TypeScript Compilation ✅

```bash
pnpm tsc --noEmit
```

- [ ] No type errors
- [ ] Route types are generated
- [ ] Navigation is type-safe

### 2. Linting ✅

```bash
pnpm lint
```

- [ ] No linting errors
- [ ] No unused imports
- [ ] Code follows standards

### 3. Build Test ✅

```bash
pnpm build
```

- [ ] Build succeeds
- [ ] No warnings
- [ ] Bundle size is reasonable

## Performance Verification

### 1. Route Preloading ✅

- [ ] Hover over navigation links
- [ ] Check Network tab for prefetch requests
- [ ] Verify instant navigation on click

### 2. Code Splitting ✅

- [ ] Check Network tab
- [ ] Verify lazy routes load separately
- [ ] Settings and Scanner are code-split

### 3. Loading States ✅

- [ ] Throttle network to "Slow 3G"
- [ ] Navigate between routes
- [ ] Verify loading spinners appear
- [ ] No flash of content

## Advanced Features (Optional)

### 1. Add Route Loaders

```typescript
// Example: src/routes/_protected/_dashboard/parties/$id.tsx
export const Route = createFileRoute('/_protected/_dashboard/parties/$id')({
    loader: async ({ params }) => {
        const party = await fetchParty(params.id)
        return { party }
    }
})
```

### 2. Add Search Params Validation

```typescript
// Example: src/routes/_protected/_dashboard/items.tsx
import { z } from 'zod'

export const Route = createFileRoute('/_protected/_dashboard/items')({
    validateSearch: z.object({
        filter: z.enum(['active', 'inactive']).optional(),
        search: z.string().optional()
    })
})
```

### 3. Add Per-Route Loading States

```typescript
// Example: src/routes/_protected/_dashboard/parties.tsx
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/_protected/_dashboard/parties')({
  pendingComponent: () => <Skeleton className="h-full w-full" />
})
```

### 4. Add Error Boundaries

```typescript
// Example: src/routes/_protected/_dashboard/parties/$id.tsx
export const Route = createFileRoute('/_protected/_dashboard/parties/$id')({
  errorComponent: ({ error }) => (
    <div className="flex h-full items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-destructive">Error</h2>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </div>
    </div>
  )
})
```

## Refactoring Opportunities

### 1. Update Navigation Components

Replace manual navigation with type-safe helpers:

```typescript
// Before
import { useNavigate } from '@tanstack/react-router'
const navigate = useNavigate()
navigate({ to: '/parties/$id', params: { id: '123' } })

// After
import { useTypedNavigate } from '@/lib/router-utils'
const nav = useTypedNavigate()
nav.toParty('123')
```

### 2. Update Link Components

Use type-safe Link component:

```typescript
// Before
<a href={`/parties/${id}`}>View Party</a>

// After
import { Link } from '@tanstack/react-router'
<Link to="/parties/$id" params={{ id }}>View Party</Link>
```

### 3. Add Route Constants

Use route constants for consistency:

```typescript
import { ROUTES } from '@/lib/router-utils'

// Instead of hardcoded strings
navigate({ to: ROUTES.PARTY_DETAIL, params: { id } })
```

## Documentation Updates

### 1. Update README ✅

- [ ] Add TanStack Router to tech stack
- [ ] Update routing section
- [ ] Add migration notes

### 2. Update Architecture Docs ✅

- [ ] Document new routing structure
- [ ] Add file-based routing guide
- [ ] Update navigation patterns

### 3. Team Communication ✅

- [ ] Notify team of migration
- [ ] Share documentation links
- [ ] Schedule knowledge sharing session

## Monitoring & Metrics

### 1. Performance Metrics

- [ ] Measure route transition time
- [ ] Compare before/after bundle size
- [ ] Monitor initial load time
- [ ] Track time to interactive

### 2. Error Tracking

- [ ] Monitor console errors
- [ ] Track navigation failures
- [ ] Watch for 404s
- [ ] Check error boundaries

### 3. User Feedback

- [ ] Gather team feedback
- [ ] Test with real users
- [ ] Monitor support tickets
- [ ] Track user satisfaction

## Rollback Plan (If Needed)

If critical issues arise:

### 1. Revert Packages

```bash
pnpm remove @tanstack/react-router @tanstack/router-vite-plugin @tanstack/router-devtools
pnpm add react-router-dom
```

### 2. Restore Old Router

```bash
git checkout HEAD~1 -- src/app/router.tsx
git checkout HEAD~1 -- src/app/index.tsx
git checkout HEAD~1 -- vite.config.ts
```

### 3. Remove New Routes

```bash
rm -rf src/routes
```

### 4. Restore Imports

Run the reverse import script (if needed)

## Success Criteria

Migration is successful when:

- ✅ All routes work correctly
- ✅ No console errors
- ✅ TypeScript compiles without errors
- ✅ Build succeeds
- ✅ Performance is improved
- ✅ Developer experience is better
- ✅ User experience is smooth
- ✅ Team is comfortable with changes

## Next Steps After Success

1. **Optimize Routes**
    - Add route loaders where beneficial
    - Implement search params validation
    - Add per-route loading states

2. **Enhance Type Safety**
    - Use typed navigation helpers everywhere
    - Add route guards with beforeLoad
    - Validate all search params

3. **Improve Performance**
    - Analyze bundle size
    - Optimize code splitting
    - Implement route prefetching strategies

4. **Document Patterns**
    - Create team guidelines
    - Add code examples
    - Update onboarding docs

5. **Monitor & Iterate**
    - Track performance metrics
    - Gather user feedback
    - Continuously improve

---

**Status**: Ready for testing

**Priority**: High

**Estimated Time**: 2-4 hours for complete verification

**Risk Level**: Low (can rollback if needed)
