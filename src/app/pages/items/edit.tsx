import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import {
    ItemForm,
    useCategories,
    useItemActions,
    useItem
} from '@/features/items'
import type { CreateItemData, ItemType } from '@/features/items'
import { useShopContext } from '@/features/shop'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { ItemSettingsSheet } from '@/features/items/components/item-settings-sheet'
import { ItemFormHeader } from '@/features/items/components/item-form-header'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditItemPage() {
    const navigate = useNavigate()
    const { id } = useParams({ from: '/_protected/_dashboard/items/$id/edit' })
    const search = useSearch({ from: '/_protected/_dashboard/items/$id/edit' })
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { updateItem } = useItemActions(shopId)
    const { categories } = useCategories(shopId)
    const { item, isLoading } = useItem(id)
    const { isIntercepting } = useInterceptingRoute(
        search.fromItems === true,
        '/items'
    )

    const [itemType, setItemType] = useState<ItemType>('product')
    const [showSettings, setShowSettings] = useState(false)
    const [formState, setFormState] = useState({
        formId: 'product-form',
        isDirty: false,
        isSubmitting: false
    })

    useEffect(() => {
        if (item) {
            setItemType(item.type)
            setFormState((prev) => ({ ...prev, formId: `${item.type}-form` }))
        }
    }, [item])

    const handleUpdateItem = useCallback(
        async (data: CreateItemData) => {
            await updateItem(id, data)
            navigate({ to: '/items', replace: isIntercepting })
        },
        [updateItem, id, navigate, isIntercepting]
    )

    const handleTypeChange = useCallback((checked: boolean) => {
        const newType = checked ? 'service' : 'product'
        setItemType(newType)
        setFormState((prev) => ({
            ...prev,
            formId: `${newType}-form`,
            isDirty: false
        }))
    }, [])

    const handleSettingsToggle = useCallback(
        () => setShowSettings((prev) => !prev),
        []
    )

    if (isLoading) {
        return (
            <div className="p-6 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-40 w-full" />
            </div>
        )
    }

    if (!item) {
        return <div className="p-6">Item not found</div>
    }

    return (
        <>
            <InterceptingRoute
                isIntercepting={isIntercepting}
                fallbackPath="/items"
                fullPageClassName="h-full overflow-y-auto"
                modalProps={{
                    showHeader: true,
                    className: '!max-w-6xl',
                    contentClassName: 'p-0',
                    showCloseButton: false,
                    isDirty: formState.isDirty,
                    header: useMemo(
                        () => (
                            <ItemFormHeader
                                title="Edit Item"
                                itemType={itemType}
                                onTypeChange={handleTypeChange}
                                onSettingsClick={handleSettingsToggle}
                            />
                        ),
                        [itemType, handleTypeChange, handleSettingsToggle]
                    ),
                    formId: formState.formId,
                    submitLabel: 'Update Item',
                    isSubmitting: formState.isSubmitting
                }}
            >
                <ItemForm
                    type={itemType}
                    categories={categories}
                    onSubmit={handleUpdateItem}
                    onFormStateChange={setFormState}
                    isEdit={true}
                    defaultValues={useMemo(
                        () => ({
                            name: item.name,
                            type: item.type,
                            salePrice: item.salePrice,
                            purchasePrice: item.purchasePrice,
                            unit: item.unit,
                            categories: item.categories,
                            description: item.description || '',
                            itemCode: item.itemCode,
                            openingStock: item.openingStock,
                            minStockAlert: item.minStockAlert,
                            mrp: item.mrp,
                            images: item.images,
                            status: item.status || 'active'
                        }),
                        [item]
                    )}
                />
            </InterceptingRoute>

            {currentShop?.shopId && (
                <ItemSettingsSheet
                    open={showSettings}
                    onOpenChange={setShowSettings}
                    shopId={currentShop.shopId}
                />
            )}
        </>
    )
}
