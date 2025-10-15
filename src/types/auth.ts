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
