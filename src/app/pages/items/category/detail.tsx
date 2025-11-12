import { useParams, useNavigate } from '@tanstack/react-router'
import { useShopContext } from '@/features/shop'
import { useItems, useCategory } from '@/features/items'
import {
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
} from '@/components/ui/list-detail-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useMemo } from 'react'
import { formatCurrency } from '@/lib/utils'

export default function CategoryDetailPage() {
    const { id } = useParams({
        from: '/_protected/_dashboard/items/category/$id'
    })
    const navigate = useNavigate()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { category, isLoading } = useCategory(id)
    const { items: allItems } = useItems(shopId)

    const categoryItems = useMemo(
        () => allItems.filter((item) => item.categories?.includes(id)),
        [allItems, id]
    )

    const totalValue = useMemo(
        () =>
            categoryItems.reduce(
                (sum, item) => sum + item.currentStock * item.purchasePrice,
                0
            ),
        [categoryItems]
    )

    if (isLoading) {
        return (
            <div className="p-6 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        )
    }

    if (!category) {
        return <div className="p-6">Category not found</div>
    }

    return (
        <>
            <ListDetailContentHeader>
                <ListDetailContentHeaderTitle>
                    <h2 className="text-lg font-semibold">
                        {category.name.toUpperCase()}
                    </h2>
                    <Button
                        size="sm"
                        onClick={() =>
                            navigate({ to: `/items/${id}/edit?fromItems=true` })
                        }
                    >
                        EDIT CATEGORY
                    </Button>
                </ListDetailContentHeaderTitle>

                <ListDetailContentHeaderInfo>
                    <ListDetailContentHeaderInfoItem
                        label="TOTAL ITEMS"
                        value={categoryItems.length.toString()}
                    />
                    <ListDetailContentHeaderInfoItem
                        label="TOTAL VALUE"
                        value={formatCurrency(totalValue)}
                    />
                    <ListDetailContentHeaderInfoItem
                        label="STATUS"
                        value="Active"
                    />
                </ListDetailContentHeaderInfo>
            </ListDetailContentHeader>

            <ListDetailContentBody>
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold">ITEMS IN CATEGORY</h3>
                    {categoryItems.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No items in this category
                        </div>
                    ) : (
                        <div className="border rounded-lg divide-y">
                            {categoryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-3 hover:bg-accent cursor-pointer"
                                    onClick={() =>
                                        navigate({
                                            to: `/items/products/${item.id}`
                                        })
                                    }
                                >
                                    <span className="text-sm font-medium">
                                        {item.name}
                                    </span>
                                    <Badge variant="secondary">
                                        Stock: {item.currentStock || 0}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </ListDetailContentBody>
        </>
    )
}
