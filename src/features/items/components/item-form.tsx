import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Settings, X } from 'lucide-react'
import {
    FormInput,
    FormTextarea,
    FormCombobox
} from '@/components/ui/form-fields'
import { Input } from '@/components/ui/input'
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { itemSchema, type ItemFormData } from '../validations/item.validation'
import type { ItemType, Category } from '../types'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CategoryForm } from './category-form'
import { BrandForm } from './brand-form'
import { useShopContext } from '@/features/shop'
import { UNITS } from '@/config/units'

import { ItemSettingsSheet } from './item-settings-sheet'
import { useItemSettings } from '../hooks/use-item-settings'
import { useBrands } from '../hooks/use-brands'
import { Skeleton } from '@/components/ui/skeleton'
import { useDraftItem } from '../hooks/use-draft-item'
import { WarrantyInput } from './warranty-input'
import { ItemImageUpload } from './item-image-upload'

interface ItemFormProps {
    type?: ItemType
    categories: Category[]
    onSubmit: (data: ItemFormData) => Promise<void>
    onCancel: () => void
}

export function ItemForm({
    type: initialType = 'product',
    categories,
    onSubmit,
    onCancel
}: ItemFormProps) {
    const [showWholesalePrice, setShowWholesalePrice] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [showBrandModal, setShowBrandModal] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || 'default'

    const { settings, isLoading: settingsLoading } = useItemSettings(shopId)
    const { brands } = useBrands(shopId)
    const { clearDraft } = useDraftItem()

    const form = useForm({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            name: '',
            type: initialType as 'product' | 'service',
            salePrice: 0,
            purchasePrice: 0,
            unit: '',
            categories: [],
            description: '',
            itemCode: '',
            openingStock: 0,
            minStockAlert: 0,
            status: 'draft'
        }
    })

    const handleFormSubmit = async (data: ItemFormData) => {
        await onSubmit({ ...data, images, status: 'active' })
        clearDraft()
    }

    const itemType = form.watch('type')

    const generateItemCode = () => {
        const shopName = currentShop?.shopName || ''
        const words = shopName.trim().split(/\s+/)
        const prefix =
            words.length === 1
                ? shopName.charAt(0).toUpperCase()
                : words.map((w) => w.charAt(0).toUpperCase()).join('')
        const uniqueNum = Date.now().toString().slice(-10)
        const code = `${prefix}-${uniqueNum}`
        form.setValue('itemCode', code)
    }

    return (
        <FormProvider {...form}>
            <Card className="h-full flex flex-col">
                <CardHeader className="flex items-center justify-between border-b">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg font-semibold">Add Item</h1>
                        <div className="flex items-center gap-2">
                            <Label
                                htmlFor="type-toggle"
                                className="text-sm font-medium"
                            >
                                Product
                            </Label>
                            <Switch
                                id="type-toggle"
                                checked={form.watch('type') === 'service'}
                                onCheckedChange={(checked) =>
                                    form.setValue(
                                        'type',
                                        checked ? 'service' : 'product'
                                    )
                                }
                            />
                            <Label
                                htmlFor="type-toggle"
                                className="text-sm font-medium"
                            >
                                Service
                            </Label>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowSettings(true)}
                        >
                            <Settings className="size-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onCancel}>
                            <X className="size-5" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto">
                    {settingsLoading ? (
                        <div className="space-y-6">
                            <Skeleton className="h-10 w-full" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <Skeleton className="h-20 w-full" />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Main Grid Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_550px] gap-6">
                                {/* Left Column - Form Fields */}
                                <div className="space-y-4">
                                    {/* Row 2: Unit & Item Code */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Row 1: Item Name */}
                                        <FormInput
                                            name="name"
                                            label="Item Name"
                                            placeholder="Enter name"
                                            required
                                        />
                                        {settings.category && (
                                            <FormCombobox
                                                name="categories"
                                                label="Category"
                                                placeholder="Select category"
                                                searchPlaceholder="Search categories..."
                                                options={categories.map(
                                                    (cat) => ({
                                                        value: cat.id,
                                                        label: cat.name
                                                    })
                                                )}
                                                multiple
                                                onAddNew={() =>
                                                    setShowCategoryModal(true)
                                                }
                                                addNewLabel="Add New Category"
                                            />
                                        )}
                                    </div>

                                    {/* Row 3: Unit & Item Code */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormCombobox
                                            name="unit"
                                            label="Unit"
                                            placeholder="Select unit"
                                            searchPlaceholder="Search units..."
                                            options={UNITS.map((unit) => ({
                                                value: unit.id,
                                                label: `${unit.fullName} (${unit.shortName})`
                                            }))}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="itemCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Item Code
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder="Item Code"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={
                                                                generateItemCode
                                                            }
                                                            className="h-full rounded-none w-full"
                                                        >
                                                            Assign Code
                                                        </Button>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    {/* Description */}
                                    {settings.description && (
                                        <FormTextarea
                                            name="description"
                                            label="Description"
                                            placeholder="Enter description"
                                            rows={3}
                                        />
                                    )}

                                    {/* Custom Fields */}
                                    {settings.customFields && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                            {settings.customFieldSettings
                                                .colour && (
                                                <FormInput
                                                    name="colour"
                                                    label="Colour"
                                                    placeholder="Colour"
                                                />
                                            )}
                                            {settings.customFieldSettings
                                                .material && (
                                                <FormInput
                                                    name="material"
                                                    label="Material"
                                                    placeholder="Material"
                                                />
                                            )}
                                            {settings.customFieldSettings
                                                .mfgDate && (
                                                <FormInput
                                                    name="mfgDate"
                                                    label="Mfg. Date"
                                                    placeholder="Mfg. Date"
                                                />
                                            )}
                                            {settings.customFieldSettings
                                                .expDate && (
                                                <FormInput
                                                    name="expDate"
                                                    label="Exp. Date"
                                                    placeholder="Exp. Date"
                                                />
                                            )}
                                            {settings.customFieldSettings
                                                .size && (
                                                <FormInput
                                                    name="size"
                                                    label="Size"
                                                    placeholder="Size"
                                                />
                                            )}
                                            {settings.customFieldSettings
                                                .brand && (
                                                <FormCombobox
                                                    name="brand"
                                                    label="Brand"
                                                    placeholder="Select brand"
                                                    searchPlaceholder="Search brands..."
                                                    options={brands.map(
                                                        (brand) => ({
                                                            value: brand.id,
                                                            label: brand.name
                                                        })
                                                    )}
                                                    onAddNew={() =>
                                                        setShowBrandModal(true)
                                                    }
                                                    addNewLabel="Add New Brand"
                                                />
                                            )}
                                            {settings.customFieldSettings
                                                .warranty && (
                                                <WarrantyInput
                                                    availablePeriods={
                                                        settings.warrantyPeriods
                                                    }
                                                    customPeriods={
                                                        settings.customWarrantyPeriods
                                                    }
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Right Column - Image Upload */}
                                <div className="flex flex-col gap-1.5 items-center">
                                    <Label className="text-sm font-medium">
                                        Images
                                    </Label>
                                    <ItemImageUpload
                                        images={images}
                                        onChange={setImages}
                                    />
                                </div>
                            </div>

                            {/* Tabs Section */}
                            <Tabs defaultValue="pricing" className="w-full">
                                <TabsList variant="line">
                                    <TabsTrigger value="pricing">
                                        Pricing
                                    </TabsTrigger>
                                    {itemType === 'product' && (
                                        <TabsTrigger value="stock">
                                            Stock
                                        </TabsTrigger>
                                    )}
                                </TabsList>

                                <TabsContent
                                    value="pricing"
                                    className="space-y-4 mt-4"
                                >
                                    <div className="max-w-xs">
                                        <FormInput
                                            name="salePrice"
                                            label="Sale Price"
                                            type="number"
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>

                                    {(showWholesalePrice ||
                                        settings.wholesalePrice) && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                            <FormInput
                                                name="wholesalePrice"
                                                label="Wholesale Price"
                                                type="number"
                                                placeholder="0.00"
                                            />
                                            <FormInput
                                                name="minWholesaleQty"
                                                label="Minimum Wholesale Qty"
                                                type="number"
                                                placeholder="0"
                                            />
                                        </div>
                                    )}

                                    {!showWholesalePrice &&
                                        !settings.wholesalePrice && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setShowWholesalePrice(true)
                                                }
                                                className="px-0 text-primary h-auto"
                                            >
                                                + Add Wholesale Price
                                            </Button>
                                        )}

                                    {itemType === 'product' && (
                                        <div className="max-w-xs">
                                            <FormInput
                                                name="purchasePrice"
                                                label="Purchase Price"
                                                type="number"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                    )}
                                </TabsContent>

                                {itemType === 'product' && (
                                    <TabsContent
                                        value="stock"
                                        className="space-y-4 mt-4"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                                            <FormInput
                                                name="openingStock"
                                                label="Opening Stock"
                                                type="number"
                                                placeholder="0"
                                            />

                                            <FormInput
                                                name="minStockAlert"
                                                label="Min Stock Alert"
                                                type="number"
                                                placeholder="0"
                                            />
                                        </div>
                                    </TabsContent>
                                )}
                            </Tabs>
                        </div>
                    )}
                </CardContent>
                {/* Footer Actions */}
                <CardFooter className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="w-full sm:w-auto"
                    >
                        Delete
                    </Button>
                    <Button
                        type="button"
                        onClick={form.handleSubmit(handleFormSubmit)}
                        disabled={form.formState.isSubmitting}
                        className="w-full sm:w-auto min-w-[120px]"
                    >
                        {form.formState.isSubmitting ? 'Updating...' : 'Update'}
                    </Button>
                </CardFooter>
            </Card>

            <CategoryForm
                open={showCategoryModal}
                onOpenChange={setShowCategoryModal}
            />

            <BrandForm open={showBrandModal} onOpenChange={setShowBrandModal} />

            {currentShop?.shopId && (
                <ItemSettingsSheet
                    open={showSettings}
                    onOpenChange={setShowSettings}
                    shopId={currentShop.shopId}
                />
            )}
        </FormProvider>
    )
}
