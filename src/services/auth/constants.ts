export const OTP_EXPIRY_MINUTES = 10
export const OTP_MAX_ATTEMPTS = 3
export const DEVICE_TRUST_DAYS = 30
export const STORE_FILE = 'auth.json'

export const COLLECTIONS = {
    USERS: 'users',
    OTP_REQUESTS: 'otp_requests',
    TRUSTED_DEVICES: 'trusted_devices'
} as const

export const STORE_KEYS = {
    DEVICE_ID: 'deviceId',
    DEVICE_TOKEN: 'deviceToken',
    USER_ID: 'userId',
    USER_SESSION: 'userSession',
    LOGOUT_FLAG: 'logoutFlag',
    LAST_LOGIN_TYPE: 'lastLoginType'
} as const
