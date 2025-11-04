import { useNavigate, useSearch } from '@tanstack/react-router'
import { useShopContext } from '@/features/shop'
import { usePartyMutations, PartyForm } from '@/features/parties'
import { InterceptingRoute } from '@/components/intercepting'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { useAppBar } from '@/hooks/use-app-bar'
import { X, Check } from 'lucide-react'
import { useState, useCallback } from 'react'
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
    const search = useSearch({ from: '/_protected/_dashboard/parties/new' })
    const { currentShop } = useShopContext()
    const { createParty } = usePartyMutations(currentShop?.shopId || '')
    const [form, setForm] = useState<UseFormReturn<PartyFormData> | null>(null)
    const [isDirty, setIsDirty] = useState(false)

    const { handleClose, isIntercepting } = useInterceptingRoute(
        search.fromParties === true,
        '/parties'
    )

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

    useAppBar({
        title: 'Create New Party',
        showBackButton: true,
        onBack: handleClose,
        showBottomActions: true,
        bottomActions: [
            {
                icon: X,
                label: 'Cancel',
                onClick: handleClose,
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
        navigate({ to: `/parties/${id}`, replace: isIntercepting })
    }

    return (
        <InterceptingRoute
            isIntercepting={isIntercepting}
            fallbackPath="/parties"
            modalType="form"
            fullPageClassName="h-full overflow-y-auto p-3 sm:p-4 md:p-6"
            modalProps={{
                title: 'Create New Party',
                description: 'Add a new customer or supplier',
                formId: 'create-party-form',
                submitLabel: 'Create',
                className: 'max-w-2xl',
                isDirty
            }}
        >
            <div
                className={isIntercepting ? '' : 'max-w-2xl mx-auto space-y-6'}
            >
                {!isIntercepting && (
                    <div>
                        <h1 className="text-2xl font-bold">Create New Party</h1>
                        <p className="text-muted-foreground mt-1">
                            Add a new customer or supplier
                        </p>
                    </div>
                )}
                <PartyForm
                    onSubmit={handleCreate}
                    formId="create-party-form"
                    onFormChange={handleFormChange}
                />
            </div>
        </InterceptingRoute>
    )
}
