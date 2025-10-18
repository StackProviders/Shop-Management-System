import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResponsiveDialog } from '@/components/modal'
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet
} from '@/components/ui/field'
import { toast } from 'sonner'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shopSchema, type ShopFormData } from '@/lib/validations'

interface ShopModalProps {
    mode?: 'create' | 'edit'
    initialData?: { id?: string; name: string }
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onSuccess?: () => void
}

export default function ShopModal({
    mode = 'create',
    initialData,
    trigger,
    open: controlledOpen,
    onOpenChange,
    onSuccess
}: ShopModalProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const open = controlledOpen ?? internalOpen
    const setOpen = onOpenChange ?? setInternalOpen
    const form = useForm<ShopFormData>({
        resolver: zodResolver(shopSchema),
        defaultValues: {
            name: ''
        }
    })

    useEffect(() => {
        if (open) {
            if (initialData) {
                form.reset({ name: initialData.name })
            } else {
                form.reset({ name: '' })
            }
        }
    }, [open, initialData, form])

    const onSubmit = async (data: ShopFormData) => {
        try {
            // Simulate API call - replace with actual API
            await new Promise((resolve) => setTimeout(resolve, 500))

            if (mode === 'create') {
                // TODO: Replace with actual create API call
                // await createShop({ name: data.name })
                toast.success('Shop created', {
                    description: `"${data.name}" has been created successfully.`
                })
            } else {
                // TODO: Replace with actual update API call
                // await updateShop(initialData?.id, { name: data.name })
                toast.success('Shop updated', {
                    description: `Shop name has been updated to "${data.name}".`
                })
            }

            setOpen(false)
            form.reset()
            onSuccess?.()
        } catch {
            toast.error(
                `Failed to ${mode === 'create' ? 'create' : 'update'} shop. Please try again.`
            )
        }
    }

    const isEdit = mode === 'edit'
    const title = isEdit ? 'Edit Shop' : 'Create Shop'
    const description = isEdit
        ? 'Update your shop information below'
        : 'Enter shop details to create a new shop'
    const submitLabel = isEdit ? 'Save Changes' : 'Create Shop'

    return (
        <ResponsiveDialog
            trigger={trigger}
            title={title}
            description={description}
            open={open}
            onOpenChange={setOpen}
        >
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldSet>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="shop-name">
                                        Shop Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="shop-name"
                                        type="text"
                                        placeholder="Enter shop name"
                                        disabled={form.formState.isSubmitting}
                                        aria-invalid={fieldState.invalid}
                                        autoFocus
                                    />
                                    <FieldDescription>
                                        {isEdit
                                            ? 'Update the name of your shop'
                                            : 'Choose a unique name for your shop'}
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </FieldSet>
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="md"
                        onClick={() => {
                            setOpen(false)
                            form.reset()
                        }}
                        disabled={form.formState.isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size="md"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting
                            ? 'Saving...'
                            : submitLabel}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    )
}
