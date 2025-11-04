import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useMemo, useState, Suspense } from 'react'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import {
    ListDetailRoot,
    ListDetailHeader,
    ListDetailBody,
    ListDetailList,
    ListDetailListHeader,
    ListDetailListContent,
    ListDetailContent
} from '@/components/ui/list-detail-layout'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useShopContext } from '@/features/shop'
import { useItems } from '@/features/items/hooks/use-items'
import { useCategories } from '@/features/items/hooks/use-categories'
import { useUnits } from '@/features/items/hooks/use-units'
import { Skeleton } from '@/components/ui/skeleton'
import type { Item, Category, Unit } from '@/features/items/types'
import { useTypedNavigate } from '@/lib/router-utils'

const TABS = [
    { value: 'products', label: 'PRODUCTS' },
    { value: 'services', label: 'SERVICES' },
    { value: 'category', label: 'CATEGORY' },
    { value: 'units', label: 'UNITS' }
]

export const Route = createFileRoute('/_protected/_dashboard/items')({
    component: ItemsPage
})

function ItemsPage() {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams({ strict: false })
    const { currentShop } = useShopContext()
    const [activeTab, setActiveTab] = useState<
        'products' | 'services' | 'category' | 'units'
    >('products')
    const [searchQuery, setSearchQuery] = useState('')
    const { toCreateItem } = useTypedNavigate()

    const shopId = currentShop?.shopId || ''
    const { items, isLoading } = useItems(
        shopId,
        activeTab === 'products'
            ? 'product'
            : activeTab === 'services'
              ? 'service'
              : undefined
    )
    const { categories } = useCategories(shopId)
    const { units } = useUnits(shopId)

    const isRouteActive = useMemo(
        () =>
            !!id || pathname.includes('/create') || pathname.includes('/edit'),
        [id, pathname]
    )

    const filteredItems = useMemo(() => {
        if (activeTab === 'category') return categories
        if (activeTab === 'units') return units
        return items.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [activeTab, items, categories, units, searchQuery])

    const displayItems =
        activeTab === 'category'
            ? categories
            : activeTab === 'units'
              ? units
              : filteredItems

    const handleTabChange = (value: string) => {
        setActiveTab(value as typeof activeTab)
        setSearchQuery('')
    }

    const handleItemClick = (itemId: string) => {
        navigate({ to: `/items/${activeTab}/${itemId}` })
    }

    return (
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
            <ListDetailRoot>
                <ListDetailHeader isRouteActive={isRouteActive}>
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                        <TabsList
                            variant="line"
                            className="w-full justify-start"
                        >
                            {TABS.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="text-xs sm:text-sm font-semibold"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                </ListDetailHeader>

                <ListDetailBody>
                    <ListDetailList isRouteActive={isRouteActive}>
                        <ListDetailListHeader>
                            <SearchInput
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                                placeholder="Search..."
                            />

                            <Button
                                onClick={toCreateItem}
                                size="sm"
                                className="w-full"
                            >
                                <Plus className="size-4 mr-1" />
                                Add{' '}
                                {activeTab === 'products'
                                    ? 'Product'
                                    : activeTab === 'services'
                                      ? 'Service'
                                      : activeTab === 'category'
                                        ? 'Category'
                                        : 'Unit'}
                            </Button>

                            {(activeTab === 'products' ||
                                activeTab === 'services') && (
                                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                    <span className="flex-1">ITEM</span>
                                    <span className="w-16 text-right">
                                        STOCK
                                    </span>
                                </div>
                            )}
                        </ListDetailListHeader>

                        <ListDetailListContent>
                            {isLoading ? (
                                <div className="p-4 space-y-2">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            ) : displayItems.length === 0 ? (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    No items found
                                </div>
                            ) : (
                                <div className="divide-y">
                                    {displayItems.map(
                                        (item: Item | Category | Unit) => {
                                            const isItem =
                                                'currentStock' in item
                                            const isUnit = 'shortName' in item
                                            const displayName = isUnit
                                                ? (item as Unit).fullName
                                                : (item as Item | Category).name

                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() =>
                                                        handleItemClick(item.id)
                                                    }
                                                    className={cn(
                                                        'w-full flex items-center justify-between p-3 hover:bg-accent transition-colors text-left',
                                                        id === item.id &&
                                                            'bg-accent'
                                                    )}
                                                >
                                                    <span className="text-sm font-medium">
                                                        {displayName}
                                                    </span>
                                                    {(activeTab ===
                                                        'products' ||
                                                        activeTab ===
                                                            'services') &&
                                                        isItem && (
                                                            <span
                                                                className={cn(
                                                                    'text-sm font-semibold',
                                                                    (
                                                                        item as Item
                                                                    )
                                                                        .currentStock <
                                                                        (
                                                                            item as Item
                                                                        )
                                                                            .minStockAlert
                                                                        ? 'text-destructive'
                                                                        : 'text-green-600'
                                                                )}
                                                            >
                                                                {(item as Item)
                                                                    .currentStock ||
                                                                    0}
                                                            </span>
                                                        )}
                                                    {activeTab === 'units' &&
                                                        isUnit && (
                                                            <span className="text-xs text-muted-foreground">
                                                                {
                                                                    (
                                                                        item as Unit
                                                                    ).shortName
                                                                }
                                                            </span>
                                                        )}
                                                </button>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                        </ListDetailListContent>
                    </ListDetailList>

                    <ListDetailContent isRouteActive={isRouteActive}>
                        <Outlet />
                    </ListDetailContent>
                </ListDetailBody>
            </ListDetailRoot>
        </Suspense>
    )
}
