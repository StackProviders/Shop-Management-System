import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { Form } from '@/components/ui/form'
import { FormInput, FormSelect } from '@/components/common'
import { Party } from '../types'
import { partyFormSchema, PartyFormData } from '../validations'

interface PartyFormProps {
    party?: Party
    onSubmit: (data: PartyFormData) => Promise<void>
    formId?: string
    onFormChange?: (form: ReturnType<typeof useForm<PartyFormData>>) => void
}

export function PartyForm({
    party,
    onSubmit,
    formId = 'party-form',
    onFormChange
}: PartyFormProps) {
    const form = useForm<PartyFormData>({
        resolver: zodResolver(partyFormSchema),
        defaultValues: {
            type: 'customer',
            name: '',
            phone: '',
            email: '',
            address: '',
            balance: 0,
            status: 'active'
        }
    })

    useEffect(() => {
        onFormChange?.(form)
    }, [form, onFormChange])

    useEffect(() => {
        if (party) {
            form.reset({
                type: party.type,
                name: party.name,
                phone: party.contactInfo?.phone || '',
                email: party.contactInfo?.email || '',
                address: party.contactInfo?.address || '',
                balance: party.balance,
                status: party.status
            })
        } else {
            form.reset({
                type: 'customer',
                name: '',
                phone: '',
                email: '',
                address: '',
                balance: 0,
                status: 'active'
            })
        }
    }, [party, form])

    const handleSubmit = async (data: PartyFormData) => {
        await onSubmit(data)
    }

    return (
        <Form {...form}>
            <form
                id={formId}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                <FormSelect<PartyFormData>
                    name="type"
                    label="Type"
                    required
                    options={[
                        { value: 'customer', label: 'Customer' },
                        { value: 'supplier', label: 'Supplier' }
                    ]}
                />

                <FormInput<PartyFormData>
                    name="name"
                    label="Name"
                    required
                    placeholder="Enter name"
                />

                <FormInput<PartyFormData>
                    name="phone"
                    label="Phone"
                    type="tel"
                    placeholder="Enter phone number"
                />

                <FormInput<PartyFormData>
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                />

                <FormInput<PartyFormData>
                    name="address"
                    label="Address"
                    placeholder="Enter address"
                />

                <FormInput<PartyFormData>
                    name="balance"
                    label="Opening Balance"
                    type="number"
                    placeholder="0.00"
                />

                <FormSelect<PartyFormData>
                    name="status"
                    label="Status"
                    required
                    options={[
                        { value: 'active', label: 'Active' },
                        { value: 'inactive', label: 'Inactive' }
                    ]}
                />
            </form>
        </Form>
    )
}
