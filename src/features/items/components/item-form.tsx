import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FormInput, FormTextarea, FormCombobox } from '@/components/common'
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
import { CategoryForm } from './category-form'
import { BrandForm } from './brand-form'
import { useShopContext } from '@/features/shop'
import { UNITS } from '@/config/units'
import { useItemSettings } from '../hooks/use-item-settings'
import { useBrands } from '../hooks/use-brands'
import { Skeleton } from '@/components/ui/skeleton'

import { WarrantyInput } from './warranty-input'
import { ItemImageUpload } from './item-image-upload'

interface ItemFormProps {
    type?: ItemType
    categories: Category[]
    onSubmit: (data: ItemFormData) => Promise<void>
    onFormStateChange?: (state: {
        formId: string
        isDirty: boolean
        isSubmitting: boolean
    }) => void
    isEdit?: boolean
    defaultValues?: ItemFormData
}

export function ItemForm({
    type: initialType = 'product',
    categories,
    onSubmit,
    onFormStateChange,
    isEdit = false,
    defaultValues
}: ItemFormProps) {
    const [showWholesalePrice, setShowWholesalePrice] = useState(false)
    const [images, setImages] = useState<string[]>(defaultValues?.images || [])
    const [initialImages] = useState<string[]>(defaultValues?.images || [])
    const [showCategoryModal, setShowCategoryModal] = useState(false)
    const [showBrandModal, setShowBrandModal] = useState(false)
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || 'default'

    const { settings, isLoading: settingsLoading } = useItemSettings(shopId)
    const { brands } = useBrands(shopId)

    const form = useForm<ItemFormData>({
        resolver: zodResolver(itemSchema),
        mode: 'onChange',
        defaultValues: defaultValues || {
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

    useEffect(() => {
        if (isEdit && defaultValues) {
            form.reset(defaultValues, { keepDefaultValues: false })
        }
    }, [])

    const formId = useMemo(() => `${initialType}-form`, [initialType])
    const imagesChanged =
        JSON.stringify(images) !== JSON.stringify(initialImages)
    const isDirty = form.formState.isDirty || imagesChanged
    const isSubmitting = form.formState.isSubmitting
    const itemType = form.watch('type')

    const categoryOptions = useMemo(
        () => categories.map((cat) => ({ value: cat.id, label: cat.name })),
        [categories]
    )
    const unitOptions = useMemo(
        () =>
            UNITS.map((unit) => ({
                value: unit.id,
                label: `${unit.fullName} (${unit.shortName})`
            })),
        []
    )
    const brandOptions = useMemo(
        () => brands.map((brand) => ({ value: brand.id, label: brand.name })),
        [brands]
    )

    const handleCategoryModal = useCallback(
        () => setShowCategoryModal(true),
        []
    )
    const handleBrandModal = useCallback(() => setShowBrandModal(true), [])
    const handleWholesalePrice = useCallback(
        () => setShowWholesalePrice(true),
        []
    )

    useEffect(() => {
        if (!isEdit) {
            form.setValue('type', initialType as 'product' | 'service', {
                shouldDirty: false
            })
        }
    }, [initialType, form, isEdit])

    useEffect(() => {
        onFormStateChange?.({ formId, isDirty, isSubmitting })
    }, [formId, isDirty, isSubmitting, onFormStateChange])

    const handleFormSubmit = useCallback(
        async (data: ItemFormData) => {
            await onSubmit({ ...data, images, status: 'active' })
        },
        [onSubmit, images]
    )

    const cleanupUnusedImages = useCallback(async () => {
        const { deleteUnusedImages } = await import('@/lib/storage')
        const removedImages = initialImages.filter(
            (img) => !images.includes(img)
        )
        if (removedImages.length > 0) {
            await deleteUnusedImages(removedImages, [])
        }
    }, [images, initialImages])

    useEffect(() => {
        return () => {
            if (!isEdit && imagesChanged) {
                cleanupUnusedImages()
            }
        }
    }, [cleanupUnusedImages, imagesChanged, isEdit])

    const generateItemCode = useCallback(() => {
        const shopName = currentShop?.shopName || ''
        const words = shopName.trim().split(/\s+/)
        const prefix =
            words.length === 1
                ? shopName.charAt(0).toUpperCase()
                : words.map((w) => w.charAt(0).toUpperCase()).join('')
        const code = `${prefix}-${Date.now().toString().slice(-10)}`
        form.setValue('itemCode', code)
    }, [currentShop?.shopName, form])

    return (
        <FormProvider {...form}>
            <form
                id={formId}
                onSubmit={form.handleSubmit(handleFormSubmit)}
                className="h-full flex flex-col"
            >
                <div className="flex-1 overflow-y-auto px-4 pb-4 md:pb-0">
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
                                            label={
                                                itemType === 'service'
                                                    ? 'Service Name'
                                                    : 'Item Name'
                                            }
                                            placeholder="Enter name"
                                            required
                                        />
                                        {settings.category && (
                                            <FormCombobox
                                                name="categories"
                                                label="Category"
                                                placeholder="Select category"
                                                searchPlaceholder="Search categories..."
                                                options={categoryOptions}
                                                multiple
                                                onAddNew={handleCategoryModal}
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
                                            options={unitOptions}
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
                                                        <div className="flex items-center gap-2">
                                                            <Input
                                                                {...field}
                                                                className=""
                                                                placeholder="Item Code"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={
                                                                    generateItemCode
                                                                }
                                                            >
                                                                Assign Code
                                                            </Button>
                                                        </div>
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
                                    {((settings.customFieldNames?.length ?? 0) >
                                        0 ||
                                        settings.customFieldSettings.brand ||
                                        settings.customFieldSettings
                                            .warranty) && (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                                            {settings.customFieldNames?.map(
                                                (field) => (
                                                    <FormInput
                                                        key={field.name}
                                                        name={field.name}
                                                        label={field.name}
                                                        placeholder={field.name}
                                                    />
                                                )
                                            )}
                                            {settings.customFieldSettings
                                                .brand && (
                                                <FormCombobox
                                                    name="brand"
                                                    label="Brand"
                                                    placeholder="Select brand"
                                                    searchPlaceholder="Search brands..."
                                                    options={brandOptions}
                                                    onAddNew={handleBrandModal}
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
                            <Tabs
                                key={itemType}
                                defaultValue="pricing"
                                className="w-full"
                            >
                                <TabsList variant="underline">
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
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                        <FormInput
                                            name="salePrice"
                                            label="Sale Price"
                                            type="number"
                                            placeholder="0.00"
                                            required
                                        />
                                        {settings.mrpPrice &&
                                            itemType === 'product' && (
                                                <FormInput
                                                    name="mrp"
                                                    label="MRP"
                                                    type="number"
                                                    placeholder="0.00"
                                                />
                                            )}
                                    </div>

                                    {itemType === 'product' &&
                                        (showWholesalePrice ||
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

                                    {itemType === 'product' &&
                                        !showWholesalePrice &&
                                        !settings.wholesalePrice && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleWholesalePrice}
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
                </div>
            </form>

            <CategoryForm
                open={showCategoryModal}
                onOpenChange={setShowCategoryModal}
            />

            <BrandForm open={showBrandModal} onOpenChange={setShowBrandModal} />
        </FormProvider>
    )
}
