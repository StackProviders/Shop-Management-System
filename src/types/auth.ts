export interface User {
    uid: string
    email: string
    displayName?: string
    photoURL?: string
    emailVerified: boolean
    createdAt: Date
    updatedAt: Date
}

export interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
}

export interface LoginCredentials {
    email: string
}

export interface RegisterCredentials {
    email: string
    displayName?: string
}

export interface OTPVerification {
    email: string
    otp: string
}
