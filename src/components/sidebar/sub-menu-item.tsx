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
                    className="w-full h-10 px-3"
                    onClick={() => onClick(subItem)}
                >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{subItem.label}</span>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }
)

SubMenuItem.displayName = 'SubMenuItem'
