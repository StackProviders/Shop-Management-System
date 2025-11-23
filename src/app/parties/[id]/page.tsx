'use client'

import {
    useParams,
    useRouter,
    usePathname,
    useSearchParams
} from 'next/navigation'
import { useShopContext } from '@/features/shop'
import { useAppBar } from '@/hooks/use-app-bar'
import {
    usePartyById,
    usePartyMutations,
    PartyDetail,
    PartyForm
} from '@/features/parties'
import { Skeleton } from '@/components/ui/skeleton'
import { X, Check } from 'lucide-react'
import NotFound from '@/app/not-found'
import { FormModal } from '@/components'
import { useCallback } from 'react'
import { DetailActionsMenu } from '@/components/common'

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
    const params = useParams()
    const id = params.id as string
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { party, isLoading } = usePartyById(id!)
    const { updateParty, deleteParty } = usePartyMutations(shopId)
    const isEditOpen = pathname === `/parties/${id}/edit`
    const isEditIntercepting = searchParams.get('fromDetail') === 'true'

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
            router.back()
        } else {
            router.push(`/parties/${id}`)
        }
    }, [isEditIntercepting, router, id])

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
        if (isEditIntercepting) {
            router.replace(`/parties/${party!.id}`)
        } else {
            router.push(`/parties/${party!.id}`)
        }
    }

    useAppBar({
        title: isEditOpen ? 'Edit Party' : party?.name || 'Party',
        showBackButton: true,
        onBack: () =>
            router.push(isEditOpen ? `/parties/${id}` : '/parties'),
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
        return <NotFound />
    }

    if (!party) {
        return null
    }

    return (
        <>
            <div className="h-full overflow-y-auto">
                <PartyDetail
                    party={party}
                    onEdit={() => router.push(`/parties/${id}/edit`)}
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
