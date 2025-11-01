import { addDays, endOfDay, startOfDay } from 'date-fns'
import type { ExtendedColumnFilter, JoinOperator } from '@/types/data-table'

export function filterData<TData extends Record<string, unknown>>(
    data: TData[],
    filters: ExtendedColumnFilter<TData>[],
    joinOperator: JoinOperator
): TData[] {
    if (filters.length === 0) return data

    return data.filter((item) => {
        const results = filters.map((filter) => matchesFilter(item, filter))
        return joinOperator === 'and'
            ? results.every((r) => r)
            : results.some((r) => r)
    })
}

function matchesFilter<TData extends Record<string, unknown>>(
    item: TData,
    filter: ExtendedColumnFilter<TData>
): boolean {
    const value = item[filter.id]

    switch (filter.operator) {
        case 'iLike':
            return (
                filter.variant === 'text' &&
                typeof filter.value === 'string' &&
                typeof value === 'string' &&
                value.toLowerCase().includes(filter.value.toLowerCase())
            )

        case 'notILike':
            return (
                filter.variant === 'text' &&
                typeof filter.value === 'string' &&
                typeof value === 'string' &&
                !value.toLowerCase().includes(filter.value.toLowerCase())
            )

        case 'eq':
            if (typeof filter.value === 'string' && filter.value === 'true')
                return value === true
            if (typeof filter.value === 'string' && filter.value === 'false')
                return value === false
            if (filter.variant === 'date' || filter.variant === 'dateRange') {
                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                const filterDate = new Date(Number(filter.value))
                return itemDate.toDateString() === filterDate.toDateString()
            }
            return value === filter.value

        case 'ne':
            if (typeof filter.value === 'string' && filter.value === 'true')
                return value !== true
            if (typeof filter.value === 'string' && filter.value === 'false')
                return value !== false
            if (filter.variant === 'date' || filter.variant === 'dateRange') {
                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                const filterDate = new Date(Number(filter.value))
                return itemDate.toDateString() !== filterDate.toDateString()
            }
            return value !== filter.value

        case 'inArray':
            return (
                Array.isArray(filter.value) &&
                filter.value.includes(value as string)
            )

        case 'notInArray':
            return (
                Array.isArray(filter.value) &&
                !filter.value.includes(value as unknown as string)
            )

        case 'lt':
            if (filter.variant === 'number' || filter.variant === 'range')
                return Number(value) < Number(filter.value)
            if (filter.variant === 'date' && typeof filter.value === 'string') {
                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                const filterDate = new Date(Number(filter.value))
                return itemDate < filterDate
            }
            return false

        case 'lte':
            if (filter.variant === 'number' || filter.variant === 'range')
                return Number(value) <= Number(filter.value)
            if (filter.variant === 'date' && typeof filter.value === 'string') {
                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                const filterDate = new Date(Number(filter.value))
                return itemDate <= filterDate
            }
            return false

        case 'gt':
            if (filter.variant === 'number' || filter.variant === 'range')
                return Number(value) > Number(filter.value)
            if (filter.variant === 'date' && typeof filter.value === 'string') {
                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                const filterDate = new Date(Number(filter.value))
                return itemDate > filterDate
            }
            return false

        case 'gte':
            if (filter.variant === 'number' || filter.variant === 'range')
                return Number(value) >= Number(filter.value)
            if (filter.variant === 'date' && typeof filter.value === 'string') {
                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                const filterDate = new Date(Number(filter.value))
                return itemDate >= filterDate
            }
            return false

        case 'isBetween':
            if (
                (filter.variant === 'date' || filter.variant === 'dateRange') &&
                Array.isArray(filter.value) &&
                filter.value.length === 2
            ) {
                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                const start = filter.value[0]
                    ? new Date(Number(filter.value[0]))
                    : null
                const end = filter.value[1]
                    ? new Date(Number(filter.value[1]))
                    : null
                if (start && end) return itemDate >= start && itemDate <= end
                if (start) return itemDate >= start
                if (end) return itemDate <= end
                return true
            }

            if (
                (filter.variant === 'number' || filter.variant === 'range') &&
                Array.isArray(filter.value) &&
                filter.value.length === 2
            ) {
                const numValue = Number(value)
                const first =
                    filter.value[0] && filter.value[0].trim() !== ''
                        ? Number(filter.value[0])
                        : null
                const second =
                    filter.value[1] && filter.value[1].trim() !== ''
                        ? Number(filter.value[1])
                        : null

                if (first !== null && second !== null)
                    return numValue >= first && numValue <= second
                if (first !== null) return numValue === first
                if (second !== null) return numValue === second
            }
            return false

        case 'isRelativeToToday':
            if (
                (filter.variant === 'date' || filter.variant === 'dateRange') &&
                typeof filter.value === 'string'
            ) {
                const today = new Date()
                const [amount, unit] = filter.value.split(' ') ?? []
                if (!amount || !unit) return false

                let startDate: Date
                let endDate: Date

                switch (unit) {
                    case 'days':
                        startDate = startOfDay(
                            addDays(today, Number.parseInt(amount, 10))
                        )
                        endDate = endOfDay(startDate)
                        break
                    case 'weeks':
                        startDate = startOfDay(
                            addDays(today, Number.parseInt(amount, 10) * 7)
                        )
                        endDate = endOfDay(addDays(startDate, 6))
                        break
                    case 'months':
                        startDate = startOfDay(
                            addDays(today, Number.parseInt(amount, 10) * 30)
                        )
                        endDate = endOfDay(addDays(startDate, 29))
                        break
                    default:
                        return false
                }

                const itemDate =
                    value instanceof Date
                        ? value
                        : new Date(value as string | number)
                return itemDate >= startDate && itemDate <= endDate
            }
            return false

        case 'isEmpty':
            return (
                value === null ||
                value === undefined ||
                value === '' ||
                (Array.isArray(value) && value.length === 0)
            )

        case 'isNotEmpty':
            return !(
                value === null ||
                value === undefined ||
                value === '' ||
                (Array.isArray(value) && value.length === 0)
            )

        default:
            return true
    }
}
