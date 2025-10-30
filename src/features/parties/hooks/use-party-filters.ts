import { useState, useMemo, useCallback } from 'react'
import type { Party } from '../types'

export function usePartyFilters(parties: Party[]) {
    const [searchQuery, setSearchQuery] = useState('')
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

    const clearFilters = useCallback(() => {
        setFilterType([])
        setFilterStatus([])
        setFilterBalance([])
    }, [])

    return {
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
    }
}
