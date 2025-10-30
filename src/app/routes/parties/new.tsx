import { useNavigate } from 'react-router'
import { useShopContext } from '@/features/shop'
import { usePartyMutations, PartyForm } from '@/features/parties'
import { ResponsiveRouteView } from '@/components'

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
    const { currentShop } = useShopContext()
    const { createParty } = usePartyMutations(currentShop?.shopId || '')

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
                onSubmit={handleCreate}
                onCancel={() => navigate('/parties')}
            />
        </ResponsiveRouteView>
    )
}
