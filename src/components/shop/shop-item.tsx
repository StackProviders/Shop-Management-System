import { MoreVertical, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge, BadgeDot } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle
} from '@/components/ui/item'

interface ShopItemProps {
    shop: {
        id: string
        name: string
        status: string
        isCurrent: boolean
        description?: string
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
    const getShopIcon = () => {
        // You can customize this based on shop type or category
        return <Store className="size-4" />
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
                    {getShopIcon()}
                </ItemMedia>

                <ItemContent className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
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
                    </div>

                    {shop.description && (
                        <ItemDescription className="text-muted-foreground text-sm">
                            {shop.description}
                        </ItemDescription>
                    )}
                </ItemContent>

                <ItemActions className="flex flex-col sm:flex-row gap-2 sm:gap-1">
                    <Button size="sm" onClick={() => onOpen?.(shop.id)}>
                        Open
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" mode="icon">
                                <MoreVertical className="size-4" />
                                <span className="sr-only">More options</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => onEdit?.(shop.id)}>
                                Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem>Open</DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => onDelete?.(shop.id)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ItemActions>
            </Item>
        </div>
    )
}
