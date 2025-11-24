export interface User {
    uid: string
    email?: string | null
    phone?: string | null
    name?: string | null
    photo?: string | null
    providers?: Array<{
        providerId: string
        uid: string
        displayName: string | null
        email: string | null
        phoneNumber: string | null
        photoURL: string | null
    }>
    createdAt: Date
    lastLoginAt: Date
}

export interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
    isAuthenticated: boolean
}

export type LoginType = 'email' | 'phone'

export interface LoginFormData {
    identifier: string
    type: LoginType
}

export interface OTPVerificationData {
    identifier: string
    otp: string
    trustDevice?: boolean
}
