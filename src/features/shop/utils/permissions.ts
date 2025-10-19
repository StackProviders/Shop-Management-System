import { ShopRole, ShopPermission } from '../types'

export function hasPermission(
    role: ShopRole,
    permissions: ShopPermission[],
    resource: string,
    action: 'read' | 'write' | 'delete'
): boolean {
    if (role === ShopRole.OWNER) return true

    const permission = permissions.find((p) => p.resource === resource)
    return permission ? permission.actions.includes(action) : false
}

export function canManageMembers(role: ShopRole): boolean {
    return [ShopRole.OWNER, ShopRole.ADMIN].includes(role)
}

export function canEditShop(role: ShopRole): boolean {
    return [ShopRole.OWNER, ShopRole.ADMIN, ShopRole.MANAGER].includes(role)
}

export function canDeleteShop(role: ShopRole): boolean {
    return role === ShopRole.OWNER
}
