import { useRouter, useParams, useSearchParams } from 'next/navigation'
import {
    ItemForm,
    useCategories,
    useItemMutations,
    useItem
} from '@/features/items'
import type {
    CreateItemData,
    ItemType,
    Item,
    CustomField
} from '@/features/items'
import { useShopContext } from '@/features/shop'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { useState, useCallback, useMemo, useEffect } from 'react'
import { ItemSettingsSheet } from '@/features/items/components/item-settings-sheet'
import { ItemFormHeader } from '@/features/items/components/item-form-header'
import { Skeleton } from '@/components/ui/skeleton'
import { useSerialNumberMutations } from '@/features/items/hooks/use-serial-number-mutations'

interface ExtendedItem extends Item {
    wholesalePrice?: number
    minWholesaleQty?: number
    brand?: string
    warranty?: { label: string; days: number }
    customFields?: CustomField[]
    [key: string]: unknown
}

export default function EditItemPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const searchParams = useSearchParams()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { update: updateItem } = useItemMutations(shopId)
    const { categories } = useCategories(shopId)
    const { item, isLoading } = useItem(id)
    const { isIntercepting } = useInterceptingRoute(
        searchParams.get('fromItems') === 'true',
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

    const { update: updateSerialNumbers } = useSerialNumberMutations(shopId, id)

    const handleUpdateItem = useCallback(
        async (data: CreateItemData & { serialNumbers?: string[] }) => {
            const { serialNumbers, ...itemData } = data
            await updateItem(id, {
                ...itemData,
                currentStock: data.openingStock || 0
            })

            if (serialNumbers) {
                await updateSerialNumbers(serialNumbers)
            }

            if (isIntercepting) {
                router.back()
            } else {
                router.push('/items')
            }
        },
        [updateItem, id, router, isIntercepting, updateSerialNumbers]
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
                    defaultValues={useMemo(() => {
                        const extendedItem = item as ExtendedItem
                        const baseValues = {
                            id: item.id,
                            shopId: item.shopId,
                            name: item.name,
                            type: item.type,
                            salePrice: item.salePrice,
                            purchasePrice: item.purchasePrice,
                            wholesalePrice: extendedItem.wholesalePrice,
                            minWholesaleQty: extendedItem.minWholesaleQty,
                            unit: item.unit,
                            categories: item.categories,
                            description: item.description || '',
                            itemCode: item.itemCode,
                            openingStock: item.openingStock,
                            minStockAlert: item.minStockAlert,
                            mrp: item.mrp,
                            brand: extendedItem.brand || '',
                            warranty: extendedItem.warranty,
                            images: item.images,
                            status: item.status || 'active'
                        }

                        // Add custom fields stored as direct properties
                        const knownFields = new Set([
                            'id',
                            'shopId',
                            'name',
                            'itemCode',
                            'type',
                            'salePrice',
                            'purchasePrice',
                            'mrp',
                            'categories',
                            'unit',
                            'images',
                            'stockManagement',
                            'currentStock',
                            'openingStock',
                            'minStockAlert',
                            'barcode',
                            'description',
                            'taxRate',
                            'customFields',
                            'status',
                            'createdAt',
                            'updatedAt',
                            'wholesalePrice',
                            'minWholesaleQty',
                            'brand',
                            'warranty'
                        ])

                        const customFields: Record<string, unknown> = {}
                        Object.keys(extendedItem).forEach((key) => {
                            if (
                                !knownFields.has(key) &&
                                extendedItem[key] !== undefined
                            ) {
                                customFields[key] = extendedItem[key]
                            }
                        })

                        return { ...baseValues, ...customFields }
                    }, [item])}
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
