import {
    useParams,
    useNavigate,
    useRouter,
    useSearch,
    useLocation
} from '@tanstack/react-router'
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
import NotFoundErrorPage from '@/app/pages/not-found'
import { FormModal } from '@/components'
import { useCallback } from 'react'

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
    const { id } = useParams({ strict: false })
    const navigate = useNavigate()
    const router = useRouter()
    const location = useLocation()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { party, isLoading } = usePartyById(id!)
    const { updateParty, deleteParty } = usePartyMutations(shopId)
    const isEditOpen = location.pathname === `/parties/${id}/edit`
    const editSearch = isEditOpen ? useSearch({ strict: false }) : undefined
    const isEditIntercepting =
        (editSearch as { fromDetail?: boolean })?.fromDetail === true

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

    const handleEditClose = useCallback(() => {
        if (isEditIntercepting) {
            router.history.back()
        } else {
            navigate({ to: `/parties/${id}` })
        }
    }, [isEditIntercepting, router, navigate, id])

    const handleUpdateParty = async (data: PartyFormData) => {
        await updateParty(party!.id, {
            name: data.name,
            contactInfo: {
                phone: data.phone,
                email: data.email,
                address: data.address
            },
            balance: data.balance,
            status: data.status
        })
        navigate({ to: `/parties/${party!.id}`, replace: isEditIntercepting })
    }

    useAppBar({
        title: isEditOpen ? 'Edit Party' : party?.name || 'Party',
        showBackButton: true,
        onBack: () =>
            navigate({ to: isEditOpen ? `/parties/${id}` : '/parties' }),
        actions: isEditOpen ? undefined : actions,
        showBottomActions: true,
        bottomActions: isEditOpen
            ? [
                  {
                      icon: X,
                      label: 'Cancel',
                      onClick: handleEditClose,
                      variant: 'outline'
                  },
                  {
                      icon: Check,
                      label: 'Update',
                      onClick: () => {
                          const form = document.querySelector('form')
                          form?.requestSubmit()
                      },
                      variant: 'default'
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

    return (
        <>
            <div className="h-full overflow-y-auto">
                <PartyDetail
                    party={party}
                    onEdit={() => navigate({ to: `/parties/${id}/edit` })}
                    shopId={currentShop?.shopId ?? ''}
                />
            </div>

            {isEditOpen && isEditIntercepting && (
                <FormModal
                    open={true}
                    onOpenChange={(open) => !open && handleEditClose()}
                    title="Edit Party"
                    description="Update party information"
                    formId="edit-party-form"
                    onCancel={handleEditClose}
                    submitLabel="Update"
                    className="max-w-2xl"
                >
                    <PartyForm
                        party={party}
                        onSubmit={handleUpdateParty}
                        formId="edit-party-form"
                    />
                </FormModal>
            )}
        </>
    )
}
