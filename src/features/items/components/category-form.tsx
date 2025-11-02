import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FormInput } from '@/components/ui/form-fields'
import { FormModal } from '@/components/responsive/form-modal'
import { useCategoryActions } from '../hooks/use-category-actions'
import type { Category } from '../types'

const categorySchema = z.object({
    name: z.string().min(1, 'Name is required')
})

type FormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    category?: Category
    onSuccess?: () => void
    onCancel?: () => void
}

export function CategoryForm({
    open,
    onOpenChange,
    category,
    onSuccess,
    onCancel
}: CategoryFormProps) {
    const { createCategory, updateCategory } = useCategoryActions()
    const isEdit = !!category

    const form = useForm<FormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: category?.name || ''
        }
    })

    const handleSubmit = async (data: FormData) => {
        if (isEdit) {
            await updateCategory(category.id, data)
        } else {
            await createCategory(data)
        }
        onOpenChange(false)
        onSuccess?.()
    }

    const handleCancel = () => {
        onOpenChange(false)
        onCancel?.()
    }

    return (
        <FormModal
            open={open}
            onOpenChange={onOpenChange}
            title={isEdit ? 'Edit Category' : 'Create Category'}
            description={
                isEdit
                    ? 'Update category name'
                    : 'Enter a name for the new category'
            }
            formId="category-form"
            onCancel={handleCancel}
            submitLabel={isEdit ? 'Update' : 'Create'}
            className="max-w-md"
        >
            <FormProvider {...form}>
                <form
                    id="category-form"
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="pb-5"
                >
                    <FormInput
                        name="name"
                        label="Category Name"
                        placeholder="Enter category name"
                        required
                    />
                </form>
            </FormProvider>
        </FormModal>
    )
}
