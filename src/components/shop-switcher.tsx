import { ChevronsUpDown, Plus, Store, Crown, Loader2 } from 'lucide-react'
import { memo, useMemo, useTransition } from 'react'
import { useShopContext } from '@/features/shop'
import { Badge } from '@/components/ui/badge'
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

export function ShopSwitcher() {
    const { isMobile } = useSidebar()
    const { userShops, currentShop, setCurrentShop, loading } = useShopContext()
    const [isPending, startTransition] = useTransition()

    const sortedShops = useMemo(
        () =>
            [...userShops].sort(
                (a, b) => (b.isOwner ? 1 : 0) - (a.isOwner ? 1 : 0)
            ),
        [userShops]
    )

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
                            Shops
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
                                <div className="flex flex-col flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 justify-between">
                                        <span className="truncate">
                                            {shop.shopName}
                                        </span>
                                        {shop.isOwner && (
                                            <Badge
                                                variant="secondary"
                                                className="h-4 px-1 text-[10px] gap-0.5"
                                            >
                                                <Crown className="size-2.5" />
                                                Owner
                                            </Badge>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground truncate capitalize">
                                        {shop.role}
                                    </span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
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
    )
}
