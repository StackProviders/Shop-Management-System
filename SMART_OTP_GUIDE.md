# Smart OTP Authentication Guide

## Overview

The authentication system now includes smart OTP verification that remembers trusted devices for 30 days.

## How It Works

### First Login (New Device)

1. User enters email/phone
2. System sends OTP
3. User verifies OTP
4. Device is automatically trusted for 30 days

### Subsequent Logins (Trusted Device)

1. User enters email/phone
2. System checks if device was used in last 30 days
3. If trusted: User is logged in automatically (no OTP required)
4. If not trusted: OTP verification is required

## Usage

### Check if OTP is Required

```typescript
import { useAuthActions } from '@/features/auth'

function LoginForm() {
    const { isOTPRequired, checkDeviceAndLogin, sendOTP } = useAuthActions()

    const handleLogin = async (identifier: string) => {
        // Try to login with trusted device first
        const user = await checkDeviceAndLogin(identifier)

        if (user) {
            // Device is trusted, user logged in automatically
            navigate('/dashboard')
        } else {
            // Device not trusted, send OTP
            await sendOTP(identifier, type)
            setShowOTPInput(true)
        }
    }
}
```

### Alternative: Check Before Sending OTP

```typescript
const handleLogin = async (identifier: string) => {
    const otpRequired = await isOTPRequired(identifier)

    if (!otpRequired) {
        // Device is trusted, login directly
        const user = await checkDeviceAndLogin(identifier)
        navigate('/dashboard')
    } else {
        // Send OTP for verification
        await sendOTP(identifier, type)
        setShowOTPInput(true)
    }
}
```

### Verify OTP (Automatically Trusts Device)

```typescript
const handleVerifyOTP = async (otp: string) => {
    // Device is automatically trusted for 30 days after successful verification
    const user = await verifyOTP(identifier, otp)
    navigate('/dashboard')
}
```

### Logout Options

```typescript
// Normal logout (keeps device trusted)
await logout(false)

// Logout and revoke device trust (requires OTP on next login)
await logout(true)
```

## Configuration

Device trust duration is configured in `src/features/auth/services/constants.ts`:

```typescript
export const DEVICE_TRUST_DAYS = 30 // Change this to adjust trust period
```

## Security Features

- ✅ Device fingerprinting using browser/device ID
- ✅ Automatic device trust expiration after 30 days
- ✅ Option to revoke device trust on logout
- ✅ Secure device token hashing
- ✅ Automatic cleanup of expired device sessions

## API Reference

### `isOTPRequired(identifier: string): Promise<boolean>`

Checks if OTP verification is required for the given identifier on this device.

### `checkDeviceAndLogin(identifier: string): Promise<User | null>`

Attempts to login using trusted device. Returns user if successful, null if OTP required.

### `verifyOTP(identifier: string, otp: string, trustDevice?: boolean): Promise<User>`

Verifies OTP and logs in user. `trustDevice` defaults to `true` (30-day trust).

### `logout(revokeDevice?: boolean): Promise<void>`

Logs out user. Set `revokeDevice` to `true` to remove device trust.
