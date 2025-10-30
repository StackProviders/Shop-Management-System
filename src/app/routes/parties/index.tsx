import { useEffect, useMemo, useRef } from 'react'
import { useNavigate, Outlet, useParams, useLocation } from 'react-router'
import { useIsMobile } from '@/hooks/use-mobile'
import { useShopContext } from '@/features/shop'
import {
    usePartiesByShop,
    usePartyFilters,
    PartyList,
    PartyFilter
} from '@/features/parties'
import { SuspenseWithPerf } from 'reactfire'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
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

function PartiesLayout() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isMobile = useIsMobile()
    const { currentShop } = useShopContext()
    const shopId = useMemo(
        () => currentShop?.shopId || '',
        [currentShop?.shopId]
    )

    const location = useLocation()
    const { parties, isLoading } = usePartiesByShop(shopId)

    const {
        searchQuery,
        setSearchQuery,
        filterType,
        setFilterType,
        filterStatus,
        setFilterStatus,
        filterBalance,
        setFilterBalance,
        filteredParties,
        clearFilters
    } = usePartyFilters(parties)

    const isNewOpen = useMemo(
        () => location.pathname === '/parties/new',
        [location.pathname]
    )
    const isEditOpen = useMemo(
        () => location.pathname.includes('/edit'),
        [location.pathname]
    )
    const isRouteActive = id || isNewOpen || isEditOpen

    const { customerCount, supplierCount } = useMemo(
        () => ({
            customerCount: parties.filter((p) => p.type === 'customer').length,
            supplierCount: parties.filter((p) => p.type === 'supplier').length
        }),
        [parties]
    )

    const hasNavigated = useRef(false)

    useEffect(() => {
        if (isRouteActive) {
            hasNavigated.current = false
            return
        }

        if (
            isLoading ||
            filteredParties.length === 0 ||
            hasNavigated.current ||
            window.innerWidth < 768
        )
            return

        hasNavigated.current = true
        navigate(`/parties/${filteredParties[0].id}`, { replace: true })
    }, [isLoading, isRouteActive, filteredParties, navigate])

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
                    isMobile && isRouteActive && 'hidden'
                )}
            >
                <div className="flex items-center gap-2 sm:gap-3 justify-between">
                    <Heading2>Parties</Heading2>
                    <Button
                        variant="primary"
                        size={isMobile ? 'xs' : 'sm'}
                        onClick={() => navigate('/parties/new')}
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
                        isMobile && isRouteActive && 'hidden'
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
                        {filteredParties.length === 0 ? (
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
                                    id
                                        ? parties.find((p) => p.id === id) ||
                                          null
                                        : null
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
                    className={cn(
                        'flex-1',
                        isMobile && !isRouteActive && 'hidden'
                    )}
                >
                    <Outlet />
                </ScrollArea>
            </div>
        </div>
    )
}

export default function PartiesPage() {
    return (
        <SuspenseWithPerf
            fallback={
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
            }
            traceId="parties-page"
        >
            <PartiesLayout />
        </SuspenseWithPerf>
    )
}
