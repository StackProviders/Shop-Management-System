'use client'

import { useState, useMemo, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useShopContext } from '@/features/shop'
import { useItems, useCategories, useItemMutations } from '@/features/items'
import { ListDetailPage } from '@/components/common'
import { DetailActionsMenu } from '@/components/common/actions/detail-actions-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
    Item as ItemComponent,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions
} from '@/components/ui/item'
import { Package } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import type { Item, Category } from '@/features/items/types'
import { categoriesApi } from '@/features/items/api/categories.api'

type TabValue = 'products' | 'services' | 'category'

export default function ItemsPage({ children }: { children?: ReactNode }) {
    const router = useRouter()
    const { currentShop } = useShopContext()
    const [activeTab, setActiveTab] = useState<TabValue>('products')
    const [sortBy, setSortBy] = useState<'name' | 'stock'>('name')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const toggleSort = (field: 'name' | 'stock') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    const shopId = currentShop?.shopId || ''
    const { items } = useItems(
        shopId,
        activeTab === 'products'
            ? 'product'
            : activeTab === 'services'
                ? 'service'
                : undefined
    )
    const { items: allItems } = useItems(shopId)
    const { categories } = useCategories(shopId)
    const { remove: deleteItem } = useItemMutations(shopId)

    const handleDelete = async (id: string) => {
        if (activeTab === 'category') {
            await categoriesApi.delete(id)
        } else {
            await deleteItem(id)
        }
    }

    const categoryItemCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        allItems.forEach((item) => {
            item.categories?.forEach((catId) => {
                counts[catId] = (counts[catId] || 0) + 1
            })
        })
        return counts
    }, [allItems])

    const displayItems: (Item | Category)[] =
        activeTab === 'category' ? categories : items

    const sortedItems = [...displayItems].sort((a, b) => {
        if (sortBy === 'name') {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            return sortOrder === 'asc'
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA)
        }
        if (sortBy === 'stock' && 'currentStock' in a && 'currentStock' in b) {
            return sortOrder === 'asc'
                ? (a as Item).currentStock - (b as Item).currentStock
                : (b as Item).currentStock - (a as Item).currentStock
        }
        return 0
    })

    const listItems = sortedItems as unknown as Array<
        Record<string, unknown> & { id: string }
    >

    return (
        <ListDetailPage
            title=""
            items={listItems}
            searchKeys={['name']}
            renderItem={(item, isSelected) => {
                const typedItem = item as unknown as Item | Category
                const isCategory = activeTab === 'category'
                const isProduct = activeTab === 'products'

                return (
                    <ItemComponent
                        asChild
                        size="sm"
                        className={cn(
                            'w-full cursor-pointer hover:bg-accent border-b last:border-b-0',
                            isSelected && 'bg-accent'
                        )}
                    >
                        <div className="w-full">
                            <ItemContent className="flex-1 min-w-0">
                                <ItemTitle className="min-w-0 w-full">
                                    <span className="truncate min-w-0 flex-1 text-start">
                                        {(typedItem as Item | Category).name}
                                    </span>
                                    {isCategory && (
                                        <Badge
                                            variant="secondary"
                                            size="xs"
                                            className="shrink-0"
                                        >
                                            {categoryItemCounts[item.id] || 0}{' '}
                                            items
                                        </Badge>
                                    )}
                                </ItemTitle>
                                {!isCategory &&
                                    (typedItem as Item).salePrice > 0 && (
                                        <ItemDescription>
                                            {formatCurrency(
                                                (typedItem as Item).salePrice
                                            )}
                                        </ItemDescription>
                                    )}
                            </ItemContent>
                            <ItemActions className="shrink-0 gap-2">
                                {isProduct && (
                                    <span
                                        className={cn(
                                            'font-semibold text-xs sm:text-sm whitespace-nowrap tabular-nums',
                                            (typedItem as Item).currentStock <
                                                (typedItem as Item)
                                                    .minStockAlert
                                                ? 'text-destructive'
                                                : 'text-success'
                                        )}
                                    >
                                        {(typedItem as Item).currentStock || 0}
                                    </span>
                                )}
                                <div onClick={(e) => e.stopPropagation()}>
                                    <DetailActionsMenu
                                        item={typedItem}
                                        itemName={
                                            (typedItem as Item | Category).name
                                        }
                                        compact
                                        onEditClick={() =>
                                            router.push(
                                                `/items/${item.id}/edit?fromItems=true`
                                            )
                                        }
                                        onDeleteClick={() =>
                                            handleDelete(item.id)
                                        }
                                    />
                                </div>
                            </ItemActions>
                        </div>
                    </ItemComponent>
                )
            }}
            onItemClick={(item) => {
                router.push(`/items/${activeTab}/${item.id}`)
            }}
            createPath="/items/create?fromItems=true"
            listHeader={
                activeTab !== 'category' ? (
                    <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-muted-foreground border-b bg-muted/30">
                        <button
                            onClick={() => toggleSort('name')}
                            className="flex-1 text-left hover:text-foreground transition-colors"
                        >
                            Item Name{' '}
                            {sortBy === 'name' &&
                                (sortOrder === 'asc' ? '↑' : '↓')}
                        </button>
                        {activeTab === 'products' && (
                            <button
                                onClick={() => toggleSort('stock')}
                                className="text-right hover:text-foreground transition-colors"
                            >
                                Stock{' '}
                                {sortBy === 'stock' &&
                                    (sortOrder === 'asc' ? '↑' : '↓')}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-muted-foreground border-b bg-muted/30">
                        <div className="flex-1 text-left">Category Name</div>
                        <div className="text-right">Items</div>
                    </div>
                )
            }
            headerActions={
                <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as TabValue)}
                >
                    <TabsList variant="underline">
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="category">Categories</TabsTrigger>
                    </TabsList>
                </Tabs>
            }
            emptyIcon={<Package />}
            emptyTitle="No items found"
            emptyDescription="Create your first item to get started"
        >
            {children}
        </ListDetailPage>
    )
}
