export enum ShopRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    MANAGER = 'manager',
    STAFF = 'staff',
    VIEWER = 'viewer'
}

export enum ShopStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended'
}

export interface ShopPermission {
    resource: string
    actions: ('read' | 'write' | 'delete')[]
}

export interface Shop {
    id: string
    shopname: string
    logo_url?: string
    phone_number?: string
    email?: string
    shop_type?: string
    shop_category?: string
    shop_address?: string
    signature?: string
    status: ShopStatus
    created_userId: string
    createdAt: Date
    updatedAt: Date
}

export interface ShopMember {
    id: string
    shopId: string
    userId: string
    role: ShopRole
    permissions: ShopPermission[]
    invitedBy: string
    joinedAt: Date
    createdAt: Date
    updatedAt: Date
}

export interface ShopMemberWithUser extends ShopMember {
    email?: string
    displayName?: string
    photoURL?: string
}

export interface UserShopAccess {
    shopId: string
    shopName: string
    role: ShopRole
    permissions: ShopPermission[]
    isOwner: boolean
}
