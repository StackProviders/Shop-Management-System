import { useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Item, ItemContent, ItemTitle, ItemActions } from '@/components/ui/item'
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
        <div className="w-full">
            <div className="flex items-center gap-3 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium text-muted-foreground border-b bg-muted/30">
                <button
                    onClick={() => toggleSort('name')}
                    className="flex-1 text-left hover:text-foreground transition-colors"
                >
                    Party Name{' '}
                    {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button
                    onClick={() => toggleSort('balance')}
                    className="text-right hover:text-foreground transition-colors"
                >
                    Amount{' '}
                    {sortBy === 'balance' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>

            <div className="w-full">
                {sortedParties.map((party) => (
                    <Item
                        key={party.id}
                        asChild
                        size="sm"
                        className={cn(
                            'w-full cursor-pointer hover:bg-accent border-b last:border-b-0',
                            selectedParty?.id === party.id && 'bg-accent'
                        )}
                    >
                        <button
                            onClick={() => onSelectParty(party)}
                            className="w-full"
                        >
                            <ItemContent className="flex-1 min-w-0">
                                <ItemTitle className="min-w-0 w-full">
                                    <span className="truncate min-w-0 flex-1 text-start">
                                        {party.name}
                                    </span>
                                    <Badge
                                        variant={
                                            party.type === 'customer'
                                                ? 'default'
                                                : 'secondary'
                                        }
                                        className="shrink-0 capitalize"
                                        size="sm"
                                    >
                                        {party.type}
                                    </Badge>
                                </ItemTitle>
                            </ItemContent>
                            <ItemActions className="shrink-0">
                                <span
                                    className={cn(
                                        'font-semibold text-xs sm:text-sm whitespace-nowrap tabular-nums',
                                        party.balance > 0
                                            ? 'text-green-600'
                                            : party.balance < 0
                                              ? 'text-red-600'
                                              : 'text-muted-foreground'
                                    )}
                                >
                                    {formatCurrency(party.balance)}
                                </span>
                            </ItemActions>
                        </button>
                    </Item>
                ))}
            </div>
        </div>
    )
}
