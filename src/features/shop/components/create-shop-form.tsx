import { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, SubmitButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet
} from '@/components/ui/field'
import { shopSchema, type ShopFormData } from '@/lib/validations'
import { ShopStatus } from '../types'

interface CreateShopFormProps {
    onSubmit: (data: ShopFormData) => Promise<void>
    onCancel: () => void
    initialData?: ShopFormData
}

export function CreateShopForm({
    onSubmit,
    onCancel,
    initialData
}: CreateShopFormProps) {
    const form = useForm<ShopFormData>({
        resolver: zodResolver(shopSchema),
        defaultValues: initialData || {
            shopname: '',
            status: ShopStatus.ACTIVE
        }
    })

    useEffect(() => {
        if (initialData) {
            form.reset(initialData)
        }
    }, [initialData, form])

    const handleSubmit: SubmitHandler<ShopFormData> = async (data) => {
        await onSubmit(data)
        form.reset()
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                                    {initialData
                                        ? 'Update the name of your shop'
                                        : 'Choose a unique name for your shop'}
                                </FieldDescription>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
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
                    onClick={onCancel}
                    disabled={form.formState.isSubmitting}
                >
                    Cancel
                </Button>
                <SubmitButton
                    type="submit"
                    size="md"
                    loading={form.formState.isSubmitting}
                >
                    {initialData ? 'Save Changes' : 'Create Shop'}
                </SubmitButton>
            </div>
        </form>
    )
}
