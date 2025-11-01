import { memo } from 'react'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import type { SidebarSubItem } from './types'

interface SubMenuItemProps {
    subItem: SidebarSubItem
    isSelected: boolean
    onClick: (subItem: SidebarSubItem) => void
}

export const SubMenuItem = memo(
    ({ subItem, isSelected, onClick }: SubMenuItemProps) => {
        const Icon = subItem.icon

        return (
            <SidebarMenuItem>
                <SidebarMenuButton
                    isActive={isSelected}
                    className="w-full h-10 px-3 items-center"
                    onClick={() => onClick(subItem)}
                >
                    <Icon className="size-6 shrink-0" />
                    <span className="truncate flex-1">{subItem.label}</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }
)

SubMenuItem.displayName = 'SubMenuItem'
