# Shop Management System - Architecture Guide

## Overview

This application follows the **bulletproof-react** architecture pattern with feature-based organization for scalability and maintainability.

## Project Structure

```
src/
├── app/                    # Application layer
│   ├── routes/            # Route components
│   ├── provider.tsx       # Global providers
│   └── router.tsx         # Router configuration
│
├── features/              # Feature modules (main business logic)
│   ├── auth/             # Authentication feature
│   │   ├── api/          # Auth API calls
│   │   ├── components/   # Auth-specific components
│   │   ├── hooks/        # Auth-specific hooks
│   │   ├── types/        # Auth types
│   │   └── index.ts      # Feature exports
│   │
│   ├── shop/             # Shop management feature
│   │   ├── api/          # Shop API calls
│   │   ├── components/   # Shop-specific components
│   │   ├── hooks/        # Shop-specific hooks
│   │   ├── types/        # Shop types
│   │   ├── utils/        # Shop utilities
│   │   └── index.ts      # Feature exports
│   │
│   └── shared/           # Shared utilities across features
│       ├── hooks/        # Reusable hooks
│       ├── types/        # Shared types
│       ├── utils/        # Utility functions
│       └── index.ts      # Shared exports
│
├── components/            # Shared UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── ...               # Layout components
│
├── hooks/                 # Global hooks (backward compatibility)
├── lib/                   # External library configurations
├── services/              # Backend service integrations
├── stores/                # Global state management
├── types/                 # Global TypeScript types
└── utils/                 # Global utility functions
```

## Features Architecture

### Auth Feature (`features/auth/`)

**Purpose**: Handle all authentication-related functionality

**Structure**:

- `api/auth.api.ts` - Authentication API calls (login, logout, OTP)
- `api/user.api.ts` - User profile API calls
- `hooks/use-auth-actions.ts` - Auth action hooks (sendOTP, verifyOTP, logout)
- `hooks/use-current-user.ts` - User state hooks
- `components/login-form.tsx` - Login form component
- `components/profile-form.tsx` - Profile management component
- `types/index.ts` - Auth-related types

**Usage**:

```typescript
import { useAuthActions, useCurrentUser, LoginForm } from '@/features/auth'

function MyComponent() {
  const user = useCurrentUser()
  const { logout } = useAuthActions()

  return <LoginForm onSuccess={() => {}} />
}
```

### Shop Feature (`features/shop/`)

**Purpose**: Manage shop operations, members, and permissions

**Structure**:

- `api/shop.api.ts` - Shop CRUD operations
- `hooks/use-shop-actions.ts` - Shop action hooks
- `hooks/use-user-shops.ts` - Fetch user's shops
- `hooks/use-current-shop.ts` - Current shop selection
- `hooks/use-shop-members.ts` - Shop member management
- `hooks/use-shop-context.ts` - Shop context provider
- `components/shop-provider.tsx` - Shop context provider
- `types/index.ts` - Shop types (Shop, ShopMember, ShopRole, etc.)
- `utils/permissions.ts` - Permission checking utilities
- `utils/validation.ts` - Shop data validation

**Usage**:

```typescript
import { useShopContext, useShopActions, ShopProvider } from '@/features/shop'

function ShopComponent() {
  const { currentShop, userShops } = useShopContext()
  const { createShop, updateShop } = useShopActions()

  return <div>{currentShop?.shopName}</div>
}
```

### Shared Feature (`features/shared/`)

**Purpose**: Reusable utilities and hooks across all features

**Structure**:

- `hooks/use-async.ts` - Async operation state management
- `hooks/use-debounce.ts` - Debounce values
- `hooks/use-local-storage.ts` - Local storage hook
- `utils/validation.ts` - Common validation functions
- `utils/format.ts` - Formatting utilities (date, currency, phone)
- `types/index.ts` - Shared types

**Usage**:

```typescript
import { useDebounce, useAsync, formatDate, isValidEmail } from '@/features/shared'

function SearchComponent() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />
}
```

## Key Principles

### 1. Feature Isolation

Each feature is self-contained with its own:

- API layer
- Business logic (hooks)
- Components
- Types
- Utilities

### 2. Separation of Concerns

- **API Layer**: All backend calls isolated in `api/` folders
- **Hooks**: Business logic and state management
- **Components**: Pure UI components with minimal logic
- **Types**: TypeScript definitions for type safety
- **Utils**: Helper functions and utilities

### 3. Reusability

- Shared components in `components/`
- Shared hooks in `features/shared/hooks/`
- Shared utilities in `features/shared/utils/`

### 4. Backward Compatibility

Old imports still work via re-exports:

```typescript
// Old way (still works)
import { useAuth } from '@/hooks/use-auth'

// New way (recommended)
import { useAuthActions } from '@/features/auth'
```

## Data Flow

```
User Action → Component → Hook → API → Service → Database
                ↓
            State Update
                ↓
            Re-render
```

### Example: Creating a Shop

1. User fills form in `ShopDashboard` component
2. Component calls `createShop` from `useShopContext()`
3. Hook calls `shopApi.createShop()`
4. API calls service layer `createShopService()`
5. Service interacts with database
6. Response updates SWR cache
7. Component re-renders with new data

## State Management

### Local State

- Component-level state with `useState`
- Form state with controlled components

### Global State

- Auth state: `stores/auth-store.ts` (Zustand)
- Shop context: `features/shop/components/shop-provider.tsx`

### Server State

- SWR for data fetching and caching
- Automatic revalidation and error handling

## Best Practices

### 1. Import from Features

```typescript
// ✅ Good
import { useAuthActions } from '@/features/auth'
import { useShopContext } from '@/features/shop'

// ❌ Avoid
import { sendOTP } from '@/services/auth'
```

### 2. Use Hooks for Logic

```typescript
// ✅ Good - Logic in hook
function useShopForm() {
    const { createShop } = useShopActions()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (data) => {
        setLoading(true)
        await createShop(data)
        setLoading(false)
    }

    return { handleSubmit, loading }
}

// ❌ Avoid - Logic in component
function ShopForm() {
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (data) => {
        setLoading(true)
        await createShop(data)
        setLoading(false)
    }
}
```

### 3. Type Everything

```typescript
// ✅ Good
interface CreateShopData {
    shopname: string
    email?: string
}

function createShop(data: CreateShopData): Promise<Shop> {
    // ...
}

// ❌ Avoid
function createShop(data: any) {
    // ...
}
```

### 4. Error Handling

```typescript
// ✅ Good
try {
    await createShop(data)
} catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    setError(message)
}
```

## Adding New Features

1. Create feature folder: `src/features/my-feature/`
2. Add structure:
    ```
    my-feature/
    ├── api/
    ├── components/
    ├── hooks/
    ├── types/
    ├── utils/
    └── index.ts
    ```
3. Export from `index.ts`
4. Add to `src/features/index.ts`

## Testing Strategy

- Unit tests for utilities and hooks
- Integration tests for API calls
- Component tests with React Testing Library
- E2E tests for critical user flows

## Performance Optimization

- Code splitting with React.lazy()
- SWR for efficient data fetching
- Memoization with useMemo/useCallback
- Debouncing for search inputs
- Virtual scrolling for large lists

## Security

- Authentication via OTP
- Device trust management
- Role-based access control (RBAC)
- Permission checking utilities
- Input validation and sanitization
