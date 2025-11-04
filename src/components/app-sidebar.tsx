import { useState, useCallback, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { IconArrowLeft } from '@tabler/icons-react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ShopSwitcher } from '@/components/shop/shop-switcher'
import { Button } from '@/components/ui/button'
import { NavUser } from '@/components/nav-user'
import {
    sidebarItems,
    MenuItem,
    SubMenuItem,
    type SidebarItem,
    type SidebarSubItem
} from './sidebar'
import { ThemeSwitcher } from './theme-switcher'

export function AppSidebar() {
    const { open, isMobile, setOpenMobile } = useSidebar()
    const navigate = useNavigate()
    const location = useLocation()
    const [activeItem, setActiveItem] = useState<string | null>(null)
    const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null)

    const activeItemData = useMemo(
        () => sidebarItems.find((item) => item.id === activeItem),
        [activeItem]
    )

    useEffect(() => {
        const currentPath = location.pathname

        for (const item of sidebarItems) {
            if (item.route === currentPath) {
                setSelectedSubItem(null)
                return
            }

            if (item.subItems) {
                const matchedSubItem = item.subItems.find(
                    (sub) => sub.route === currentPath
                )
                if (matchedSubItem) {
                    setSelectedSubItem(matchedSubItem.id)
                    return
                }
            }
        }
    }, [location.pathname])

    const handleItemClick = useCallback(
        (item: SidebarItem) => {
            if (item.subItems?.length) {
                setActiveItem(item.id)
                setSelectedSubItem(null)
            } else if (item.route) {
                navigate({ to: item.route })
                setOpenMobile(false)
            }
        },
        [navigate, setOpenMobile]
    )

    const handleSubItemClick = useCallback(
        (subItem: SidebarSubItem) => {
            if (subItem.route) {
                navigate({ to: subItem.route })
                setSelectedSubItem(subItem.id)
                setOpenMobile(false)
            }
        },
        [navigate, setOpenMobile]
    )

    const handleBackToMain = useCallback(() => {
        setActiveItem(null)
        setSelectedSubItem(null)
    }, [])

    return (
        <Sidebar side="left" variant="sidebar" collapsible="icon">
            {!activeItem ? (
                <>
                    <SidebarHeader>
                        <ShopSwitcher />
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {sidebarItems.map((item) => (
                                        <MenuItem
                                            key={item.id}
                                            item={item}
                                            onClick={handleItemClick}
                                            isActive={
                                                location.pathname === item.route
                                            }
                                        />
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <ThemeSwitcher />
                        <NavUser />
                    </SidebarFooter>
                </>
            ) : (
                activeItemData?.subItems && (
                    <>
                        <SidebarHeader className="flex flex-row items-center justify-between border-b h-14 md:h-16 px-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleBackToMain}
                                className="h-9 w-9 shrink-0"
                                aria-label="Back to main menu"
                            >
                                <IconArrowLeft className="h-4 w-4" />
                            </Button>
                            <h3
                                className={cn(
                                    !isMobile && !open && 'hidden',
                                    'font-medium flex-1 text-center text-sm md:text-base truncate px-2'
                                )}
                            >
                                {activeItemData.label}
                            </h3>
                            <div className="w-9 shrink-0" />
                        </SidebarHeader>

                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {activeItemData.subItems.map(
                                            (subItem) => (
                                                <SubMenuItem
                                                    key={subItem.id}
                                                    subItem={subItem}
                                                    isSelected={
                                                        selectedSubItem ===
                                                        subItem.id
                                                    }
                                                    onClick={handleSubItemClick}
                                                />
                                            )
                                        )}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </>
                )
            )}
        </Sidebar>
    )
}
