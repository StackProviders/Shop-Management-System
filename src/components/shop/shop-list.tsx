import ShopItem from './shop-item'

interface Shop {
    id: string
    name: string
    status: string
    syncStatus: 'on' | 'off'
    isCurrent: boolean
}

interface ShopListProps {
    shops: Shop[]
    onOpen?: (shopId: string) => void
    onEdit?: (shopId: string) => void
    onDelete?: (shopId: string) => void
}

export default function ShopList({
    shops,
    onOpen,
    onEdit,
    onDelete
}: ShopListProps) {
    if (shops.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl opacity-50">🏪</div>
                    <p className="text-sm sm:text-base">No shops available</p>
                    <p className="text-xs text-muted-foreground/70">
                        Create your first shop to get started
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {shops.map((shop) => (
                <ShopItem
                    key={shop.id}
                    shop={shop}
                    onOpen={onOpen}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
