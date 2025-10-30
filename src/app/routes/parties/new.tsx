import { useNavigate, useLocation } from 'react-router'
import { useShopContext } from '@/features/shop'
import { usePartyMutations, PartyForm } from '@/features/parties'
import type { Party } from '@/features/parties'
import { ResponsiveRouteView } from '@/components'
import { useAppBar } from '@/hooks/use-app-bar'
import { X, Check } from 'lucide-react'
import { useEffect, useState } from 'react'

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
        onBack: () => navigate('/parties'),
        showBottomActions: true,
        bottomActions: [
            {
                icon: X,
                label: 'Cancel',
                onClick: () => navigate('/parties'),
                variant: 'outline'
            },
            {
                icon: Check,
                label: 'Create',
                onClick: () => {
                    const form = document.querySelector('form')
                    form?.requestSubmit()
                },
                variant: 'primary'
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
        navigate(`/parties/${id}`)
    }

    return (
        <ResponsiveRouteView
            isOpen={true}
            baseRoute="/parties"
            title="Create New Party"
            className="max-w-2xl"
        >
            <PartyForm
                party={initialData as Party | undefined}
                onSubmit={handleCreate}
                onCancel={() => navigate('/parties')}
            />
        </ResponsiveRouteView>
    )
}
