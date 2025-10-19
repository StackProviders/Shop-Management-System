# Global Store Management Guide

## Overview

Centralized Tauri LazyStore management for persistent data across the application.

## Store Instances

### 1. **authStore** (`auth.json`)

Authentication and device-related data

- Device ID and tokens
- User session
- Login preferences

### 2. **shopStore** (`shop-settings.json`)

Shop-related settings

- Current shop selection
- Shop preferences

### 3. **appStore** (`app-settings.json`)

Application-wide settings

- Theme preferences
- Language settings
- Notification preferences

## Usage

### Import

```typescript
import {
    authStore,
    shopStore,
    appStore,
    STORE_KEYS,
    storeHelpers
} from '@/lib/store'
```

### Get Value

```typescript
const userId = await storeHelpers.get<string>(authStore, STORE_KEYS.USER_ID)
```

### Set Value

```typescript
await storeHelpers.set(authStore, STORE_KEYS.USER_ID, 'user123')
// Auto-saves after setting
```

### Delete Value

```typescript
await storeHelpers.delete(authStore, STORE_KEYS.USER_ID)
```

### Clear Store

```typescript
await storeHelpers.clear(authStore)
```

## Available Keys

### Auth Keys

- `DEVICE_ID` - Unique device identifier
- `DEVICE_TOKEN` - Device trust token
- `USER_ID` - Current user ID
- `USER_SESSION` - User session data
- `LOGOUT_FLAG` - Logout state flag
- `LAST_LOGIN_TYPE` - Last login method used

### Shop Keys

- `CURRENT_SHOP_ID` - Currently selected shop

### App Keys

- `THEME` - UI theme preference
- `LANGUAGE` - Language preference
- `NOTIFICATIONS_ENABLED` - Notification settings

## Benefits

✅ **Centralized** - Single source of truth for all stores
✅ **Type-Safe** - Full TypeScript support
✅ **Auto-Save** - Automatic persistence after changes
✅ **Cross-Platform** - Works on all Tauri targets
✅ **Efficient** - Lazy loading and optimized I/O
✅ **Consistent API** - Same interface for all operations

## Adding New Keys

1. Add key to `STORE_KEYS` in `src/lib/store.ts`
2. Use with `storeHelpers` functions
3. Document in this guide

## Migration from localStorage

```typescript
// Before
localStorage.setItem('key', 'value')
const value = localStorage.getItem('key')

// After
await storeHelpers.set(appStore, 'key', 'value')
const value = await storeHelpers.get<string>(appStore, 'key')
```

## Best Practices

1. Always use `storeHelpers` for consistency
2. Use appropriate store for data type
3. Define keys in `STORE_KEYS` constant
4. Handle null returns from `get()`
5. Use TypeScript generics for type safety
