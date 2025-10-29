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
import { ScrollArea } from '@/components/ui/scroll-area'
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
    const shopId = useMemo(
        () => currentShop?.shopId || '',
        [currentShop?.shopId]
    )
    const { parties, isLoading } = useParties(shopId)
    const { createParty } = usePartyActions(shopId)

    const [searchQuery, setSearchQuery] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [filterType, setFilterType] = useState<string[]>([])
    const [filterStatus, setFilterStatus] = useState<string[]>([])
    const [filterBalance, setFilterBalance] = useState<string[]>([])
    const [hasInitialLoad, setHasInitialLoad] = useState(false)

    const customerCount = useMemo(
        () => parties.filter((p) => p.type === 'customer').length,
        [parties]
    )
    const supplierCount = useMemo(
        () => parties.filter((p) => p.type === 'supplier').length,
        [parties]
    )

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
        if (!isLoading && parties.length > 0) {
            setHasInitialLoad(true)
        }
    }, [isLoading, parties.length])

    useEffect(() => {
        if (hasInitialLoad && !id && !isMobile && filteredParties.length > 0) {
            navigate(`/parties/${filteredParties[0].id}`, { replace: true })
        }
    }, [hasInitialLoad, id, isMobile, filteredParties.length, navigate])

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
        navigate(`/parties/${party.id}`)
    }

    const FormModal = useMemo(() => (isMobile ? Drawer : Dialog), [isMobile])
    const FormContent = useMemo(
        () => (isMobile ? DrawerContent : DialogContent),
        [isMobile]
    )
    const FormHeader = useMemo(
        () => (isMobile ? DrawerHeader : DialogHeader),
        [isMobile]
    )
    const FormTitle = useMemo(
        () => (isMobile ? DrawerTitle : DialogTitle),
        [isMobile]
    )

    if (!hasInitialLoad && isLoading) {
        return (
            <div className="h-full p-3 sm:p-4 md:p-6 space-y-4">
                <div className="space-y-3">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex gap-4">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
                <div className="flex gap-4 h-[calc(100%-8rem)]">
                    <div className="w-80 space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                    <div className="flex-1">
                        <Skeleton className="h-full w-full" />
                    </div>
                </div>
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

    return (
        <div className="h-full flex flex-col">
            {/* Top Header */}
            <div
                className={cn(
                    'border-b space-y-3 p-2',
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
            <div className="flex-1 flex flex-col md:flex-row min-h-0">
                {/* Left Sidebar - Party List */}
                <div
                    className={cn(
                        'flex flex-col min-h-0',
                        isMobile ? 'flex-1' : 'w-80 border-r',
                        id && isMobile && 'hidden'
                    )}
                >
                    <div className="p-3 sm:p-4 border-b space-y-3 shrink-0">
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

                    <ScrollArea className="flex-1">
                        {isLoading && !hasInitialLoad ? (
                            <div className="p-3 sm:p-4 space-y-2">
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                                <Skeleton className="h-16 w-full" />
                            </div>
                        ) : filteredParties.length === 0 ? (
                            <div className="p-3 sm:p-4">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <Users />
                                        </EmptyMedia>
                                        <EmptyTitle>
                                            {parties.length === 0
                                                ? 'No parties yet'
                                                : 'No parties found'}
                                        </EmptyTitle>
                                        <EmptyDescription>
                                            {parties.length === 0
                                                ? 'Create your first party to get started'
                                                : 'Try adjusting your search or filters'}
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
                    </ScrollArea>
                </div>

                {/* Right Content - Outlet for nested routes */}
                <ScrollArea
                    className={cn('flex-1', !id && isMobile && 'hidden')}
                >
                    {!id &&
                    !isMobile &&
                    filteredParties.length > 0 &&
                    hasInitialLoad ? (
                        <div className="h-full flex items-center justify-center p-6">
                            <div className="space-y-2">
                                <Skeleton className="h-8 w-48 mx-auto" />
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-24 w-full" />
                            </div>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </ScrollArea>
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
