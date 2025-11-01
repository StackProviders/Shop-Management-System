import type React from 'react'

export interface SidebarItemAction {
    icon?: React.ComponentType<{ className?: string }>
    onClick: () => void
    label?: string
}

export interface SidebarSubItem {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    route?: string
}

export interface SidebarItem {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    badge?: string | (() => string | number | undefined)
    route?: string
    subItems?: SidebarSubItem[]
    action?: SidebarItemAction
}
