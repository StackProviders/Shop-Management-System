import { useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Party } from '../types'

interface PartyListProps {
    parties: Party[]
    selectedParty: Party | null
    onSelectParty: (party: Party) => void
}

export function PartyList({
    parties,
    selectedParty,
    onSelectParty
}: PartyListProps) {
    const [sortBy, setSortBy] = useState<'name' | 'balance'>('name')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const sortedParties = [...parties].sort((a, b) => {
        if (sortBy === 'name') {
            return sortOrder === 'asc'
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        }
        return sortOrder === 'asc'
            ? a.balance - b.balance
            : b.balance - a.balance
    })

    const toggleSort = (field: 'name' | 'balance') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground border-b">
                <button
                    onClick={() => toggleSort('name')}
                    className="flex-1 text-left hover:text-foreground"
                >
                    Party Name{' '}
                    {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => toggleSort('balance')}
                    className="w-24 text-right hover:text-foreground"
                >
                    Amount{' '}
                    {sortBy === 'balance' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>

            <div className="space-y-1">
                {sortedParties.map((party) => (
                    <button
                        key={party.id}
                        onClick={() => onSelectParty(party)}
                        className={cn(
                            'w-full px-4 py-3 flex flex-col gap-2 hover:bg-accent transition-colors text-left',
                            selectedParty?.id === party.id && 'bg-accent'
                        )}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <span className="font-medium truncate">
                                    {party.name}
                                </span>
                                <Badge
                                    variant={
                                        party.type === 'customer'
                                            ? 'primary'
                                            : 'secondary'
                                    }
                                    className="shrink-0 capitalize"
                                    size="xs"
                                >
                                    {party.type}
                                </Badge>
                            </div>
                            <span
                                className={cn(
                                    'font-semibold text-sm shrink-0',
                                    party.balance > 0
                                        ? 'text-green-600'
                                        : party.balance < 0
                                          ? 'text-red-600'
                                          : 'text-muted-foreground'
                                )}
                            >
                                {formatCurrency(party.balance)}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
