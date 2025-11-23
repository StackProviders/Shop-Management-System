import { ReactNode, useMemo, useState, useCallback } from 'react'
import { useRouter, useParams, usePathname } from 'next/navigation'
import {
    ListDetailRoot,
    ListDetailHeader,
    ListDetailHeaderContent,
    ListDetailHeaderTitle,
    ListDetailBody,
    ListDetailList,
    ListDetailListHeader,
    ListDetailListContent,
    ListDetailContent
} from '@/components/ui/list-detail-layout'
import { SearchInput } from '@/components/ui/search-input'
import { Button } from '@/components/ui/button'
import {
    Empty,
    EmptyHeader,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from '@/components/ui/empty'
import { Plus } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

interface ListDetailPageProps<
    T extends Record<string, unknown> & { id: string }
> {
    title?: string
    icon?: ReactNode
    items: T[]
    searchKeys: string[]
    renderItem: (item: T, isSelected: boolean) => ReactNode
    onItemClick: (item: T) => void
    createPath: string
    headerActions?: ReactNode
    listHeader?: ReactNode
    filters?: ReactNode
    stats?: Array<{ label: string; value: number }>
    emptyIcon?: ReactNode
    emptyTitle?: string
    emptyDescription?: string
    children?: ReactNode
}

export function ListDetailPage<
    T extends Record<string, unknown> & { id: string }
>({
    title,
    icon,
    items,
    searchKeys,
    renderItem,
    onItemClick,
    createPath,
    headerActions,
    listHeader,
    filters,
    stats,
    emptyIcon,
    emptyTitle = 'No items found',
    emptyDescription = 'Create your first item to get started',
    children
}: ListDetailPageProps<T>) {
    const router = useRouter()
    const params = useParams()
    const id = params?.id as string
    const pathname = usePathname()
    const [search, setSearch] = useState('')
    const isMobile = useIsMobile()

    const isRouteActive = useMemo(
        () => !!id || pathname.includes('/new') || pathname.includes('/edit'),
        [id, pathname]
    )

    const filtered = useMemo(() => {
        if (!search) return items
        return items.filter((item) =>
            searchKeys.some((key) =>
                String(item[key]).toLowerCase().includes(search.toLowerCase())
            )
        )
    }, [items, search, searchKeys])

    const handleCreate = useCallback(() => {
        router.push(createPath)
    }, [router, createPath])

    return (
        <ListDetailRoot>
            <ListDetailHeader isRouteActive={isRouteActive}>
                <ListDetailHeaderContent>
                    {(title || icon) && (
                        <div className="flex items-center gap-2">
                            {icon}
                            {title && (
                                <ListDetailHeaderTitle>
                                    {title}
                                </ListDetailHeaderTitle>
                            )}
                        </div>
                    )}
                    {headerActions}
                    <Button
                        onClick={handleCreate}
                        size={isMobile ? 'sm' : 'default'}
                    >
                        <Plus className="size-4" />
                        {!isMobile && <span className="ml-1">Add Item</span>}
                    </Button>
                </ListDetailHeaderContent>
                {stats && (
                    <div className="flex gap-4 px-4 pb-3">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-xs text-muted-foreground">
                                    {stat.label}
                                </span>
                                <span className="text-lg font-semibold">
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </ListDetailHeader>

            <ListDetailBody>
                <ListDetailList isRouteActive={isRouteActive}>
                    <ListDetailListHeader>
                        <SearchInput
                            value={search}
                            onValueChange={setSearch}
                            placeholder={`Search ${title?.toLowerCase() || 'items'}...`}
                        />
                        {filters}
                    </ListDetailListHeader>

                    <ListDetailListContent>
                        {filtered.length === 0 ? (
                            <div className="p-4">
                                <Empty>
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            {emptyIcon}
                                        </EmptyMedia>
                                        <EmptyTitle>{emptyTitle}</EmptyTitle>
                                        <EmptyDescription>
                                            {emptyDescription}
                                        </EmptyDescription>
                                    </EmptyHeader>
                                </Empty>
                            </div>
                        ) : (
                            <>
                                {listHeader}
                                {filtered.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => onItemClick(item)}
                                    >
                                        {renderItem(item, id === item.id)}
                                    </div>
                                ))}
                            </>
                        )}
                    </ListDetailListContent>
                </ListDetailList>

                <ListDetailContent isRouteActive={isRouteActive}>
                    {children}
                </ListDetailContent>
            </ListDetailBody>
        </ListDetailRoot>
    )
}
