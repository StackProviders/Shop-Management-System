import { memo } from 'react'
import { IconChevronRight } from '@tabler/icons-react'
import {
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuBadge,
    SidebarMenuAction
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
    const ActionIcon = item.action?.icon

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                className="w-full h-10 px-3 flex items-center"
                onClick={() => onClick(item)}
                isActive={isActive}
            >
                <Icon className="size-6 shrink-0" />
                <span className="truncate flex-1">{item.label}</span>
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
            {item.action && ActionIcon && (
                <SidebarMenuAction
                    onClick={(e) => {
                        e.stopPropagation()
                        item.action?.onClick()
                    }}
                    aria-label={item.action.label}
                    className="flex items-center justify-center !top-2 right-1"
                >
                    <ActionIcon className="size-4" />
                </SidebarMenuAction>
            )}
        </SidebarMenuItem>
    )
})

MenuItem.displayName = 'MenuItem'
