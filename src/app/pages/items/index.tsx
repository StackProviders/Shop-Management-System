import { useState, ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useShopContext } from '@/features/shop'
import { useItems, useCategories, useUnits } from '@/features/items'
import { ListDetailPage } from '@/components/common'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Item, Category, Unit } from '@/features/items/types'

type TabValue = 'products' | 'services' | 'category' | 'units'

export default function ItemsPage({ children }: { children?: ReactNode }) {
    const navigate = useNavigate()
    const { currentShop } = useShopContext()
    const [activeTab, setActiveTab] = useState<TabValue>('products')

    const shopId = currentShop?.shopId || ''
    const { items } = useItems(
        shopId,
        activeTab === 'products'
            ? 'product'
            : activeTab === 'services'
              ? 'service'
              : undefined
    )
    const { categories } = useCategories(shopId)
    const { units } = useUnits(shopId)

    const displayItems: (Item | Category | Unit)[] =
        activeTab === 'category'
            ? categories
            : activeTab === 'units'
              ? units
              : items

    // Cast to satisfy generic constraint (double cast for type safety)
    const listItems = displayItems as unknown as Array<
        Record<string, unknown> & { id: string }
    >

    return (
        <ListDetailPage
            title="Items"
            icon={<Package className="size-5 text-primary" />}
            items={listItems}
            searchKeys={['name']}
            renderItem={(item, isSelected) => {
                const typedItem = item as unknown as Item | Category | Unit
                const isItem = 'currentStock' in typedItem
                const isUnit = 'shortName' in typedItem
                const displayName = isUnit
                    ? (typedItem as Unit).fullName
                    : (typedItem as Item | Category).name

                return (
                    <div
                        className={cn(
                            'p-3 hover:bg-accent cursor-pointer transition-colors',
                            isSelected && 'bg-accent'
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{displayName}</span>
                            {(activeTab === 'products' ||
                                activeTab === 'services') &&
                                isItem && (
                                    <span
                                        className={cn(
                                            'text-sm font-semibold',
                                            (typedItem as Item).currentStock <
                                                (typedItem as Item)
                                                    .minStockAlert
                                                ? 'text-destructive'
                                                : 'text-green-600'
                                        )}
                                    >
                                        {(typedItem as Item).currentStock || 0}
                                    </span>
                                )}
                            {activeTab === 'units' && isUnit && (
                                <span className="text-xs text-muted-foreground">
                                    {(typedItem as Unit).shortName}
                                </span>
                            )}
                        </div>
                    </div>
                )
            }}
            onItemClick={(item) =>
                navigate({ to: `/items/${activeTab}/${item.id}` })
            }
            createPath="/items/create"
            headerActions={
                <Tabs
                    value={activeTab}
                    onValueChange={(v) => setActiveTab(v as TabValue)}
                >
                    <TabsList variant="line">
                        <TabsTrigger value="products">Products</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="category">Categories</TabsTrigger>
                        <TabsTrigger value="units">Units</TabsTrigger>
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
