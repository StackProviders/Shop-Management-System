import { useNavigate, useSearch } from '@tanstack/react-router'
import { ItemForm, useCategories, useItemActions } from '@/features/items'
import type { CreateItemData, ItemType } from '@/features/items'
import { useShopContext } from '@/features/shop'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { useState, useCallback, useMemo } from 'react'
import { ItemSettingsSheet } from '@/features/items/components/item-settings-sheet'

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
        async (data: CreateItemData) => {
            await createItem(data)
            navigate({ to: '/items', replace: isIntercepting })
        },
        [createItem, navigate, isIntercepting]
    )

    const handleTypeChange = useCallback((checked: boolean) => {
        const newType = checked ? 'service' : 'product'
        setItemType(newType)
        setFormState((prev) => ({ ...prev, formId: `${newType}-form` }))
    }, [])

    const handleSettingsToggle = useCallback(() => {
        setShowSettings((prev) => !prev)
    }, [])

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
                            <div className="flex items-center justify-between border-b">
                                <h1 className="text-base sm:text-lg font-semibold">
                                    Add Item
                                </h1>
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <Label
                                            htmlFor="type-toggle"
                                            className="text-xs sm:text-sm font-medium"
                                        >
                                            Product
                                        </Label>
                                        <Switch
                                            id="type-toggle"
                                            checked={itemType === 'service'}
                                            onCheckedChange={handleTypeChange}
                                        />
                                        <Label
                                            htmlFor="type-toggle"
                                            className="text-xs sm:text-sm font-medium"
                                        >
                                            Service
                                        </Label>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleSettingsToggle}
                                        className="h-8 w-8 sm:h-10 sm:w-10"
                                    >
                                        <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                </div>
                            </div>
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
