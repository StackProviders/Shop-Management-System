import { useMemo, useState } from 'react'

export function useSearchFilter<T extends Record<string, unknown>>(
    items: T[],
    searchKeys: string[]
) {
    const [search, setSearch] = useState('')

    const filtered = useMemo(() => {
        if (!search) return items
        const lowerSearch = search.toLowerCase()
        return items.filter((item) =>
            searchKeys.some((key) =>
                String(item[key]).toLowerCase().includes(lowerSearch)
            )
        )
    }, [items, search, searchKeys])

    return { search, setSearch, filtered }
}
