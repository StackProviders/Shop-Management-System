export enum ShopRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    SALES_MANAGER = 'sales_manager',
    MANAGER = 'manager',
    ACCOUNTING = 'accounting',
    SALES_STAFF = 'sales_staff',
    VIEWER = 'viewer'
}

export interface ShopMember {
    userId: string
    email: string
    displayName?: string
    role: ShopRole
    joinedAt: Date
    permissions: ShopPermission[]
}

export interface ShopPermission {
    resource: string // e.g., 'inventory', 'sales', 'reports', 'settings'
    actions: string[] // e.g., ['read', 'write', 'delete']
}

export interface Shop {
    id: string
    name: string
    description?: string
    address?: string
    phone?: string
    email?: string
    logo?: string
    ownerId: string
    members: ShopMember[]
    settings: ShopSettings
    createdAt: Date
    updatedAt: Date
}

export interface ShopSettings {
    currency: string
    timezone: string
    businessHours: {
        open: string
        close: string
        days: number[] // 0-6 (Sunday-Saturday)
    }
    features: {
        inventory: boolean
        sales: boolean
        reports: boolean
        multiLocation: boolean
    }
}

export interface UserShopAccess {
    shopId: string
    shopName: string
    role: ShopRole
    permissions: ShopPermission[]
    isOwner: boolean
    isAdmin: boolean
}
