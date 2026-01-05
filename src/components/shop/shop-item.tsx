import { useState } from 'react'
import { MoreVertical, Store } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Badge, BadgeDot } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ConfirmationDialog } from '@/components/common'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle
} from '@/components/ui/item'
import { getPlatform } from '@/utils/platform-detection'
import { Image } from '../ui/image'

interface ShopItemProps {
    shop: {
        id: string
        name: string
        status: string
        isCurrent: boolean
        description?: string
        logo_url?: string
        shop_category?: string
    }
    onOpen?: (shopId: string) => void
    onEdit?: (shopId: string) => void
    onDelete?: (shopId: string) => void
}

export default function ShopItem({
    shop,
    onOpen,
    onEdit,
    onDelete
}: ShopItemProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const { isMobile } = getPlatform()

    const handleDelete = () => {
        onDelete?.(shop.id)
        setDeleteDialogOpen(false)
    }

    return (
        <div className="w-full">
            <Item
                variant="outline"
                className="transition-all duration-200 hover:bg-accent/50"
                size="sm"
            >
                <ItemMedia
                    variant="icon"
                    className="bg-primary/10 text-primary"
                >
                    {shop.logo_url ? (
                        <Image src={shop.logo_url} alt={shop.name} />
                    ) : (
                        <Store className="size-4" />
                    )}
                </ItemMedia>

                <ItemContent className="flex-1 min-w-0">
                    <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2 min-w-0">
                            <ItemTitle className="text-foreground font-semibold truncate">
                                {shop.name}
                            </ItemTitle>
                            {shop.isCurrent && (
                                <Badge size="sm" variant="warning">
                                    <BadgeDot />{' '}
                                    <span className="sr-only sm:not-sr-only">
                                        Current Shop
                                    </span>
                                </Badge>
                            )}
                        </div>

                        <ItemDescription>
                            <span className="text-xs text-muted-foreground truncate">
                                {shop.shop_category || (
                                    <span className="italic">No category</span>
                                )}
                            </span>
                        </ItemDescription>
                    </div>
                </ItemContent>

                <ItemActions className="flex items-center gap-2">
                    <Button
                        size={isMobile ? 'xs' : 'sm'}
                        onClick={() => onOpen?.(shop.id)}
                    >
                        Open
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={buttonVariants({
                                variant: 'outline',
                                size: isMobile ? 'xs' : 'sm'
                            })}
                        >
                            <MoreVertical className="size-4" />
                            <span className="sr-only">More options</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => onEdit?.(shop.id)}>
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onOpen?.(shop.id)}>
                                Open
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ItemActions>
            </Item>

            <ConfirmationDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDelete}
                title="Delete Shop"
                description={`Are you sure you want to delete "${shop.name}"? This action cannot be undone.`}
                confirmText="Delete"
                variant="destructive"
            />
        </div>
    )
}
