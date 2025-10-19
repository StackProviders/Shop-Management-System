# Quick Reference Guide

## Common Imports

### Authentication

```typescript
// Hooks
import {
    useAuthActions,
    useCurrentUser,
    useIsAuthenticated
} from '@/features/auth'

// Components
import { LoginForm, ProfileForm } from '@/features/auth'

// Types
import { User, LoginType, AuthState } from '@/features/auth'
```

### Shop Management

```typescript
// Hooks
import {
    useShopContext,
    useShopActions,
    useUserShops,
    useShopMembers
} from '@/features/shop'

// Components
import { ShopProvider } from '@/features/shop'

// Types
import { Shop, ShopRole, UserShopAccess, ShopMember } from '@/features/shop'

// Utils
import {
    hasPermission,
    canManageMembers,
    validateShopData
} from '@/features/shop'
```

### Shared Utilities

```typescript
// Hooks
import { useDebounce, useAsync, useLocalStorage } from '@/features/shared'

// Utils
import {
    formatDate,
    formatCurrency,
    isValidEmail,
    isValidPhone
} from '@/features/shared'
```

## Common Patterns

### Authentication Flow

```typescript
function LoginPage() {
  const { sendOTP, verifyOTP } = useAuthActions()
  const navigate = useNavigate()

  const handleLogin = async (identifier: string) => {
    await sendOTP(identifier, 'email')
    // Show OTP input
  }

  const handleVerify = async (otp: string) => {
    await verifyOTP(identifier, otp, true)
    navigate('/shops')
  }

  return <LoginForm onSuccess={() => navigate('/shops')} />
}
```

### Protected Route

```typescript
function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated()
  const loading = useAuthLoading()

  if (loading) return <Spinner />
  if (!isAuthenticated) return <Navigate to="/auth" />

  return children
}
```

### Shop Management

```typescript
function ShopDashboard() {
  const { currentShop, userShops, setCurrentShop } = useShopContext()
  const { createShop, updateShop } = useShopActions()

  const handleCreate = async (data) => {
    await createShop(data)
  }

  return (
    <div>
      <h1>{currentShop?.shopName}</h1>
      {/* Shop UI */}
    </div>
  )
}
```

### Shop Members

```typescript
function MembersList({ shopId }) {
  const { members, loading, refreshMembers } = useShopMembers(shopId)
  const { addMember, removeMember } = useShopActions()

  if (loading) return <Spinner />

  return (
    <div>
      {members.map(member => (
        <div key={member.id}>
          {member.displayName} - {member.role}
        </div>
      ))}
    </div>
  )
}
```

### Permission Checking

```typescript
function ShopSettings() {
  const { currentShop } = useShopContext()

  if (!canEditShop(currentShop.role)) {
    return <div>No permission</div>
  }

  return <SettingsForm />
}
```

### Form with Validation

```typescript
function CreateShopForm() {
  const [formData, setFormData] = useState<CreateShopData>({
    shopname: '',
    email: ''
  })
  const [errors, setErrors] = useState<string[]>([])
  const { createShop } = useShopActions()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateShopData(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    await createShop(formData)
  }

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>
}
```

### Debounced Search

```typescript
function SearchShops() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const { userShops } = useUserShops(userId)

  const filtered = userShops.filter(shop =>
    shop.shopName.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.map(shop => <div key={shop.shopId}>{shop.shopName}</div>)}
    </div>
  )
}
```

### Async Operations

```typescript
function DataLoader() {
  const { data, loading, error, execute } = useAsync<Shop[]>()

  useEffect(() => {
    execute(() => shopApi.getUserShops(userId))
  }, [userId])

  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />

  return <div>{data?.map(shop => <ShopCard key={shop.id} shop={shop} />)}</div>
}
```

### Local Storage

```typescript
function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'light')

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme: {theme}
    </button>
  )
}
```

## API Reference

### Auth Actions

```typescript
const {
    sendOTP, // (identifier, type) => Promise<void>
    verifyOTP, // (identifier, otp, trustDevice) => Promise<User>
    checkDeviceAndLogin, // (identifier) => Promise<User | null>
    logout, // (revokeDevice) => Promise<void>
    updateProfile, // (name?, photo?) => Promise<void>
    uploadPhoto // (file) => Promise<string>
} = useAuthActions()
```

### Shop Actions

```typescript
const {
    createShop, // (userId, shopData) => Promise<Shop>
    updateShop, // (shopId, updates) => Promise<void>
    deleteShop, // (shopId) => Promise<void>
    addMember, // (shopId, userId, memberData) => Promise<void>
    updateMemberRole, // (shopId, userId, role, permissions) => Promise<void>
    removeMember // (shopId, userId) => Promise<void>
} = useShopActions()
```

### Shop Context

```typescript
const {
    userShops, // UserShopAccess[]
    currentShop, // UserShopAccess | null
    setCurrentShop, // (shop) => void
    loading, // boolean
    error, // string | null
    refreshShops, // () => Promise<void>
    createShop // (shopData) => Promise<void>
} = useShopContext()
```

### User Shops

```typescript
const {
    userShops, // UserShopAccess[]
    loading, // boolean
    error, // string | null
    refreshShops // () => Promise<void>
} = useUserShops(userId)
```

### Shop Members

```typescript
const {
    members, // ShopMemberWithUser[]
    loading, // boolean
    error, // string | null
    refreshMembers // () => Promise<void>
} = useShopMembers(shopId)
```

## Utility Functions

### Validation

```typescript
isValidEmail(email: string): boolean
isValidPhone(phone: string): boolean
isValidUrl(url: string): boolean
isEmpty(value: unknown): boolean
validateShopData(data: CreateShopData): string[]
```

### Formatting

```typescript
formatDate(date: Date | string): string
formatDateTime(date: Date | string): string
formatCurrency(amount: number, currency?: string): string
formatPhone(phone: string): string
truncate(str: string, length: number): string
```

### Permissions

```typescript
hasPermission(role, permissions, resource, action): boolean
canManageMembers(role: ShopRole): boolean
canEditShop(role: ShopRole): boolean
canDeleteShop(role: ShopRole): boolean
```

## Types

### Auth Types

```typescript
interface User {
    uid: string
    email?: string
    phone?: string
    name?: string
    photo?: string
    lastLogin?: Date
}

type LoginType = 'email' | 'phone'
```

### Shop Types

```typescript
enum ShopRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    MANAGER = 'manager',
    STAFF = 'staff',
    VIEWER = 'viewer'
}

interface Shop {
    id: string
    shopname: string
    logo_url?: string
    phone_number?: string
    email?: string
    shop_category?: string
    shop_address?: string
    status: ShopStatus
    created_userId: string
    createdAt: Date
    updatedAt: Date
}

interface UserShopAccess {
    shopId: string
    shopName: string
    role: ShopRole
    permissions: ShopPermission[]
    isOwner: boolean
    logoUrl?: string
    shopCategory?: string
    shopAddress?: string
}
```

## Environment Setup

### Required Providers

```typescript
// app/provider.tsx
<AuthProvider>
  <ShopProvider>
    <App />
  </ShopProvider>
</AuthProvider>
```

### Router Setup

```typescript
// app/router.tsx
<Route path="/auth" element={<AuthPage />} />
<Route path="/shops" element={<ProtectedRoute><ShopsPage /></ProtectedRoute>} />
```
