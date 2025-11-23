import { useState, useMemo } from 'react'
import { RefreshCw, UserRound, Store, Plus } from 'lucide-react'
import { EmptyState, LoadingState } from '@/components/common'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import ShopItem from './shop-item'
import { CreateShopModal, EditShopModal } from '@/features/shop'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heading4 } from '@/components/ui/typography'
import { LogoutButton } from '../auth'
import { toast } from 'sonner'
import { useCurrentUser } from '@/features/auth'
import { useShopActions, useShopContext } from '@/features/shop'
import type { UserShopAccess } from '@/features/shop'
import { useRouter } from 'next/navigation'

export default function ShopDashboard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editingShopId, setEditingShopId] = useState<string | null>(null)
    const user = useCurrentUser()
    const { userShops, loading, refreshShops, setCurrentShop } =
        useShopContext()
    const { deleteShop } = useShopActions()
    const router = useRouter()

    const handleEditShop = (shopId: string) => {
        setEditingShopId(shopId)
    }

    const handleDeleteShop = async (shopId: string) => {
        try {
            await deleteShop(shopId)
            await refreshShops()
            toast.success('Shop deleted successfully')
        } catch {
            toast.error('Failed to delete shop')
        }
    }

    const handleOpenShop = (shopId: string) => {
        const shop = userShops.find((s) => s.shopId === shopId)
        if (shop) {
            setCurrentShop(shop)
            router.push('/')
        }
    }

    const { myShops, sharedShops } = useMemo(() => {
        const shopList = Array.isArray(userShops) ? userShops : []
        const filtered = searchQuery
            ? shopList.filter((shop) =>
                  shop.shopName
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
              )
            : shopList

        return {
            myShops: filtered.filter((shop) => shop.isOwner),
            sharedShops: filtered.filter((shop) => !shop.isOwner)
        }
    }, [userShops, searchQuery])

    const renderShopList = (shopList: typeof userShops) => (
        <ScrollArea className="h-[50vh] max-h-[500px]">
            <div className="space-y-3 pr-4">
                {shopList.map((shop: UserShopAccess) => (
                    <ShopItem
                        key={shop.shopId}
                        shop={{
                            id: shop.shopId,
                            name: shop.shopName,
                            status: 'active',
                            isCurrent: false,
                            logo_url: shop.logoUrl,
                            shop_category: shop.shopCategory,
                            description: shop.shopAddress
                        }}
                        onOpen={handleOpenShop}
                        onEdit={handleEditShop}
                        onDelete={handleDeleteShop}
                    />
                ))}
            </div>
        </ScrollArea>
    )

    return (
        <>
            <div className="w-full max-w-4xl mx-auto bg-background rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[90vh] max-h-[90vh]">
                {/* Header */}
                <div className="bg-card border-b px-4 sm:px-6 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                    <Heading4 className="text-card-foreground">
                        Shop List
                    </Heading4>
                    <SearchInput
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        placeholder="Search Shop"
                        wrapperClassName="w-full sm:w-auto"
                    />
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6 pt-2 sm:!pt-4 flex-1 overflow-hidden flex flex-col">
                    <Tabs
                        defaultValue="my_shop"
                        className="text-sm text-muted-foreground"
                    >
                        <div className="flex items-end justify-between border-b">
                            <TabsList
                                variant="underline"
                                className="border-none gap-4 sm:gap-6"
                            >
                                <TabsTrigger value="shared_shop">
                                    <UserRound className="size-4" /> Shared Shop
                                </TabsTrigger>
                                <TabsTrigger value="my_shop">
                                    <Store className="size-4" /> My Shop
                                </TabsTrigger>
                            </TabsList>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mb-0.5"
                                onClick={() => refreshShops()}
                                disabled={loading}
                            >
                                <RefreshCw
                                    className={`size-4 ${loading ? 'animate-spin' : ''}`}
                                />
                            </Button>
                        </div>
                        <TabsContent value="shared_shop" className="mt-4">
                            {loading ? (
                                <LoadingState />
                            ) : sharedShops.length === 0 ? (
                                <EmptyState
                                    title="No shared shops"
                                    description="Shops shared with you will appear here"
                                />
                            ) : (
                                renderShopList(sharedShops)
                            )}
                        </TabsContent>
                        <TabsContent value="my_shop" className="mt-4">
                            {loading ? (
                                <LoadingState />
                            ) : myShops.length === 0 ? (
                                <EmptyState
                                    title="No shops yet"
                                    description="Create your first shop to get started"
                                    action={
                                        <Button
                                            size="sm"
                                            onClick={() =>
                                                setCreateModalOpen(true)
                                            }
                                        >
                                            <Plus className="size-4" />
                                            Create Shop
                                        </Button>
                                    }
                                />
                            ) : (
                                renderShopList(myShops)
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Footer */}
                <div className="bg-muted/30 px-4 sm:px-6 py-3 border-t mt-auto">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                        <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                            Currently logged in with{' '}
                            {user?.email ? 'Email' : 'Phone'}:{' '}
                            <span className="font-semibold text-foreground">
                                {user?.email || user?.phone || 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Button
                                size="sm"
                                onClick={() => setCreateModalOpen(true)}
                                className="flex-1 sm:flex-none"
                            >
                                <Plus className="size-4" />
                                Create Shop
                            </Button>
                            <LogoutButton
                                variant="destructive"
                                size="sm"
                                className="flex-1 sm:flex-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <CreateShopModal
                open={createModalOpen}
                onOpenChange={setCreateModalOpen}
                onSuccess={refreshShops}
            />

            {editingShopId && (
                <EditShopModal
                    shopId={editingShopId}
                    open={!!editingShopId}
                    onOpenChange={(open) => !open && setEditingShopId(null)}
                    onSuccess={refreshShops}
                />
            )}
        </>
    )
}
