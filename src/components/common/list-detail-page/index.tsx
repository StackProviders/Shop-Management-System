import { ReactNode, useMemo, useState, useCallback } from 'react'
import { useNavigate, useParams, useLocation } from '@tanstack/react-router'
import {
    ListDetailRoot,
    ListDetailHeader,
    ListDetailHeaderContent,
    ListDetailHeaderTitle,
    ListDetailHeaderActions,
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

interface ListDetailPageProps<
    T extends Record<string, unknown> & { id: string }
> {
    title: string
    icon?: ReactNode
    items: T[]
    searchKeys: string[]
    renderItem: (item: T, isSelected: boolean) => ReactNode
    onItemClick: (item: T) => void
    createPath: string
    headerActions?: ReactNode
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
    filters,
    stats,
    emptyIcon,
    emptyTitle = 'No items found',
    emptyDescription = 'Create your first item to get started',
    children
}: ListDetailPageProps<T>) {
    const navigate = useNavigate()
    const { id } = useParams({ strict: false })
    const { pathname } = useLocation()
    const [search, setSearch] = useState('')

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
        navigate({ to: createPath })
    }, [navigate, createPath])

    return (
        <ListDetailRoot>
            <ListDetailHeader isRouteActive={isRouteActive}>
                <ListDetailHeaderContent>
                    <div className="flex items-center gap-2">
                        {icon}
                        <ListDetailHeaderTitle>{title}</ListDetailHeaderTitle>
                    </div>
                    <ListDetailHeaderActions>
                        {headerActions}
                        <Button onClick={handleCreate} size="sm">
                            <Plus className="size-4 mr-1" />
                            Add New
                        </Button>
                    </ListDetailHeaderActions>
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
                            placeholder={`Search ${title.toLowerCase()}...`}
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
                            filtered.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => onItemClick(item)}
                                >
                                    {renderItem(item, id === item.id)}
                                </div>
                            ))
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
