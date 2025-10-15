export interface OTPRequest {
    otpHash: string
    expiresAt: Date
    attempts: number
    createdAt: Date
}

export interface TrustedDevice {
    deviceTokenHash: string
    deviceInfo: string
    createdAt: Date
    expiresAt: Date
    revoked: boolean
}

export interface User {
    uid: string
    email?: string
    phone?: string
    name?: string | null
    photo?: string | null
    createdAt: Date
    lastLoginAt: Date
}

export interface UserDocument {
    email: string | null
    phone: string | null
    name: string | null
    photo: string | null
    createdAt: Date
    lastLoginAt: Date | null
}

export interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
}
