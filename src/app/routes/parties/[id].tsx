import { useParams, useNavigate } from 'react-router'
import { useShopContext } from '@/features/shop'
import { useAppBar } from '@/hooks/use-app-bar'
import {
    useParties,
    usePartyActions,
    PartyDetail,
    PartyForm
} from '@/features/parties'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ResponsiveModal } from '@/components/responsive-modal'
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog'
import { Copy, MoreVertical, Pen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import NotFoundErrorPage from '../not-found'

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
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { parties, isLoading } = useParties(shopId)
    const {
        updateParty,
        deleteParty,
        loading: actionLoading
    } = usePartyActions(shopId)

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

    const party = parties.find((p) => p.id === id)
    const showLoading = isLoading && !party

    const actions = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                    <Pen />
                    Edit
                    <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Copy />
                    Duplicate
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setDeleteConfirmOpen(true)}
                >
                    <Trash2 />
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

    useAppBar({
        title: party?.name || 'Party',
        showBackButton: true,
        onBack: () => navigate('/parties'),
        actions
    })

    if (showLoading) {
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
        try {
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
            setIsEditOpen(false)
        } catch {
            // Error handled in hook
        }
    }

    const handleDeleteParty = async () => {
        try {
            await deleteParty(party.id)
            setDeleteConfirmOpen(false)
            navigate('/parties')
        } catch {
            // Error handled in hook
        }
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="sm:p-4 space-y-3 sm:space-y-4">
                <PartyDetail party={party} onEdit={() => setIsEditOpen(true)} />
            </div>

            <ResponsiveModal
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                title="Edit Party"
            >
                <PartyForm
                    party={party}
                    onSubmit={handleUpdateParty}
                    onCancel={() => setIsEditOpen(false)}
                    loading={actionLoading}
                />
            </ResponsiveModal>

            <DeleteConfirmationDialog
                open={deleteConfirmOpen}
                onOpenChange={setDeleteConfirmOpen}
                onConfirm={handleDeleteParty}
                description={`This will permanently delete ${party.name}. This action cannot be undone.`}
            />
        </div>
    )
}
