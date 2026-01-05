import { useState, useRef, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { Party } from '@/features/parties/types'
import { formatCurrency } from '@/lib/utils'

interface CustomerAutocompleteProps {
    value: string
    customers: Party[]
    onSelect: (customer: Party) => void
    onManualInput?: (name: string) => void
    placeholder?: string
    className?: string
    showAddButton?: boolean
}

export function CustomerAutocomplete({
    value,
    customers,
    onSelect,
    onManualInput,
    placeholder = 'Search customer...',
    className,
    showAddButton = true
}: CustomerAutocompleteProps) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [search, setSearch] = useState(value)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const inputRef = useRef<HTMLInputElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)

    const filteredCustomers = useMemo(() => {
        const lowerSearch = search.toLowerCase()
        return customers.filter(
            (customer) =>
                customer.name.toLowerCase().includes(lowerSearch) ||
                customer.contactInfo?.phone?.toLowerCase().includes(lowerSearch)
        )
    }, [customers, search])

    const updatePosition = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect()
            setPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX
            })
        }
    }

    const handleFocus = () => {
        updatePosition()
        setShowSuggestions(true)
    }

    const handleSelect = (customer: Party) => {
        setSearch(customer.name)
        onSelect(customer)
        setShowSuggestions(false)
    }

    useEffect(() => {
        setSearch(value)
    }, [value])

    useEffect(() => {
        if (!showSuggestions) return

        const handleClickOutside = (e: MouseEvent) => {
            if (
                !inputRef.current?.contains(e.target as Node) &&
                !panelRef.current?.contains(e.target as Node)
            ) {
                setShowSuggestions(false)
            }
        }

        const handleScroll = () => updatePosition()

        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('scroll', handleScroll, true)
        window.addEventListener('resize', handleScroll)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('scroll', handleScroll, true)
            window.removeEventListener('resize', handleScroll)
        }
    }, [showSuggestions])

    return (
        <>
            <div ref={inputRef} className="w-full">
                <Input
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        onManualInput?.(e.target.value)
                        updatePosition()
                        setShowSuggestions(true)
                    }}
                    onFocus={handleFocus}
                    className={className}
                    autoComplete="off"
                />
            </div>
            {showSuggestions &&
                createPortal(
                    <div
                        ref={panelRef}
                        className="fixed bg-background border border-border rounded-md shadow-lg z-[9999] w-[min(calc(100vw-2rem),400px)]"
                        style={{
                            top: `${position.top}px`,
                            left: `${Math.max(8, Math.min(position.left, window.innerWidth - 516))}px`
                        }}
                    >
                        <div className="flex items-center gap-4 px-4 py-2.5 bg-muted/20 border-b text-xs font-medium text-muted-foreground uppercase">
                            <div className="flex-1">Customer Name</div>
                            <div className="w-24 text-right">Phone</div>
                            <div className="w-24 text-right">Balance</div>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <button
                                        key={customer.id}
                                        type="button"
                                        onClick={() => handleSelect(customer)}
                                        className="w-full flex items-center gap-4 px-4 py-2.5 text-sm hover:bg-accent/30 transition-colors focus:outline-none focus:bg-accent/30 border-b border-border/50 last:border-b-0"
                                    >
                                        <div className="flex-1 text-left font-medium text-foreground truncate">
                                            {customer.name}
                                        </div>
                                        <div className="w-24 text-right text-muted-foreground text-xs">
                                            {customer.contactInfo?.phone || '-'}
                                        </div>
                                        <div className="w-24 text-right">
                                            <span
                                                className={
                                                    customer.balance > 0
                                                        ? 'text-emerald-600'
                                                        : 'text-muted-foreground'
                                                }
                                            >
                                                {formatCurrency(
                                                    Math.abs(customer.balance)
                                                )}
                                                {customer.balance !== 0 && (
                                                    <span className="text-[10px] ml-1 px-1 rounded bg-muted">
                                                        {customer.balance > 0
                                                            ? 'Cr'
                                                            : 'Dr'}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-muted-foreground text-sm">
                                    No customers found
                                </div>
                            )}
                        </div>
                        {showAddButton && (
                            <div className="border-t p-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() =>
                                        window.open('/parties/create', '_blank')
                                    }
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New Customer
                                </Button>
                            </div>
                        )}
                    </div>,
                    document.body
                )}
        </>
    )
}
