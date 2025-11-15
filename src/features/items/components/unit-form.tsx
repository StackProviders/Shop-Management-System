import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import { FormInput } from '@/components/common'
import { useShopContext } from '@/features/shop'
import { useUnitMutations } from '../hooks/use-units'
import { Form } from '@/components/ui/form'

const unitSchema = z.object({
    fullName: z
        .string()
        .min(1, 'Full name is required')
        .transform((val) => val.toUpperCase()),
    shortName: z.string().min(1, 'Short name is required')
})

type UnitFormData = z.infer<typeof unitSchema>

interface UnitFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function UnitForm({ open, onOpenChange }: UnitFormProps) {
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { create } = useUnitMutations(shopId)

    const form = useForm<UnitFormData>({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            fullName: '',
            shortName: ''
        }
    })

    const onSubmit = async (data: UnitFormData) => {
        await create(data)
        form.reset()
        onOpenChange(false)
    }

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title="Add New Unit"
            formId="unit-form"
            submitLabel="Add Unit"
            isSubmitting={form.formState.isSubmitting}
        >
            <Form {...form}>
                <form
                    id="unit-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormInput
                        name="fullName"
                        label="Full Name"
                        placeholder="e.g., KILOGRAMS"
                        required
                    />
                    <FormInput
                        name="shortName"
                        label="Short Name"
                        placeholder="e.g., Kg"
                        required
                    />
                </form>
            </Form>
        </ResponsiveModal>
    )
}
