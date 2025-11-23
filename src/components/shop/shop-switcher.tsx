import {
    ChevronsUpDown,
    Plus,
    Store,
    Loader2,
    Settings,
    Crown,
    Shield,
    UserCog,
    Users,
    Eye,
    LayoutGrid
} from 'lucide-react'
import { memo, useMemo, useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useShopContext, getShopAccessHistory } from '@/features/shop'
import { CreateShopModal } from '@/features/shop'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
    DropdownMenu,
    DropdownMenuContent,
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
import { Image } from '@/components/ui/image'
import { cn } from '@/lib/utils'

const ShopLogo = memo(
    ({
        logoUrl,
        shopName,
        size = 'default'
    }: {
        logoUrl?: string
        shopName: string
        size?: 'default' | 'small'
    }) => (
        <div
            className={cn(
                'bg-sidebar-accent text-sidebar-accent-foreground flex items-center justify-center rounded-lg overflow-hidden shrink-0',
                size === 'default'
                    ? 'aspect-square size-8'
                    : 'size-6 rounded-md border'
            )}
        >
            {logoUrl ? (
                <Image
                    src={logoUrl}
                    alt={shopName}
                    className="size-full object-cover"
                    loading="lazy"
                />
            ) : (
                <Store className={size === 'default' ? 'size-4' : 'size-3.5'} />
            )}
        </div>
    )
)
ShopLogo.displayName = 'ShopLogo'

const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
        case 'owner':
            return Crown
        case 'admin':
            return Shield
        case 'manager':
            return UserCog
        case 'staff':
            return Users
        case 'viewer':
            return Eye
        default:
            return Users
    }
}

export function ShopSwitcher() {
    const { isMobile } = useSidebar()
    const { userShops, currentShop, setCurrentShop, loading, refreshShops } =
        useShopContext()
    const [isPending, startTransition] = useTransition()
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [accessHistory, setAccessHistory] = useState<Record<string, number>>(
        {}
    )
    const router = useRouter()

    useEffect(() => {
        getShopAccessHistory().then(setAccessHistory)
    }, [currentShop])

    const sortedShops = useMemo(() => {
        return [...userShops]
            .map((shop) => ({
                ...shop,
                lastAccessedAt: accessHistory[shop.shopId] || 0
            }))
            .sort((a, b) => (b.lastAccessedAt || 0) - (a.lastAccessedAt || 0))
            .slice(0, 5)
    }, [userShops, accessHistory])

    const handleShopSwitch = (shop: typeof currentShop) => {
        startTransition(() => {
            setCurrentShop(shop)
        })
    }

    if (loading || !currentShop) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" disabled>
                        <Skeleton className="size-8 rounded-lg" />
                        <div className="grid flex-1 gap-1">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                disabled={isPending}
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                {isPending ? (
                                    <Loader2 className="size-8 animate-spin" />
                                ) : (
                                    <ShopLogo
                                        logoUrl={currentShop.logoUrl}
                                        shopName={currentShop.shopName}
                                    />
                                )}
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {currentShop.shopName}
                                    </span>
                                    <span className="truncate text-xs text-muted-foreground capitalize">
                                        {currentShop.role}
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            align="start"
                            side={isMobile ? 'bottom' : 'right'}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="text-muted-foreground text-xs">
                                Recent Shops
                            </DropdownMenuLabel>
                            {sortedShops.map((shop) => (
                                <DropdownMenuItem
                                    key={shop.shopId}
                                    onClick={() => handleShopSwitch(shop)}
                                    disabled={
                                        isPending ||
                                        shop.shopId === currentShop.shopId
                                    }
                                    className={cn(
                                        'gap-2 p-2',
                                        shop.shopId === currentShop.shopId &&
                                        'bg-accent'
                                    )}
                                >
                                    <ShopLogo
                                        logoUrl={shop.logoUrl}
                                        shopName={shop.shopName}
                                        size="small"
                                    />
                                    <div className="flex items-center flex-1 min-w-0 gap-2">
                                        <div className="flex flex-col flex-1 min-w-0">
                                            <span className="truncate font-medium">
                                                {shop.shopName}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                {(() => {
                                                    const RoleIcon =
                                                        getRoleIcon(shop.role)
                                                    return (
                                                        <RoleIcon className="size-3 text-muted-foreground" />
                                                    )
                                                })()}
                                                <span className="text-xs text-muted-foreground truncate capitalize">
                                                    {shop.role}
                                                </span>
                                            </div>
                                        </div>
                                        {shop.isOwner && (
                                            <Button
                                                variant="ghost"
                                                size="xs"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setCurrentShop(shop)
                                                    router.push('/settings')
                                                }}
                                            >
                                                <Settings className="size-3.5" />
                                            </Button>
                                        )}
                                    </div>
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="gap-2 p-2"
                                onClick={() => router.push('/shops')}
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                    <LayoutGrid className="size-4" />
                                </div>
                                <div className="text-muted-foreground font-medium">
                                    Manage all shops
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="gap-2 p-2"
                                onClick={() => setCreateModalOpen(true)}
                            >
                                <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                    <Plus className="size-4" />
                                </div>
                                <div className="text-muted-foreground font-medium">
                                    Create shop
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>

            <CreateShopModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSuccess={refreshShops}
            />
        </>
    )
}
