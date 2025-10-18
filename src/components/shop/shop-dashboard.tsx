import { useRef, useState } from 'react'
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

export default function ShopDashboard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [createModalOpen, setCreateModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingShop, setEditingShop] = useState<
        { id: string; name: string } | undefined
    >()
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClearInput = () => {
        setSearchQuery('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    const handleEditShop = (shopId: string) => {
        const shop = shops.find((s) => s.id === shopId)
        if (shop) {
            setEditingShop({ id: shop.id, name: shop.name })
            setEditModalOpen(true)
        }
    }

    // Mock data for shops
    const shops = [
        {
            id: '1',
            name: 'Shakib Electronics',
            status: 'current',
            syncStatus: 'off' as const,
            isCurrent: true,
            description:
                'Electronics and gadgets store with latest technology products'
        },
        {
            id: '2',
            name: 'Tech Solutions Ltd',
            status: 'active',
            syncStatus: 'on' as const,
            isCurrent: false,
            description: 'Professional IT services and software solutions'
        },
        {
            id: '3',
            name: 'Digital products and online services marketplace',
            status: 'active',
            syncStatus: 'on' as const,
            isCurrent: false,
            description: 'Digital products and online services marketplace'
        }
    ]

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
                <div className="p-4 sm:p-6 pt-2 sm:!pt-4">
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
                            >
                                <RefreshCw className="size-4" />
                            </Button>
                        </div>
                        <TabsContent value="shared_shop">
                            <div className="flex flex-col items-center gap-3 p-6 text-center">
                                <Inbox className="size-12 text-muted-foreground" />
                                <div>
                                    <p className="font-medium text-sm">
                                        No items yet
                                    </p>
                                    <p className="text-muted-foreground text-xs">
                                        Get started by creating your first item
                                    </p>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => setCreateModalOpen(true)}
                                >
                                    <Plus className="size-4" />
                                    Create Shop
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="my_shop">
                            {shops.length === 0 ? (
                                <div className="flex flex-col items-center gap-3 p-6 text-center">
                                    <Inbox className="size-12 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-sm">
                                            No shops yet
                                        </p>
                                        <p className="text-muted-foreground text-xs">
                                            Create your first shop to get
                                            started
                                        </p>
                                    </div>
                                    <Button
                                        size="sm"
                                        onClick={() => setCreateModalOpen(true)}
                                    >
                                        <Plus className="size-4" />
                                        Create Shop
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {shops.map((shop) => (
                                        <ShopItem
                                            key={shop.id}
                                            shop={shop}
                                            onOpen={(shopId) =>
                                                console.log(
                                                    'Opening shop:',
                                                    shopId
                                                )
                                            }
                                            onEdit={handleEditShop}
                                            onDelete={(shopId) =>
                                                console.log(
                                                    'Deleting shop:',
                                                    shopId
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Footer */}
                <div className="bg-muted/30 px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs sm:text-sm text-muted-foreground">
                        Currently logged in with Phone:{' '}
                        <span className="font-semibold text-foreground">
                            1770322532
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary/10 text-sm"
                        >
                            Restore backup
                        </Button>
                        <CreateShop
                            mode="create"
                            trigger={<Button>Create Shop</Button>}
                            open={createModalOpen}
                            onOpenChange={setCreateModalOpen}
                            onSuccess={() => {
                                setCreateModalOpen(false)
                                console.log('Shop created successfully')
                            }}
                        />
                        <LogoutButton variant="destructive" />
                    </div>
                </div>
            </div>

            {/* Edit Shop Modal */}
            {editModalOpen && (
                <CreateShop
                    mode="edit"
                    open={editModalOpen}
                    onOpenChange={setEditModalOpen}
                    initialData={editingShop}
                    onSuccess={() => {
                        setEditModalOpen(false)
                        setEditingShop(undefined)
                        console.log('Shop updated successfully')
                    }}
                />
            )}
        </>
    )
}
