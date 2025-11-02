import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
    FieldGroup,
    FieldSet,
    FieldLegend,
    FieldSeparator
} from '@/components/ui/field'
import {
    FormInput,
    FormTextarea,
    FormSelect,
    FormCheckbox,
    FormRadioGroup,
    FormCombobox
} from '@/components/ui/form-fields'

const itemSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    type: z.enum(['product', 'service']),
    salePrice: z.number().min(0, 'Sale price must be positive'),
    purchasePrice: z.number().min(0, 'Purchase price must be positive'),
    unit: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    trackStock: z.boolean(),
    openingStock: z.number().optional()
})

type FormData = z.infer<typeof itemSchema>

export function ItemFormExample() {
    const [, setShowAddCategory] = useState(false)

    const form = useForm<FormData>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            name: '',
            type: 'product' as const,
            salePrice: 0,
            purchasePrice: 0,
            trackStock: false,
            tags: []
        }
    })

    const onSubmit = (data: FormData) => {
        console.log(data)
    }

    const handleAddCategory = () => {
        setShowAddCategory(true)
        // Open dialog/modal to add new category
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-2xl"
            >
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>Item Information</FieldLegend>

                        <FieldGroup>
                            <FormInput
                                name="name"
                                label="Item Name"
                                placeholder="Enter item name"
                                required
                            />

                            <FormRadioGroup
                                name="type"
                                label="Item Type"
                                required
                                options={[
                                    { value: 'product', label: 'Product' },
                                    { value: 'service', label: 'Service' }
                                ]}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <FormInput
                                    name="salePrice"
                                    label="Sale Price"
                                    type="number"
                                    placeholder="0.00"
                                    required
                                />

                                <FormInput
                                    name="purchasePrice"
                                    label="Purchase Price"
                                    type="number"
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <FormSelect
                                name="unit"
                                label="Unit"
                                placeholder="Select unit"
                                options={[
                                    { value: 'pcs', label: 'Pieces' },
                                    { value: 'kg', label: 'Kilogram' },
                                    { value: 'ltr', label: 'Liter' }
                                ]}
                            />

                            <FormCombobox
                                name="category"
                                label="Category"
                                placeholder="Select category"
                                searchPlaceholder="Search categories..."
                                options={[
                                    {
                                        value: 'electronics',
                                        label: 'Electronics'
                                    },
                                    { value: 'clothing', label: 'Clothing' },
                                    { value: 'food', label: 'Food' },
                                    { value: 'furniture', label: 'Furniture' },
                                    { value: 'books', label: 'Books' }
                                ]}
                                onAddNew={handleAddCategory}
                                addNewLabel="Add new category"
                                clearable
                            />

                            <FormCombobox
                                name="tags"
                                label="Tags"
                                placeholder="Select tags"
                                searchPlaceholder="Search tags..."
                                options={[
                                    { value: 'new', label: 'New Arrival' },
                                    { value: 'sale', label: 'On Sale' },
                                    { value: 'featured', label: 'Featured' },
                                    { value: 'popular', label: 'Popular' },
                                    {
                                        value: 'limited',
                                        label: 'Limited Edition'
                                    }
                                ]}
                                multiple
                                maxSelected={3}
                                description="Select up to 3 tags"
                            />

                            <FormTextarea
                                name="description"
                                label="Description"
                                placeholder="Enter item description"
                                rows={4}
                            />
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator />

                    <FieldSet>
                        <FieldLegend>Stock Management</FieldLegend>

                        <FieldGroup>
                            <FormCheckbox
                                name="trackStock"
                                label="Track inventory for this item"
                            />

                            {form.watch('trackStock') && (
                                <FormInput
                                    name="openingStock"
                                    label="Opening Stock"
                                    type="number"
                                    placeholder="0"
                                />
                            )}
                        </FieldGroup>
                    </FieldSet>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting
                                ? 'Saving...'
                                : 'Save Item'}
                        </Button>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </div>
                </FieldGroup>
            </form>
        </FormProvider>
    )
}
