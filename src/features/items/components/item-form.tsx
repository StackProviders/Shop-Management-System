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
import { InputGroup, InputAddon, Input } from '@/components/ui/input'
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
import { ImageUpload } from '@/components/upload/image-upload'
import { CategoryForm } from './category-form'
import { useShopContext } from '@/features/shop'
import { UNITS } from '@/config/units'

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
            minStockAlert: 0
        }
    })

    const itemType = form.watch('type')
    const { currentShop } = useShopContext()

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
                        <Button variant="ghost" size="icon">
                            <Settings className="size-5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onCancel}>
                            <X className="size-5" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Main Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_550px] gap-6">
                            {/* Left Column - Form Fields */}
                            <div className="space-y-4">
                                {/* Row 1: Item Name & Category */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        name="name"
                                        label="Item Name"
                                        placeholder="Enter name"
                                        required
                                    />

                                    <FormCombobox
                                        name="categories"
                                        label="Category"
                                        placeholder="Select category"
                                        searchPlaceholder="Search categories..."
                                        options={categories.map((cat) => ({
                                            value: cat.id,
                                            label: cat.name
                                        }))}
                                        multiple
                                        onAddNew={() =>
                                            setShowCategoryModal(true)
                                        }
                                        addNewLabel="Add New Category"
                                    />
                                </div>

                                {/* Row 2: Unit & Item Code */}
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
                                                <FormLabel>Item Code</FormLabel>
                                                <FormControl>
                                                    <InputGroup className="bg-background">
                                                        <Input
                                                            {...field}
                                                            placeholder="Item Code"
                                                        />
                                                        <InputAddon mode="icon">
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={
                                                                    generateItemCode
                                                                }
                                                                className="h-full rounded-none"
                                                            >
                                                                Assign Code
                                                            </Button>
                                                        </InputAddon>
                                                    </InputGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Row 3: Description */}
                                <FormTextarea
                                    name="description"
                                    label="Description"
                                    placeholder="Enter description"
                                    rows={3}
                                />

                                {/* Row 4: Additional Fields (3 columns) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <FormInput
                                        name="colour"
                                        label="Colour"
                                        placeholder="Colour"
                                    />
                                    <FormInput
                                        name="material"
                                        label="Material"
                                        placeholder="Material"
                                    />
                                    <FormInput
                                        name="mfgDate"
                                        label="Mfg. Date"
                                        placeholder="Mfg. Date"
                                    />
                                </div>

                                {/* Row 5: Additional Fields (3 columns) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    <FormInput
                                        name="expDate"
                                        label="Exp. Date"
                                        placeholder="Exp. Date"
                                    />
                                    <FormInput
                                        name="size"
                                        label="Size"
                                        placeholder="Size"
                                    />
                                    <FormInput
                                        name="brand"
                                        label="Brand"
                                        placeholder="Brand"
                                    />
                                </div>
                            </div>

                            {/* Right Column - Image Upload */}
                            <div className="flex items-start justify-end pt-8">
                                <ImageUpload
                                    images={images}
                                    onChange={setImages}
                                    path="items"
                                    maxImages={5}
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

                                {showWholesalePrice && (
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

                                {!showWholesalePrice && (
                                    <Button
                                        type="button"
                                        variant="dim"
                                        size="sm"
                                        onClick={() =>
                                            setShowWholesalePrice(true)
                                        }
                                        className="px-0 text-primary h-auto"
                                    >
                                        + Add Wholesale Price
                                    </Button>
                                )}

                                <div className="max-w-xs">
                                    <FormInput
                                        name="purchasePrice"
                                        label="Purchase Price"
                                        type="number"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
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
                    </form>
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
                        type="submit"
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
        </FormProvider>
    )
}
