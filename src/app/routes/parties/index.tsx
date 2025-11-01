import { useEffect, useMemo, useRef, useCallback, memo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { useShopContext } from '@/features/shop'
import {
    usePartiesByShop,
    usePartyFilters,
    PartyList,
    PartyFilter
} from '@/features/parties'
import { SuspenseWithPerf } from 'reactfire'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from '@/components/ui/empty'
import { Users, Store } from 'lucide-react'
import { ListDetailLayout } from '@/components/layouts/list-detail-layout'

const PartiesLayout = memo(function PartiesLayout() {
    const navigate = useNavigate()
    const { id } = useParams()
    const { currentShop } = useShopContext()
    const shopId = useMemo(
        () => currentShop?.shopId || '',
        [currentShop?.shopId]
    )

    const location = useLocation()
    const { parties } = usePartiesByShop(shopId)

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

    const isRouteActive = useMemo(
        () =>
            !!id ||
            location.pathname === '/parties/new' ||
            location.pathname.includes('/edit'),
        [id, location.pathname]
    )

    const stats = useMemo(
        () => [
            {
                label: 'Customers',
                value: parties.filter((p) => p.type === 'customer').length
            },
            {
                label: 'Suppliers',
                value: parties.filter((p) => p.type === 'supplier').length
            },
            { label: 'Total', value: parties.length }
        ],
        [parties]
    )

    const hasNavigated = useRef(false)

    useEffect(() => {
        if (isRouteActive || hasNavigated.current || window.innerWidth < 768) {
            if (isRouteActive) hasNavigated.current = false
            return
        }

        if (filteredParties.length > 0) {
            hasNavigated.current = true
            navigate(`/parties/${filteredParties[0].id}`, { replace: true })
        }
    }, [isRouteActive, filteredParties, navigate])

    const handleSelectParty = useCallback(
        (party: { id: string }) => navigate(`/parties/${party.id}`),
        [navigate]
    )

    const handleCreateNew = useCallback(
        () => navigate('/parties/new'),
        [navigate]
    )

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
        <ListDetailLayout
            title="Parties"
            stats={stats}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search parties..."
            filterComponent={
                <PartyFilter
                    filterType={filterType}
                    filterStatus={filterStatus}
                    filterBalance={filterBalance}
                    onFilterTypeChange={setFilterType}
                    onFilterStatusChange={setFilterStatus}
                    onFilterBalanceChange={setFilterBalance}
                    onClearFilters={clearFilters}
                />
            }
            listComponent={
                <PartyList
                    parties={filteredParties}
                    selectedParty={
                        id ? parties.find((p) => p.id === id) || null : null
                    }
                    onSelectParty={handleSelectParty}
                />
            }
            emptyIcon={<Users />}
            emptyTitle={
                parties.length === 0 ? 'No parties yet' : 'No parties found'
            }
            emptyDescription={
                parties.length === 0
                    ? 'Create your first party to get started'
                    : 'Try adjusting your search or filters'
            }
            hasItems={filteredParties.length > 0}
            onCreateNew={handleCreateNew}
            createButtonLabel="Add Party"
            isRouteActive={isRouteActive}
        />
    )
})

export default function PartiesPage() {
    return (
        <SuspenseWithPerf
            fallback={
                <div className="h-full flex flex-col">
                    <div className="border-b space-y-3 p-2">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                        <div className="flex gap-3 sm:gap-4">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                    </div>
                    <div className="flex-1 flex min-h-0">
                        <div className="hidden md:flex w-80 border-r flex-col">
                            <div className="p-3 sm:p-4 border-b">
                                <Skeleton className="h-10 w-full" />
                            </div>
                            <div className="flex-1 p-2 space-y-2">
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        </div>
                        <div className="flex-1 md:hidden p-2 space-y-2">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                        <div className="hidden md:block flex-1">
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
