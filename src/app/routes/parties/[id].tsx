import { useParams, useNavigate, useLocation } from 'react-router'
import { useShopContext } from '@/features/shop'
import { useAppBar } from '@/hooks/use-app-bar'
import {
    usePartyById,
    usePartyMutations,
    PartyDetail,
    PartyForm
} from '@/features/parties'
import { Skeleton } from '@/components/ui/skeleton'
import { DetailActionsMenu } from '@/components/detail-actions-menu'
import { X, Check } from 'lucide-react'
import NotFoundErrorPage from '../not-found'
import { FormModal } from '@/components'

interface PartyFormData {
    type: 'customer' | 'supplier'
    name: string
    phone?: string
    email?: string
    address?: string
    balance: number
    status: 'active' | 'inactive'
}

export default function PartyDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const location = useLocation()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { party, isLoading } = usePartyById(id!)
    const { updateParty, deleteParty } = usePartyMutations(shopId)
    const isEditOpen = location.pathname === `/parties/${id}/edit`

    const actions = party ? (
        <DetailActionsMenu
            item={party}
            itemName={party.name}
            editPath={`/parties/${id}/edit`}
            duplicatePath="/parties/new"
            listPath="/parties"
            onDelete={deleteParty}
            getDuplicateData={(p) => ({
                type: p.type,
                name: `${p.name} (Copy)`,
                phone: p.contactInfo.phone,
                email: p.contactInfo.email,
                address: p.contactInfo.address,
                balance: 0,
                status: p.status
            })}
        />
    ) : null

    useAppBar({
        title: isEditOpen ? 'Edit Party' : party?.name || 'Party',
        showBackButton: true,
        onBack: () => navigate(isEditOpen ? `/parties/${id}` : '/parties'),
        actions: isEditOpen ? undefined : actions,
        showBottomActions: true,
        bottomActions: isEditOpen
            ? [
                  {
                      icon: X,
                      label: 'Cancel',
                      onClick: () => navigate(`/parties/${id}`),
                      variant: 'outline'
                  },
                  {
                      icon: Check,
                      label: 'Update',
                      onClick: () => {
                          const form = document.querySelector('form')
                          form?.requestSubmit()
                      },
                      variant: 'primary'
                  }
              ]
            : [],
        showQuickActionCenter: !isEditOpen,
        deps: [isEditOpen, party?.name]
    })

    if (isLoading) {
        return (
            <div className="h-full p-3 sm:p-4 md:p-6 space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-3">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        )
    }

    if (!party && !isLoading) {
        return <NotFoundErrorPage />
    }

    if (!party) {
        return null
    }

    const handleUpdateParty = async (data: PartyFormData) => {
        await updateParty(party.id, {
            name: data.name,
            contactInfo: {
                phone: data.phone,
                email: data.email,
                address: data.address
            },
            balance: data.balance,
            status: data.status
        })
        navigate(`/parties/${party.id}`)
    }

    if (isEditOpen) {
        return (
            <FormModal
                open={true}
                onOpenChange={(open) =>
                    !open && navigate(`/parties/${party.id}`)
                }
                title="Edit Party"
                description="Update party information"
                formId="edit-party-form"
                onCancel={() => navigate(`/parties/${party.id}`)}
                submitLabel="Update"
                className="max-w-2xl"
            >
                <PartyForm
                    party={party}
                    onSubmit={handleUpdateParty}
                    onCancel={() => navigate(`/parties/${party.id}`)}
                    showActions={false}
                    formId="edit-party-form"
                />
            </FormModal>
        )
    }

    return (
        <>
            <div className="h-full overflow-y-auto">
                <div className="sm:p-4 space-y-3 sm:space-y-4">
                    <PartyDetail
                        party={party}
                        onEdit={() => navigate(`/parties/${id}/edit`)}
                        shopId={currentShop?.shopId ?? ''}
                    />
                </div>
            </div>
        </>
    )
}
