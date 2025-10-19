export interface User {
    uid: string
    email?: string
    phone?: string
    name?: string | null
    photo?: string | null
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
