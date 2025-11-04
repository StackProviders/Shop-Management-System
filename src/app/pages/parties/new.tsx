import { useNavigate, useLocation } from '@tanstack/react-router'
import { useShopContext } from '@/features/shop'
import { usePartyMutations, PartyForm } from '@/features/parties'
import type { Party } from '@/features/parties'
import { FormModal } from '@/components'
import { useAppBar } from '@/hooks/use-app-bar'
import { X, Check } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import type { UseFormReturn } from 'react-hook-form'

interface PartyFormData {
    type: 'customer' | 'supplier'
    name: string
    phone?: string
    email?: string
    address?: string
    balance: number
    status: 'active' | 'inactive'
}

export default function NewPartyPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const { currentShop } = useShopContext()
    const { createParty } = usePartyMutations(currentShop?.shopId || '')
    const [initialData, setInitialData] = useState<Partial<Party> | undefined>()
    const [form, setForm] = useState<UseFormReturn<PartyFormData> | null>(null)
    const [isDirty, setIsDirty] = useState(false)

    const handleFormChange = useCallback(
        (formInstance: UseFormReturn<PartyFormData>) => {
            setForm(formInstance)
            const subscription = formInstance.watch(() => {
                setIsDirty(formInstance.formState.isDirty)
            })
            return () => subscription.unsubscribe()
        },
        []
    )

    useEffect(() => {
        const state = location.state as { duplicateFrom?: PartyFormData }
        if (state?.duplicateFrom) {
            const data = state.duplicateFrom
            setInitialData({
                type: data.type,
                name: data.name,
                contactInfo: {
                    phone: data.phone,
                    email: data.email,
                    address: data.address
                },
                balance: data.balance,
                status: data.status
            } as Partial<Party>)
        }
    }, [location.state])

    useAppBar({
        title: 'Create New Party',
        showBackButton: true,
        onBack: () => navigate({ to: '/parties' }),
        showBottomActions: true,
        bottomActions: [
            {
                icon: X,
                label: 'Cancel',
                onClick: () => navigate({ to: '/parties' }),
                variant: 'outline'
            },
            {
                icon: Check,
                label: 'Create',
                onClick: () => {
                    const form = document.querySelector('form')
                    form?.requestSubmit()
                },
                variant: 'default'
            }
        ],
        showQuickActionCenter: false
    })

    const handleCreate = async (data: PartyFormData) => {
        const id = await createParty({
            type: data.type,
            name: data.name,
            contactInfo: {
                phone: data.phone,
                email: data.email,
                address: data.address
            },
            balance: data.balance,
            status: data.status
        })
        form?.reset()
        navigate({ to: `/parties/${id}` })
    }

    return (
        <FormModal
            open={true}
            onOpenChange={(open) => !open && navigate({ to: '/parties' })}
            title="Create New Party"
            description="Add a new customer or supplier"
            formId="create-party-form"
            onCancel={() => form?.reset()}
            submitLabel="Create"
            className="max-w-2xl"
            isDirty={isDirty}
        >
            <PartyForm
                party={initialData as Party | undefined}
                onSubmit={handleCreate}
                formId="create-party-form"
                onFormChange={handleFormChange}
            />
        </FormModal>
    )
}
