import { ShopRole, ShopPermission } from '@/types/shop'

export const ROLE_PERMISSIONS: Record<ShopRole, ShopPermission[]> = {
    [ShopRole.OWNER]: [
        { resource: 'shop', actions: ['read', 'write', 'delete'] },
        { resource: 'members', actions: ['read', 'write', 'delete'] },
        { resource: 'inventory', actions: ['read', 'write', 'delete'] },
        { resource: 'sales', actions: ['read', 'write', 'delete'] },
        { resource: 'reports', actions: ['read', 'write', 'delete'] },
        { resource: 'settings', actions: ['read', 'write', 'delete'] },
        { resource: 'billing', actions: ['read', 'write', 'delete'] }
    ],
    [ShopRole.ADMIN]: [
        { resource: 'shop', actions: ['read', 'write'] },
        { resource: 'members', actions: ['read', 'write'] },
        { resource: 'inventory', actions: ['read', 'write', 'delete'] },
        { resource: 'sales', actions: ['read', 'write', 'delete'] },
        { resource: 'reports', actions: ['read', 'write', 'delete'] },
        { resource: 'settings', actions: ['read', 'write'] }
    ],
    [ShopRole.MANAGER]: [
        { resource: 'shop', actions: ['read'] },
        { resource: 'members', actions: ['read'] },
        { resource: 'inventory', actions: ['read', 'write'] },
        { resource: 'sales', actions: ['read', 'write'] },
        { resource: 'reports', actions: ['read', 'write'] }
    ],
    [ShopRole.STAFF]: [
        { resource: 'shop', actions: ['read'] },
        { resource: 'inventory', actions: ['read'] },
        { resource: 'sales', actions: ['read', 'write'] }
    ],
    [ShopRole.VIEWER]: [
        { resource: 'shop', actions: ['read'] },
        { resource: 'inventory', actions: ['read'] },
        { resource: 'sales', actions: ['read'] },
        { resource: 'reports', actions: ['read'] }
    ]
}

export function hasPermission(
    userPermissions: ShopPermission[],
    resource: string,
    action: 'read' | 'write' | 'delete'
): boolean {
    return userPermissions.some(
        (permission) =>
            permission.resource === resource &&
            permission.actions.includes(action)
    )
}

export function getUserPermissions(role: ShopRole): ShopPermission[] {
    return ROLE_PERMISSIONS[role] || []
}

export function canManageMembers(role: ShopRole): boolean {
    return [ShopRole.OWNER, ShopRole.ADMIN].includes(role)
}

export function canManageShop(role: ShopRole): boolean {
    return [ShopRole.OWNER, ShopRole.ADMIN].includes(role)
}

export function canAccessReports(role: ShopRole): boolean {
    return [ShopRole.OWNER, ShopRole.ADMIN, ShopRole.MANAGER].includes(role)
}

export function canAccessInventory(role: ShopRole): boolean {
    return [
        ShopRole.OWNER,
        ShopRole.ADMIN,
        ShopRole.MANAGER,
        ShopRole.STAFF
    ].includes(role)
}
