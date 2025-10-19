import { useRef, useState, useMemo, ReactNode } from 'react'
import {
    Search,
    RefreshCw,
    UserRound,
    Store,
    X,
    Inbox,
    Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, InputWrapper } from '@/components/ui/input'
import ShopItem from './shop-item'
import CreateShop from './shop-modal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heading4 } from '@/components/ui/typography'
import { LogoutButton } from '../auth'
import { Shop } from '@/types/shop'
import { ShopFormData } from '@/lib/validations'
import { toast } from 'sonner'
import { Spinner } from '@/components/ui/spinner'
import { useCurrentUser } from '@/features/auth'
import {
    useUserShops,
    useShopActions,
    shopApi,
    useCurrentShop
} from '@/features/shop'
import type { UserShopAccess } from '@/features/shop'
import { useNavigate } from 'react-router'

const EmptyState = ({
    title,
    description,
    action
}: {
    title: string
    description: string
    action?: ReactNode
}) => (
    <div className="flex flex-col items-center gap-3 p-6 text-center">
        <Inbox className="size-12 text-muted-foreground" />
        <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-muted-foreground text-xs">{description}</p>
        </div>
        {action}
    </div>
)

const LoadingState = () => (
    <div className="flex justify-center items-center p-12">
        <Spinner className="size-6" />
    </div>
)

export default function ShopDashboard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingShop, setEditingShop] = useState<Shop | undefined>()
    const inputRef = useRef<HTMLInputElement>(null)
    const user = useCurrentUser()
    const { userShops, loading, refreshShops } = useUserShops(user?.uid)
    const { createShop, updateShop, deleteShop } = useShopActions()
    const { setCurrentShop } = useCurrentShop(userShops)
    const navigate = useNavigate()

    const handleClearInput = () => {
        setSearchQuery('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleEditShop = async (shopId: string) => {
        try {
            const shopData = await shopApi.getShop(shopId)
            if (shopData) {
                setEditingShop(shopData)
                setEditModalOpen(true)
            }
        } catch {
            toast.error('Failed to load shop details')
        }
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
            navigate('/')
        }
    }

    const handleCreateShop = async (data: ShopFormData) => {
        if (!user?.uid) return
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { status, ...shopData } = data
        await createShop(user.uid, shopData)
        await refreshShops()
    }

    const handleUpdateShop = async (shopId: string, data: ShopFormData) => {
        await updateShop(shopId, data)
        await refreshShops()
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
        <div className="space-y-3">
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
    )

    return (
        <>
            <div className="w-full bg-background rounded-lg shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-card border-b px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <Heading4 className="text-card-foreground">
                        Shop List
                    </Heading4>
                    <InputWrapper className="relative w-full sm:w-auto">
                        <Search className="size-4" />
                        <Input
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder="Search Shop"
                            variant="lg"
                        />
                        <Button
                            onClick={handleClearInput}
                            variant="dim"
                            className="absolute right-0"
                            disabled={searchQuery === ''}
                        >
                            {searchQuery !== '' && <X size={16} />}
                        </Button>
                    </InputWrapper>
                </div>

                {/* Main Content */}
                <div className="p-4 sm:p-6 pt-2 sm:!pt-4 min-h-[400px]">
                    <Tabs
                        defaultValue="my_shop"
                        className="text-sm text-muted-foreground"
                    >
                        <div className="flex items-end justify-between border-b">
                            <TabsList
                                variant="line"
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
                                mode="icon"
                                className="mb-0.5"
                                onClick={() => refreshShops()}
                                disabled={loading}
                            >
                                <RefreshCw
                                    className={`size-4 ${loading ? 'animate-spin' : ''}`}
                                />
                            </Button>
                        </div>
                        <TabsContent value="shared_shop">
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
                        <TabsContent value="my_shop">
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
                <div className="bg-muted/30 px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-muted-foreground">
                        Currently logged in with{' '}
                        {user?.email ? 'Email' : 'Phone'}:{' '}
                        <span className="font-semibold text-foreground">
                            {user?.email || user?.phone || 'N/A'}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <CreateShop
                            mode="create"
                            trigger={<Button>Create Shop</Button>}
                            open={createModalOpen}
                            onOpenChange={setCreateModalOpen}
                            onCreate={handleCreateShop}
                        />
                        <LogoutButton variant="destructive" />
                    </div>
                </div>
            </div>

            {editModalOpen && editingShop && (
                <CreateShop
                    mode="edit"
                    open={editModalOpen}
                    onOpenChange={setEditModalOpen}
                    initialData={editingShop}
                    onUpdate={handleUpdateShop}
                />
            )}
        </>
    )
}
