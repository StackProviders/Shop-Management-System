import { useParams, useNavigate } from 'react-router'
import { useIsMobile } from '@/hooks/use-mobile'
import { useShopContext } from '@/features/shop'
import { useAppBar } from '@/hooks/use-app-bar'
import {
    useParties,
    usePartyActions,
    PartyDetail,
    PartyForm
} from '@/features/parties'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle
} from '@/components/ui/drawer'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription
} from '@/components/ui/empty'
import { Copy, MoreVertical, Pen, Trash2 } from 'lucide-react'
import { useState, useMemo } from 'react'
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
    const isMobile = useIsMobile()
    const { currentShop } = useShopContext()
    const { parties, isLoading, refresh } = useParties(
        currentShop?.shopId || ''
    )
    const { updateParty, deleteParty } = usePartyActions(
        currentShop?.shopId || ''
    )

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

    const party = parties.find((p) => p.id === id)

    if (!party) {
        return <NotFoundErrorPage />
    }

    const actions = useMemo(
        () => (
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
        ),
        []
    )

    useAppBar({
        title: party.name,
        showBackButton: true,
        onBack: () => navigate('/parties'),
        actions
    })

    const handleUpdateParty = async (data: PartyFormData) => {
        if (!party) return
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
        refresh()
    }

    const handleDeleteParty = async () => {
        if (!party) return
        await deleteParty(party.id)
        setDeleteConfirmOpen(false)
        navigate('/parties')
    }

    const FormModal = isMobile ? Drawer : Dialog
    const FormContent = isMobile ? DrawerContent : DialogContent
    const FormHeader = isMobile ? DrawerHeader : DialogHeader
    const FormTitle = isMobile ? DrawerTitle : DialogTitle

    if (isLoading) {
        return (
            <div className="h-full p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                <Skeleton className="h-10 sm:h-12 w-full" />
                <Skeleton className="h-48 sm:h-64 w-full" />
            </div>
        )
    }

    if (!party) {
        return (
            <div className="h-full flex items-center justify-center p-4 sm:p-6">
                <Empty>
                    <EmptyHeader>
                        <EmptyTitle>Party not found</EmptyTitle>
                        <EmptyDescription>
                            The party you&rsquo;re looking for doesn&#39;t exist
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        )
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="sm:p-4 space-y-3 sm:space-y-4">
                <PartyDetail party={party} onEdit={() => setIsEditOpen(true)} />
            </div>

            <FormModal open={isEditOpen} onOpenChange={setIsEditOpen}>
                <FormContent className={isMobile ? '' : 'max-w-md sm:max-w-lg'}>
                    <FormHeader>
                        <FormTitle>Edit Party</FormTitle>
                    </FormHeader>
                    <div className={isMobile ? 'px-3 pb-4 sm:px-4' : ''}>
                        <PartyForm
                            party={party}
                            onSubmit={handleUpdateParty}
                            onCancel={() => setIsEditOpen(false)}
                        />
                    </div>
                </FormContent>
            </FormModal>

            <AlertDialog
                open={deleteConfirmOpen}
                onOpenChange={setDeleteConfirmOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete {party.name}. This
                            action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteParty}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
