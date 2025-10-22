# Features Documentation

Complete list of all features available in the Shop Management System.

## 🔐 Authentication Feature

**Location**: `src/features/auth/`

### Overview

Complete authentication system with OTP-based login, device trust management, and user profile management.

### Components

- `LoginForm` - Email/Phone OTP login form
- `ProfileForm` - User profile management
- `AuthProvider` - Authentication context provider

### Hooks

- `useAuthActions()` - Authentication actions (sendOTP, verifyOTP, logout)
- `useAuthState()` - Authentication state (isAuthenticated, loading)
- `useCurrentUser()` - Current user data

### API

- `authApi` - Authentication operations
- `userApi` - User profile operations
- `deviceApi` - Device trust management

### Services

- `authService` - Core authentication logic
- `otpService` - OTP generation and verification
- `deviceService` - Device fingerprinting and trust
- `sessionService` - Session management
- `userService` - User data management
- `storageService` - Secure storage operations
- `cleanupService` - Cleanup expired sessions

### Types

```typescript
interface User {
    uid: string
    email?: string
    phoneNumber?: string
    displayName?: string
    photoURL?: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
}

type LoginType = 'email' | 'phone'
```

### Usage Example

```typescript
import { useAuthActions, LoginForm } from '@/features/auth'

function LoginPage() {
  const { logout } = useAuthActions()

  return (
    <LoginForm
      onSuccess={() => navigate('/dashboard')}
    />
  )
}
```

---

## 🏪 Shop Management Feature

**Location**: `src/features/shop/`

### Overview

Multi-shop management with role-based access control, member management, and permission system.

### Components

- `ShopProvider` - Shop context provider
- `CreateShopForm` - Form to create new shop
- `CreateShopModal` - Modal wrapper for shop creation
- `EditShopModal` - Modal for editing shop details

### Hooks

- `useShopContext()` - Access shop context (currentShop, userShops)
- `useShopActions()` - Shop CRUD operations
- `useCurrentShop()` - Current selected shop
- `useUserShops()` - List of user's shops
- `useShopMembers()` - Shop member management

### API

- `shopApi` - Shop CRUD operations
    - `createShop(data)` - Create new shop
    - `updateShop(id, data)` - Update shop
    - `deleteShop(id)` - Delete shop
    - `getShopById(id)` - Get shop details
    - `getUserShops(userId)` - Get user's shops
    - `getShopMembers(shopId)` - Get shop members
    - `addMember(shopId, member)` - Add member
    - `updateMemberRole(shopId, memberId, role)` - Update role
    - `removeMember(shopId, memberId)` - Remove member

### Services

- `shopService` - Shop business logic

### Types

```typescript
interface Shop {
    id: string
    shopName: string
    email?: string
    phoneNumber?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
    website?: string
    description?: string
    logo?: string
    ownerId: string
    createdAt: Date
    updatedAt: Date
}

type ShopRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer'

interface ShopMember {
    id: string
    userId: string
    shopId: string
    role: ShopRole
    permissions: string[]
    addedAt: Date
    addedBy: string
}

interface UserShopAccess {
    shopId: string
    role: ShopRole
    permissions: string[]
}
```

### Utilities

- `hasPermission(role, permission)` - Check if role has permission
- `canManageMembers(role)` - Check if can manage members
- `canEditShop(role)` - Check if can edit shop
- `canDeleteShop(role)` - Check if can delete shop
- `validateShopData(data)` - Validate shop data

### Permissions System

```typescript
// Available permissions
const PERMISSIONS = {
    // Shop management
    'shop.edit': ['owner', 'admin'],
    'shop.delete': ['owner'],

    // Member management
    'members.view': ['owner', 'admin', 'manager'],
    'members.add': ['owner', 'admin'],
    'members.edit': ['owner', 'admin'],
    'members.remove': ['owner', 'admin'],

    // Product management
    'products.view': ['owner', 'admin', 'manager', 'staff'],
    'products.create': ['owner', 'admin', 'manager'],
    'products.edit': ['owner', 'admin', 'manager'],
    'products.delete': ['owner', 'admin'],

    // Order management
    'orders.view': ['owner', 'admin', 'manager', 'staff'],
    'orders.create': ['owner', 'admin', 'manager', 'staff'],
    'orders.edit': ['owner', 'admin', 'manager'],
    'orders.delete': ['owner', 'admin'],

    // Reports
    'reports.view': ['owner', 'admin', 'manager'],
    'reports.export': ['owner', 'admin']
}
```

### Usage Example

```typescript
import { useShopContext, useShopActions, ShopProvider } from '@/features/shop'

function ShopDashboard() {
  const { currentShop, userShops } = useShopContext()
  const { createShop, updateShop, deleteShop } = useShopActions()

  const handleCreate = async (data) => {
    await createShop(data)
  }

  return (
    <div>
      <h1>{currentShop?.shopName}</h1>
      <p>Total Shops: {userShops.length}</p>
    </div>
  )
}

// Wrap with provider
function App() {
  return (
    <ShopProvider>
      <ShopDashboard />
    </ShopProvider>
  )
}
```

---

## 🔧 Shared Utilities Feature

**Location**: `src/features/shared/`

### Overview

Reusable hooks, utilities, and types used across all features.

### Hooks

#### `useDebounce(value, delay)`

Debounce a value to reduce unnecessary updates.

```typescript
import { useDebounce } from '@/features/shared'

function SearchComponent() {
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    // Use debouncedSearch for API calls
    useEffect(() => {
        if (debouncedSearch) {
            searchAPI(debouncedSearch)
        }
    }, [debouncedSearch])
}
```

#### `useAsync(asyncFunction)`

Manage async operation state (loading, error, data).

```typescript
import { useAsync } from '@/features/shared'

function DataComponent() {
  const { execute, loading, error, data } = useAsync(fetchData)

  useEffect(() => {
    execute()
  }, [])

  if (loading) return <Spinner />
  if (error) return <Error message={error} />
  return <div>{data}</div>
}
```

#### `useLocalStorage(key, initialValue)`

Persist state in localStorage with React state.

```typescript
import { useLocalStorage } from '@/features/shared'

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  )
}
```

### Utilities

#### Format Utilities

```typescript
import { formatDate, formatCurrency, formatPhone } from '@/features/shared'

// Date formatting
formatDate(new Date()) // "Jan 1, 2024"
formatDate(new Date(), 'full') // "January 1, 2024"
formatDate(new Date(), 'short') // "1/1/24"

// Currency formatting
formatCurrency(1234.56) // "$1,234.56"
formatCurrency(1234.56, 'EUR') // "€1,234.56"

// Phone formatting
formatPhone('+11234567890') // "+1 (123) 456-7890"
```

#### Validation Utilities

```typescript
import { isValidEmail, isValidPhone, isValidURL } from '@/features/shared'

// Email validation
isValidEmail('test@example.com') // true
isValidEmail('invalid') // false

// Phone validation
isValidPhone('+11234567890') // true
isValidPhone('123') // false

// URL validation
isValidURL('https://example.com') // true
isValidURL('not-a-url') // false
```

### Types

```typescript
interface PaginationParams {
    page: number
    limit: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

interface ApiError {
    message: string
    code?: string
    details?: unknown
}

interface AsyncResult<T> {
    data: T | null
    loading: boolean
    error: Error | null
}
```

---

## 📷 Barcode Scanner Feature

**Location**: `src/features/barcode-scanner/`

### Overview

Barcode scanning functionality using device camera.

### Components

- `BarcodeScanner` - Camera-based barcode scanner

### Usage Example

```typescript
import { BarcodeScanner } from '@/features/barcode-scanner'

function ScanPage() {
  const handleScan = (barcode: string) => {
    console.log('Scanned:', barcode)
  }

  return <BarcodeScanner onScan={handleScan} />
}
```

---

## ⚠️ Error Handling Feature

**Location**: `src/features/errors/`

### Overview

Centralized error handling and display.

### Components

- `AppError` - Application-level error boundary
- `ErrorBase` - Base error component

### Usage Example

```typescript
import { AppError } from '@/features/errors'

function App() {
  return (
    <AppError>
      <YourApp />
    </AppError>
  )
}
```

---

## 🎨 UI Components

**Location**: `src/components/ui/`

### Layout Components

- `Card` - Content container
- `Sheet` - Side panel
- `Dialog` - Modal dialog
- `Drawer` - Bottom drawer (mobile)
- `Tabs` - Tab navigation
- `Accordion` - Collapsible content
- `Separator` - Visual divider
- `Sidebar` - Navigation sidebar

### Form Components

- `Input` - Text input
- `Button` - Action button
- `SubmitButton` - Button with loading state
- `Select` - Dropdown select
- `Checkbox` - Checkbox input
- `Label` - Form label
- `Form` - Form wrapper with validation
- `PhoneInput` - Phone number input
- `InputOTP` - OTP input

### Navigation Components

- `DropdownMenu` - Dropdown menu
- `Command` - Command palette
- `Popover` - Popover overlay

### Feedback Components

- `Alert` - Alert message
- `AlertDialog` - Confirmation dialog
- `Spinner` - Loading spinner
- `Skeleton` - Loading placeholder
- `Sonner` - Toast notifications

### Data Display Components

- `Table` - Data table
- `Pagination` - Page navigation
- `Avatar` - User avatar
- `Badge` - Status badge
- `Typography` - Text styles
- `Empty` - Empty state

### Utility Components

- `Tooltip` - Hover tooltip
- `ScrollArea` - Scrollable area
- `AspectRatio` - Aspect ratio container
- `Calendar` - Date picker

---

## 🎯 Custom Components

**Location**: `src/components/`

### Authentication

- `AuthGuard` - Protected route wrapper
- `UserMenu` - User dropdown menu
- `LogoutButton` - Logout action button
- `OTPInput` - Custom OTP input

### Shop

- `ShopDashboard` - Shop overview
- `ShopItem` - Shop list item
- `ShopSwitcher` - Switch between shops

### Layout

- `DashboardLayout` - Main dashboard layout
- `ProtectedLayout` - Protected route layout
- `AppSidebar` - Application sidebar

### UI

- `Logo` - Application logo
- `ThemeSwitcher` - Theme toggle
- `NavUser` - Navigation user info
- `Modal` - Generic modal wrapper

---

## 🔌 Hooks

**Location**: `src/hooks/`

### `useIsMobile()`

Detect if device is mobile (< 768px).

```typescript
import { useIsMobile } from '@/hooks/use-mobile'

function ResponsiveComponent() {
  const isMobile = useIsMobile()

  return isMobile ? <MobileView /> : <DesktopView />
}
```

### `useMobileUpdater()`

Handle mobile app updates.

```typescript
import { useMobileUpdater } from '@/hooks/use-mobile-updater'

function App() {
  useMobileUpdater() // Automatically checks for updates
  return <YourApp />
}
```

---

## 📊 State Management

**Location**: `src/stores/`

### Auth Store

```typescript
import { useAuthStore } from '@/stores/auth-store'

function Component() {
  const { user, setUser, clearUser } = useAuthStore()

  return <div>{user?.displayName}</div>
}
```

---

## 🛠️ Services

**Location**: `src/services/`

### Mobile Updater Service

Handles mobile app update checks and installations.

---

## 📚 Libraries & Configurations

**Location**: `src/lib/`

### Database

- `db/` - Database queries and repositories
- `db/schema.ts` - Database schema
- `db/queries.ts` - Query builders
- `db/repositories.ts` - Data repositories

### Validations

- `validations/shop.ts` - Shop validation schemas
- `validations/index.ts` - Validation utilities

### Configurations

- `config.ts` - App configuration
- `firebase.ts` - Firebase setup
- `swr-config.ts` - SWR configuration
- `tauri.ts` - Tauri utilities
- `utils.ts` - General utilities
- `permissions.ts` - Permission definitions
- `store.ts` - Store configuration
- `updater.ts` - Update utilities
- `image-cache.ts` - Image caching

---

## 🚀 Quick Reference

### Import Patterns

```typescript
// Features
import { useAuthActions } from '@/features/auth'
import { useShopContext } from '@/features/shop'
import { useDebounce } from '@/features/shared'

// UI Components
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Custom Components
import { Logo } from '@/components/logo'
import { ShopSwitcher } from '@/components/shop/shop-switcher'

// Hooks
import { useIsMobile } from '@/hooks/use-mobile'

// Utils
import { cn } from '@/lib/utils'
```

### Common Patterns

```typescript
// Responsive design
const isMobile = useIsMobile()

// Data fetching
const { data, error, isLoading } = useSWR('/api/data', fetcher)

// Form handling
const form = useForm({ resolver: zodResolver(schema) })

// Toast notifications
toast.success('Success!')
toast.error('Error!')

// Error handling
try {
    await action()
    toast.success('Success')
} catch (error) {
    toast.error(error.message)
}
```

---

## 📖 Additional Documentation

- **[README.md](./README.md)** - Project overview
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Architecture details
- **[AI_ASSISTANT_GUIDE.md](./AI_ASSISTANT_GUIDE.md)** - AI assistant guide
- **[.amazonq/rules/](/.amazonq/rules/)** - Coding rules and patterns
