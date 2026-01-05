import {
    IconDotsVertical,
    IconLogout,
    IconSettings,
    IconUserCircle
} from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar'
import { useAuth } from '@/features/auth'
import { LogoutButton } from '../auth'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export function NavUser() {
    const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
    const [isOpenLogout, setIsOpenLogout] = useState<boolean>(false)
    const { isMobile } = useSidebar()
    const { authState } = useAuth()
    const navigate = useNavigate()

    const user = {
        name: authState.user?.name || 'User',
        email: authState.user?.email || authState.user?.phone || '',
        avatar: authState.user?.photo || ''
    }

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu
                        open={isOpenDropdown}
                        onOpenChange={(open) => setIsOpenDropdown(open)}
                    >
                        <DropdownMenuTrigger>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                asChild
                            >
                                <span>
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={user.avatar}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {user.name.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user.name}
                                        </span>
                                        <span className="text-muted-foreground truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                    <IconDotsVertical className="ml-auto size-4" />
                                </span>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            side={isMobile ? 'bottom' : 'right'}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={user.avatar}
                                                alt={user.name}
                                            />
                                            <AvatarFallback className="rounded-lg">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {user.name}
                                            </span>
                                            <span className="text-muted-foreground truncate text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() =>
                                        navigate({ to: '/settings' })
                                    }
                                >
                                    <IconUserCircle className="size-4" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        navigate({ to: '/settings' })
                                    }
                                >
                                    <IconSettings className="size-4" />
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() => setIsOpenLogout(true)}
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    <IconLogout className="size-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <LogoutButton
                showConfirm={true}
                alertOpen={isOpenLogout}
                onAlertClose={() => setIsOpenLogout(false)}
            />
        </>
    )
}
