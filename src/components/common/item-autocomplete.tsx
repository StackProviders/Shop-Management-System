import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { Item } from '@/features/items'
import { formatCurrency } from '@/lib/utils'

interface ItemAutocompleteProps {
    value: string
    items: Item[]
    onSelect: (item: Item) => void
    onSelectCallback?: (item: Item) => void
    onManualInput?: (name: string) => void
    placeholder?: string
    className?: string
    showAddButton?: boolean
}

export function ItemAutocomplete({
    value,
    items,
    onSelect,
    onSelectCallback,
    onManualInput,
    placeholder = 'Item Name',
    className,
    showAddButton = true
}: ItemAutocompleteProps) {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [search, setSearch] = useState(value)
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const inputRef = useRef<HTMLInputElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )

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

    const handleSelect = (item: Item) => {
        setSearch(item.name)
        onSelect(item)
        setShowSuggestions(false)
        inputRef.current?.focus()
        onSelectCallback?.(item)
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
            <div ref={inputRef}>
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
                />
            </div>
            {showSuggestions &&
                createPortal(
                    <div
                        ref={panelRef}
                        className="fixed bg-background border border-border rounded-md shadow-lg z-[9999] w-[min(calc(100vw-2rem),700px)]"
                        style={{
                            top: `${position.top}px`,
                            left: `${Math.max(8, Math.min(position.left, window.innerWidth - 716))}px`
                        }}
                    >
                        <div className="flex items-center gap-4 px-4 py-2.5 bg-muted/20 border-b text-xs font-medium text-muted-foreground uppercase">
                            <div className="flex-1">Item Name</div>
                            <div className="w-24 text-right">Sale Price</div>
                            <div className="w-32 text-right">
                                Purchase Price
                            </div>
                            <div className="w-20 text-right">Stock</div>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                            {filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => handleSelect(item)}
                                        className="w-full flex items-center gap-4 px-4 py-2.5 text-sm hover:bg-accent/30 transition-colors focus:outline-none focus:bg-accent/30 border-b border-border/50 last:border-b-0"
                                    >
                                        <div className="flex-1 text-left font-medium text-foreground truncate">
                                            {item.name}
                                        </div>
                                        <div className="w-24 text-right text-foreground">
                                            {formatCurrency(
                                                item.salePrice || 0
                                            )}
                                        </div>
                                        <div className="w-32 text-right text-foreground">
                                            {formatCurrency(
                                                item.purchasePrice || 0
                                            )}
                                        </div>
                                        <div
                                            className="w-20 text-right font-medium"
                                            style={{
                                                color:
                                                    (item.currentStock ?? 0) ===
                                                    0
                                                        ? '#ef4444'
                                                        : '#10b981'
                                            }}
                                        >
                                            {item.currentStock ?? 0}
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-4 text-center text-muted-foreground text-sm">
                                    No items found
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
                                        window.open('/items/new', '_blank')
                                    }
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Item
                                </Button>
                            </div>
                        )}
                    </div>,
                    document.body
                )}
        </>
    )
}
