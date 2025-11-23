'use client'

import { useEffect, useMemo, useRef, useCallback, memo, ReactNode } from 'react'
import { useRouter, useParams, usePathname } from 'next/navigation'
import { useShopContext } from '@/features/shop'
import {
    usePartiesByShop,
    usePartyFilters,
    PartyList,
    PartyFilter
} from '@/features/parties'
import { SuspenseWithPerf } from 'reactfire'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, Store, Plus } from 'lucide-react'
import {
    ListDetailRoot,
    ListDetailHeader,
    ListDetailHeaderContent,
    ListDetailHeaderTitle,
    ListDetailHeaderActions,
    ListDetailStats,
    ListDetailStat,
    ListDetailBody,
    ListDetailList,
    ListDetailListHeader,
    ListDetailListContent,
    ListDetailContent
} from '@/components/ui/list-detail-layout'
import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/ui/search-input'
import { useIsMobile } from '@/hooks/use-mobile'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from '@/components/ui/empty'

interface PartiesLayoutProps {
    children?: ReactNode
}

const PartiesLayout = memo(function PartiesLayout({
    children
}: PartiesLayoutProps) {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string
    const pathname = usePathname()
    const isMobile = useIsMobile()
    const { currentShop } = useShopContext()
    const shopId = useMemo(
        () => currentShop?.shopId || '',
        [currentShop?.shopId]
    )

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
            pathname === '/parties/new' ||
            pathname.includes('/edit'),
        [id, pathname]
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
            router.replace(`/parties/${filteredParties[0].id}`)
        }
    }, [isRouteActive, filteredParties, router])

    const handleSelectParty = useCallback(
        (party: { id: string }) => router.push(`/parties/${party.id}`),
        [router]
    )

    const handleCreateNew = useCallback(
        () => router.push('/parties/new?fromParties=true'),
        [router]
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
        <ListDetailRoot>
            <ListDetailHeader isRouteActive={isRouteActive}>
                <ListDetailHeaderContent>
                    <div className="flex items-center gap-2">
                        <Users className="size-5 text-primary" />
                        <ListDetailHeaderTitle>Parties</ListDetailHeaderTitle>
                    </div>
                    <ListDetailHeaderActions>
                        <Button
                            variant="default"
                            size={isMobile ? 'xs' : 'sm'}
                            onClick={handleCreateNew}
                        >
                            <Plus className="size-4" />
                            <span className="hidden xs:inline">Add Party</span>
                        </Button>
                    </ListDetailHeaderActions>
                </ListDetailHeaderContent>
                <ListDetailStats>
                    {stats.map((stat, index) => (
                        <ListDetailStat
                            key={index}
                            label={stat.label}
                            value={stat.value}
                        />
                    ))}
                </ListDetailStats>
            </ListDetailHeader>

            <ListDetailBody>
                <ListDetailList isRouteActive={isRouteActive}>
                    <ListDetailListHeader>
                        <div className="flex gap-2">
                            <SearchInput
                                value={searchQuery}
                                onValueChange={setSearchQuery}
                                placeholder="Search parties..."
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
                    </ListDetailListHeader>

                    <ListDetailListContent>
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
                                onSelectParty={handleSelectParty}
                            />
                        )}
                    </ListDetailListContent>
                </ListDetailList>

                <ListDetailContent isRouteActive={isRouteActive}>
                    {children}
                </ListDetailContent>
            </ListDetailBody>
        </ListDetailRoot>
    )
})

export default function PartiesPage({ children }: { children?: ReactNode }) {
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
            <PartiesLayout>{children}</PartiesLayout>
        </SuspenseWithPerf>
    )
}
