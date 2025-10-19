import { ShopRole, ShopPermission } from '@/types/shop'

export const DEFAULT_PERMISSIONS: Record<ShopRole, ShopPermission[]> = {
    [ShopRole.OWNER]: [
        { resource: 'inventory', actions: ['read', 'write', 'delete'] },
        { resource: 'sales', actions: ['read', 'write', 'delete'] },
        { resource: 'reports', actions: ['read', 'write', 'delete'] },
        { resource: 'settings', actions: ['read', 'write', 'delete'] },
        { resource: 'members', actions: ['read', 'write', 'delete'] }
    ],
    [ShopRole.ADMIN]: [
        { resource: 'inventory', actions: ['read', 'write', 'delete'] },
        { resource: 'sales', actions: ['read', 'write', 'delete'] },
        { resource: 'reports', actions: ['read', 'write'] },
        { resource: 'settings', actions: ['read', 'write'] },
        { resource: 'members', actions: ['read', 'write'] }
    ],
    [ShopRole.MANAGER]: [
        { resource: 'inventory', actions: ['read', 'write'] },
        { resource: 'sales', actions: ['read', 'write'] },
        { resource: 'reports', actions: ['read'] },
        { resource: 'settings', actions: ['read'] },
        { resource: 'members', actions: ['read'] }
    ],
    [ShopRole.STAFF]: [
        { resource: 'inventory', actions: ['read'] },
        { resource: 'sales', actions: ['read', 'write'] },
        { resource: 'reports', actions: ['read'] }
    ],
    [ShopRole.VIEWER]: [
        { resource: 'inventory', actions: ['read'] },
        { resource: 'sales', actions: ['read'] },
        { resource: 'reports', actions: ['read'] }
    ]
}

export const hasPermission = (
    permissions: ShopPermission[],
    resource: string,
    action: 'read' | 'write' | 'delete'
): boolean => {
    const permission = permissions.find((p) => p.resource === resource)
    return permission ? permission.actions.includes(action) : false
}

export const canManageMembers = (role: ShopRole): boolean => {
    return [ShopRole.OWNER, ShopRole.ADMIN].includes(role)
}

export const canManageSettings = (role: ShopRole): boolean => {
    return [ShopRole.OWNER, ShopRole.ADMIN].includes(role)
}

export const canDeleteShop = (role: ShopRole): boolean => {
    return role === ShopRole.OWNER
}
