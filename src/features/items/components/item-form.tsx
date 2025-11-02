import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ImagePlus, Settings, X } from 'lucide-react'
import {
    FormInput,
    FormTextarea,
    FormCombobox
} from '@/components/ui/form-fields'
import { itemSchema, type ItemFormData } from '../validations/item.validation'
import type { ItemType, Category, Unit } from '../types'

interface ItemFormProps {
    type?: ItemType
    categories: Category[]
    units: Unit[]
    onSubmit: (data: ItemFormData) => Promise<void>
    onCancel: () => void
}

export function ItemForm({
    type: initialType = 'product',
    units,
    categories,
    onSubmit,
    onCancel
}: ItemFormProps) {
    const [showWholesalePrice, setShowWholesalePrice] = useState(false)

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

    const generateItemCode = () => {
        const code = `ITEM-${Date.now().toString().slice(-6)}`
        form.setValue('itemCode', code)
    }

    return (
        <FormProvider {...form}>
            <div className="h-full flex flex-col bg-muted/20">
                <div className="flex items-center justify-between p-4 border-b">
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
                </div>

                <div className="flex-1 overflow-y-auto">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 p-4 md:p-6"
                    >
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
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormCombobox
                                name="unit"
                                label="Unit"
                                placeholder="Select unit"
                                searchPlaceholder="Search units..."
                                options={units.map((unit) => ({
                                    value: unit.id,
                                    label: `${unit.fullName} (${unit.shortName})`
                                }))}
                            />

                            <div className="space-y-2">
                                <Label>Item Code</Label>
                                <div className="flex gap-2">
                                    <FormInput
                                        name="itemCode"
                                        placeholder="Item Code"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={generateItemCode}
                                        className="whitespace-nowrap"
                                    >
                                        Assign Code
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <ImagePlus className="size-4" />
                                Add Item Image
                            </Button>
                        </div>

                        <FormTextarea
                            name="description"
                            label="Description"
                            placeholder="Enter description"
                            rows={2}
                        />

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
                                <FormInput
                                    name="salePrice"
                                    label="Sale Price"
                                    type="number"
                                    placeholder="0.00"
                                    required
                                />

                                {showWholesalePrice && (
                                    <FormInput
                                        name="wholesalePrice"
                                        label="Wholesale Price"
                                        type="number"
                                        placeholder="0.00"
                                    />
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

                                <FormInput
                                    name="purchasePrice"
                                    label="Purchase Price"
                                    type="number"
                                    placeholder="0.00"
                                    required
                                />
                            </TabsContent>

                            {itemType === 'product' && (
                                <TabsContent
                                    value="stock"
                                    className="space-y-4"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 pt-4 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className="w-full sm:w-auto"
                            >
                                Save & New
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="w-full sm:w-auto"
                            >
                                {form.formState.isSubmitting
                                    ? 'Saving...'
                                    : 'Save'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </FormProvider>
    )
}
