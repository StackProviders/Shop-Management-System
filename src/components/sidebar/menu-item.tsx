import { memo } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import {
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { SidebarItem } from './types'

interface MenuItemProps {
    item: SidebarItem
    onClick: (item: SidebarItem) => void
    isActive?: boolean
}

export const MenuItem = memo(({ item, onClick, isActive }: MenuItemProps) => {
    const Icon = item.icon
    const hasSubItems = !!item.subItems?.length
    const badgeValue =
        typeof item.badge === 'function' ? item.badge() : item.badge

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                className="w-full h-10 px-3"
                onClick={() => onClick(item)}
                isActive={isActive}
            >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                </div>
                {(badgeValue || hasSubItems) && (
                    <div className="flex items-center gap-1 shrink-0 ml-auto">
                        {badgeValue ? (
                            <SidebarMenuBadge
                                className={cn(
                                    'min-w-fit',
                                    hasSubItems && 'gap-x-3'
                                )}
                            >
                                {badgeValue}
                                {hasSubItems && (
                                    <IconChevronRight className="h-4 w-4 transition-transform shrink-0" />
                                )}
                            </SidebarMenuBadge>
                        ) : (
                            <IconChevronRight className="h-4 w-4 transition-transform shrink-0" />
                        )}
                    </div>
                )}
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
})

MenuItem.displayName = 'MenuItem'
