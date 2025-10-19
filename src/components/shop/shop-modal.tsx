import { useEffect, useState } from 'react'
import { Button, SubmitButton } from '@/components/ui/button'
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
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { shopSchema, type ShopFormData } from '@/lib/validations'
import { Shop, ShopStatus } from '@/types/shop'

interface ShopModalProps {
    mode?: 'create' | 'edit'
    initialData?: Shop
    trigger?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    onCreate?: (data: ShopFormData) => Promise<void>
    onUpdate?: (shopId: string, data: ShopFormData) => Promise<void>
}

export default function ShopModal({
    mode = 'create',
    initialData,
    trigger,
    open: controlledOpen,
    onOpenChange,
    onCreate,
    onUpdate
}: ShopModalProps) {
    const [internalOpen, setInternalOpen] = useState(false)
    const open = controlledOpen ?? internalOpen
    const setOpen = onOpenChange ?? setInternalOpen
    const form = useForm<ShopFormData>({
        resolver: zodResolver(shopSchema),
        defaultValues: {
            shopname: '',
            status: ShopStatus.ACTIVE
        }
    })

    useEffect(() => {
        if (open) {
            if (initialData) {
                form.reset({
                    shopname: initialData.shopname,
                    logo_url: initialData.logo_url || '',
                    phone_number: initialData.phone_number || '',
                    email: initialData.email || '',
                    shop_type: initialData.shop_type || '',
                    shop_category: initialData.shop_category || '',
                    shop_address: initialData.shop_address || '',
                    signature: initialData.signature || '',
                    status: initialData.status
                })
            } else {
                form.reset()
            }
        }
    }, [open, initialData, form])

    const onSubmit: SubmitHandler<ShopFormData> = async (data) => {
        try {
            if (mode === 'create') {
                await onCreate?.(data)
                toast.success('Shop created', {
                    description: `"${data.shopname}" has been created successfully.`
                })
            } else {
                if (!initialData?.id) throw new Error('Shop ID is required')
                await onUpdate?.(initialData.id, data)
                toast.success('Shop updated', {
                    description: `Shop has been updated successfully.`
                })
            }

            setOpen(false)
            form.reset()
        } catch (err) {
            toast.error(
                err instanceof Error
                    ? err.message
                    : `Failed to ${mode === 'create' ? 'create' : 'update'} shop`
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
                            name="shopname"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="shopname">
                                        Shop Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="shopname"
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
                    <SubmitButton
                        type="submit"
                        size="md"
                        loading={form.formState.isSubmitting}
                    >
                        {submitLabel}
                    </SubmitButton>
                </div>
            </form>
        </ResponsiveDialog>
    )
}
