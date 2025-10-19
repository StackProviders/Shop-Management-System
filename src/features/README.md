# Features Directory

This directory contains all feature modules following the bulletproof-react architecture pattern.

## Structure

Each feature is self-contained with:

- `api/` - API calls and service integrations
- `components/` - Feature-specific React components
- `hooks/` - Custom hooks for business logic
- `types/` - TypeScript type definitions
- `utils/` - Utility functions (optional)
- `index.ts` - Barrel export for clean imports

## Available Features

### 🔐 Auth (`auth/`)

Authentication and user management

**Exports**:

- Hooks: `useAuthActions`, `useCurrentUser`, `useIsAuthenticated`
- Components: `LoginForm`, `ProfileForm`
- Types: `User`, `LoginType`, `AuthState`
- API: `authApi`, `userApi`

**Usage**:

```typescript
import { useAuthActions, LoginForm } from '@/features/auth'
```

### 🏪 Shop (`shop/`)

Shop management, members, and permissions

**Exports**:

- Hooks: `useShopContext`, `useShopActions`, `useUserShops`, `useShopMembers`
- Components: `ShopProvider`
- Types: `Shop`, `ShopRole`, `UserShopAccess`, `ShopMember`
- Utils: `hasPermission`, `canManageMembers`, `validateShopData`
- API: `shopApi`

**Usage**:

```typescript
import { useShopContext, ShopProvider } from '@/features/shop'
```

### 🔧 Shared (`shared/`)

Reusable utilities across all features

**Exports**:

- Hooks: `useDebounce`, `useAsync`, `useLocalStorage`
- Utils: `formatDate`, `formatCurrency`, `isValidEmail`, `isValidPhone`
- Types: `PaginationParams`, `ApiError`, `AsyncResult`

**Usage**:

```typescript
import { useDebounce, formatDate } from '@/features/shared'
```

## Adding a New Feature

1. Create feature directory:

```bash
mkdir src/features/my-feature
```

2. Create structure:

```bash
cd src/features/my-feature
mkdir api components hooks types utils
touch index.ts
```

3. Implement feature modules

4. Export from `index.ts`:

```typescript
export * from './api'
export * from './hooks'
export * from './components'
export * from './types'
export * from './utils'
```

5. Add to `src/features/index.ts`:

```typescript
export * as MyFeature from './my-feature'
```

## Best Practices

### ✅ Do

- Keep features isolated and self-contained
- Use barrel exports (`index.ts`) for clean imports
- Put shared code in `shared/` feature
- Write types for everything
- Use hooks for business logic
- Keep components focused on UI

### ❌ Don't

- Import from other features' internals (use public exports)
- Put business logic in components
- Create circular dependencies
- Mix feature concerns
- Skip type definitions

## Import Patterns

### Good ✅

```typescript
// Import from feature root
import { useAuthActions } from '@/features/auth'
import { useShopContext } from '@/features/shop'
import { formatDate } from '@/features/shared'
```

### Bad ❌

```typescript
// Don't import from internal paths
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'
import { authApi } from '@/features/auth/api/auth.api'
```

## Testing

Each feature should have its own tests:

```
my-feature/
├── __tests__/
│   ├── hooks.test.ts
│   ├── components.test.tsx
│   └── utils.test.ts
```

## Documentation

See:

- `ARCHITECTURE.md` - Detailed architecture guide
- `MIGRATION_GUIDE.md` - Migration from old structure
- `QUICK_REFERENCE.md` - Quick reference for common patterns
