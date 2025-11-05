import { useNavigate, useSearch } from '@tanstack/react-router'
import { ItemForm, useCategories, useItemActions } from '@/features/items'
import type { ItemType } from '@/features/items'
import type { ItemFormData } from '@/features/items/validations/item.validation'
import { useShopContext } from '@/features/shop'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { useState, useCallback, useMemo } from 'react'
import { ItemSettingsSheet } from '@/features/items/components/item-settings-sheet'
import { ItemFormHeader } from '@/features/items/components/item-form-header'

export default function CreateItemPage() {
    const navigate = useNavigate()
    const search = useSearch({ from: '/_protected/_dashboard/items/create' })
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { createItem } = useItemActions(shopId)
    const { categories } = useCategories(shopId)
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

    const handleAddItem = useCallback(
        async (data: ItemFormData) => {
            const { status, ...restData } = data
            await createItem({
                ...restData,
                itemCode: data.itemCode || '',
                categories: data.categories || [],
                unit: data.unit || '',
                images: data.images || [],
                stockManagement: data.type === 'product',
                currentStock: data.openingStock || 0,
                openingStock: data.openingStock || 0,
                minStockAlert: data.minStockAlert || 0,
                status: status || 'active'
            })
            navigate({ to: '/items', replace: isIntercepting })
        },
        [createItem, navigate, isIntercepting]
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
                                title="Add Item"
                                itemType={itemType}
                                onTypeChange={handleTypeChange}
                                onSettingsClick={handleSettingsToggle}
                            />
                        ),
                        [itemType, handleTypeChange, handleSettingsToggle]
                    ),
                    formId: formState.formId,
                    submitLabel: 'Add Item',
                    isSubmitting: formState.isSubmitting
                }}
            >
                <ItemForm
                    type={itemType}
                    categories={categories}
                    onSubmit={handleAddItem}
                    onFormStateChange={setFormState}
                    isEdit={false}
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
