import { useState, useEffect, useMemo } from 'react'
import { useNavigate, Outlet, useParams } from 'react-router'
import { useIsMobile } from '@/hooks/use-mobile'
import { useShopContext } from '@/features/shop'
import {
    useParties,
    usePartyActions,
    PartyForm,
    PartyList,
    PartyFilter
} from '@/features/parties'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
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
import { Skeleton } from '@/components/ui/skeleton'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from '@/components/ui/empty'
import { Plus, Users, Store } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Heading2 } from '@/components/ui/typography'

interface PartyFormData {
    type: 'customer' | 'supplier'
    name: string
    phone?: string
    email?: string
    address?: string
    balance: number
    status: 'active' | 'inactive'
}

export default function PartiesLayout() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isMobile = useIsMobile()
    const { currentShop } = useShopContext()
    const { parties, isLoading, refresh } = useParties(
        currentShop?.shopId || ''
    )
    const { createParty } = usePartyActions(currentShop?.shopId || '')

    const [searchQuery, setSearchQuery] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filterType, setFilterType] = useState<string[]>([])
    const [filterStatus, setFilterStatus] = useState<string[]>([])
    const [filterBalance, setFilterBalance] = useState<string[]>([])

    const filteredParties = useMemo(() => {
        return parties.filter((party) => {
            const matchesSearch = party.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            const matchesType =
                filterType.length === 0 || filterType.includes(party.type)
            const matchesStatus =
                filterStatus.length === 0 || filterStatus.includes(party.status)
            const matchesBalance =
                filterBalance.length === 0 ||
                (filterBalance.includes('due') && party.balance < 0) ||
                (filterBalance.includes('advance') && party.balance > 0) ||
                (filterBalance.includes('settled') && party.balance === 0)

            return (
                matchesSearch && matchesType && matchesStatus && matchesBalance
            )
        })
    }, [parties, searchQuery, filterType, filterStatus, filterBalance])

    const clearFilters = () => {
        setFilterType([])
        setFilterStatus([])
        setFilterBalance([])
    }

    useEffect(() => {
        if (!id && filteredParties.length > 0 && !isMobile) {
            navigate(`/parties/${filteredParties[0].id}`, { replace: true })
        }
    }, [id, filteredParties, navigate, isMobile])

    const handleCreateParty = async (data: PartyFormData) => {
        const party = await createParty({
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
        setIsFormOpen(false)
        refresh()
        navigate(`/parties/${party.id}`)
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

    if (!currentShop) {
        return (
            <div className="h-full flex items-center justify-center">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Store />
                        </EmptyMedia>
                        <EmptyTitle>No shop selected</EmptyTitle>
                        <EmptyDescription>
                            Please select a shop to manage parties
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        )
    }

    const customerCount = parties.filter((p) => p.type === 'customer').length
    const supplierCount = parties.filter((p) => p.type === 'supplier').length

    return (
        <div className="h-full flex flex-col">
            {/* Top Header */}
            <div
                className={cn(
                    'border-b space-y-3 p-3 sm:p-4',
                    id && isMobile && 'hidden'
                )}
            >
                <div className="flex items-center gap-2 sm:gap-3 justify-between">
                    <Heading2>Parties</Heading2>
                    <Button
                        variant="primary"
                        size={isMobile ? 'xs' : 'sm'}
                        onClick={() => setIsFormOpen(true)}
                    >
                        <Plus className="size-4" />
                        <span className="hidden xs:inline">Add Party</span>
                    </Button>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-muted-foreground">
                            Customers:
                        </span>
                        <span className="font-semibold">{customerCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-muted-foreground">
                            Suppliers:
                        </span>
                        <span className="font-semibold">{supplierCount}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-muted-foreground">Total:</span>
                        <span className="font-semibold">{parties.length}</span>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Sidebar - Party List */}
                <div
                    className={cn(
                        'flex flex-col',
                        isMobile ? 'w-full' : 'w-80 border-r',
                        id && isMobile && 'hidden'
                    )}
                >
                    <div className="p-3 sm:p-4 border-b space-y-3">
                        <div className="flex gap-2">
                            <SearchInput
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                                placeholder="Search..."
                                wrapperClassName="flex-1"
                            />
                            <PartyFilter
                                filterType={filterType}
                                filterStatus={filterStatus}
                                filterBalance={filterBalance}
                                onFilterTypeChange={setFilterType}
                                onFilterStatusChange={setFilterStatus}
                                onFilterBalanceChange={setFilterBalance}
                                onClearFilters={clearFilters}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {filteredParties.length === 0 ? (
                            <div className="p-3 sm:p-4">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Users />
                                        </EmptyMedia>
                                        <EmptyTitle>
                                            No parties found
                                        </EmptyTitle>
                                        <EmptyDescription>
                                            Create your first party to get
                                            started
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </div>
                        ) : (
                            <PartyList
                                parties={filteredParties}
                                selectedParty={
                                    parties.find((p) => p.id === id) || null
                                }
                                onSelectParty={(party) =>
                                    navigate(`/parties/${party.id}`)
                                }
                            />
                        )}
                    </div>
                </div>

                {/* Right Content - Outlet for nested routes */}
                <div
                    className={cn(
                        'flex-1 overflow-y-auto',
                        !id && isMobile && 'hidden'
                    )}
                >
                    <Outlet />
                </div>
            </div>

            {/* Form Modal */}
            <FormModal open={isFormOpen} onOpenChange={setIsFormOpen}>
                <FormContent className={isMobile ? '' : 'max-w-md sm:max-w-lg'}>
                    <FormHeader>
                        <FormTitle>Add New Party</FormTitle>
                    </FormHeader>
                    <div className={isMobile ? 'px-3 pb-4 sm:px-4' : ''}>
                        <PartyForm
                            onSubmit={handleCreateParty}
                            onCancel={() => setIsFormOpen(false)}
                        />
                    </div>
                </FormContent>
            </FormModal>
        </div>
    )
}
