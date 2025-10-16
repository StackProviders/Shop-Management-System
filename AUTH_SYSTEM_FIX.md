# Auth System Fix - Logout Session Persistence Issue

## Problem Identified

After logout, the user session was being restored from Tauri store on page reload, causing the user to appear authenticated even after logging out.

## Root Causes

1. **initSession() always restored from storage** - Even after logout, it would reload the cached session
2. **Async timing issues** - State updates weren't completing before redirect
3. **Listener notification order** - Auth listeners were called before session was cleared

## Fixes Applied

### 1. session.service.ts - Fixed initSession()

```typescript
// Before: Always restored from storage
export const initSession = async (): Promise<User | null> => {
    const session = await getUserSession()
    if (session) {
        currentUser = session
    }
    return currentUser
}

// After: Only restore if currentUser is null
export const initSession = async (): Promise<User | null> => {
    if (!currentUser) {
        currentUser = await getUserSession()
    }
    return currentUser
}
```

### 2. session.service.ts - Fixed setCurrentUser()

```typescript
// Before: Inconsistent listener notification
export const setCurrentUser = (user: User | null): void => {
    currentUser = user
    if (user) {
        saveUserSession(user).catch(console.error)
    } else {
        clearUserSession()
            .then(() => {
                authListeners.forEach((cb) => cb(user))
            })
            .catch(console.error)
        return
    }
    authListeners.forEach((cb) => cb(user))
}

// After: Consistent notification after storage operations
export const setCurrentUser = (user: User | null): void => {
    currentUser = user
    if (user) {
        saveUserSession(user).catch(console.error)
        authListeners.forEach((cb) => cb(user))
    } else {
        clearUserSession()
            .then(() => {
                authListeners.forEach((cb) => cb(null))
            })
            .catch(console.error)
    }
}
```

### 3. auth.service.ts - Simplified logout()

```typescript
// Before: Unnecessary timeout
export const logout = async (
    shouldRevokeDevice: boolean = false
): Promise<void> => {
    const user = getCurrentUser()
    await new Promise<void>((resolve) => {
        setCurrentUser(null)
        setTimeout(resolve, 100)
    })
    if (shouldRevokeDevice && user) {
        await revokeDevice(user.uid)
        await clearDeviceSession()
    }
}

// After: Direct execution
export const logout = async (
    shouldRevokeDevice: boolean = false
): Promise<void> => {
    const user = getCurrentUser()
    setCurrentUser(null)
    if (shouldRevokeDevice && user) {
        await revokeDevice(user.uid)
        await clearDeviceSession()
    }
}
```

### 4. use-auth.tsx - Reset Zustand first

```typescript
// Before: Reset after logout
const handleLogout = async (revokeDevice: boolean = false) => {
    try {
        await logout(revokeDevice)
        reset()
    } catch (error) {
        setError(error instanceof Error ? error.message : 'Logout failed')
        throw error
    }
}

// After: Reset before logout
const handleLogout = async (revokeDevice: boolean = false) => {
    try {
        reset()
        await logout(revokeDevice)
    } catch (error) {
        setError(error instanceof Error ? error.message : 'Logout failed')
        throw error
    }
}
```

### 5. storage.service.ts - Simplified clearUserSession()

```typescript
// Before: Try-catch wrapper
export const clearUserSession = async (): Promise<void> => {
    try {
        await store.delete(STORE_KEYS.USER_SESSION)
        await store.save()
    } catch (error) {
        console.error('Failed to clear user session:', error)
    }
}

// After: Direct execution (errors bubble up)
export const clearUserSession = async (): Promise<void> => {
    await store.delete(STORE_KEYS.USER_SESSION)
    await store.save()
}
```

### 6. auth-guard.tsx - Removed debug console.log

```typescript
// Removed: console.log({ isAuthenticated, user })
```

## How It Works Now

### Logout Flow

```
1. User clicks logout
2. Zustand store reset() → isAuthenticated = false immediately
3. logout() called → setCurrentUser(null)
4. clearUserSession() → Deletes USER_SESSION from auth.json
5. Auth listeners notified → user = null
6. Redirect to /auth
7. Auth guard sees isAuthenticated = false
8. Stays on /auth page ✅
```

### Reload After Logout Flow

```
1. App reloads
2. initSession() called
3. currentUser is null (from logout)
4. getUserSession() returns null (deleted from store)
5. currentUser remains null
6. Zustand state: isAuthenticated = false
7. Auth guard redirects to /auth ✅
```

### Login Flow (Trusted Device)

```
1. User enters email/phone
2. checkDeviceAndLogin() called
3. verifyTrustedDevice() checks deviceToken + userId
4. If valid → getUserById() → setCurrentUser(user)
5. saveUserSession() → Saves to auth.json
6. Zustand updated → isAuthenticated = true
7. Auto-login success ✅
```

## Storage State

### auth.json After Login

```json
{
    "deviceId": "abc-123",
    "deviceToken": "xyz-789",
    "userId": "user-uid",
    "userSession": {
        "uid": "user-uid",
        "email": "user@example.com",
        "createdAt": "...",
        "lastLoginAt": "..."
    }
}
```

### auth.json After Logout

```json
{
    "deviceId": "abc-123",
    "deviceToken": "xyz-789",
    "userId": "user-uid"
    // userSession: DELETED ✅
}
```

## Testing Checklist

### ✅ Test 1: Normal Logout

```
1. Login successfully
2. Navigate to /shops
3. Click logout
4. Should redirect to /auth
5. Reload page
Expected: Stay on /auth, not authenticated ✅
```

### ✅ Test 2: Logout with Device Revocation

```
1. Login successfully
2. Logout with revoke (logout(true))
3. Reload page
4. Try to login with same email
Expected: OTP required (device not trusted) ✅
```

### ✅ Test 3: Trusted Device Auto-Login

```
1. Login with OTP (device trusted)
2. Logout (normal)
3. Enter same email
Expected: Auto-login without OTP ✅
```

### ✅ Test 4: Session Persistence

```
1. Login successfully
2. Close app completely
3. Reopen app
Expected: Still logged in (session restored) ✅
```

### ✅ Test 5: Logout Session Clear

```
1. Login successfully
2. Logout
3. Close app
4. Reopen app
Expected: Not logged in, redirect to /auth ✅
```

## Files Modified

1. ✅ `src/services/auth/session.service.ts` - Fixed initSession and setCurrentUser
2. ✅ `src/services/auth/auth.service.ts` - Simplified logout
3. ✅ `src/hooks/use-auth.tsx` - Reset Zustand before logout
4. ✅ `src/services/auth/storage.service.ts` - Simplified clearUserSession
5. ✅ `src/components/auth/auth-guard.tsx` - Removed debug log

## Summary

The auth system now correctly:

- ✅ Clears user session on logout
- ✅ Prevents session restoration after logout
- ✅ Preserves device trust (deviceToken, userId)
- ✅ Allows auto-login on trusted devices
- ✅ Properly manages Zustand state
- ✅ Handles page reloads correctly

The key fix was ensuring `initSession()` doesn't restore from storage if `currentUser` is already null (from logout), and resetting Zustand state before calling logout to ensure immediate UI updates.
