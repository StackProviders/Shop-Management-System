import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WARRANTY_PERIODS } from '@/config/warranty-periods'
import type { CustomWarrantyPeriod } from '@/features/items/types/settings'

interface StandaloneWarrantyInputProps {
    value?: { label: string; days: number }
    onChange: (value: { label: string; days: number } | undefined) => void
    availablePeriods: string[]
    customPeriods?: CustomWarrantyPeriod[]
}

export function StandaloneWarrantyInput({
    value,
    onChange,
    availablePeriods = [],
    customPeriods = []
}: StandaloneWarrantyInputProps) {
    const [open, setOpen] = useState(false)

    const allPeriods = [
        ...WARRANTY_PERIODS.filter((p) => availablePeriods?.includes(p.value)),
        ...(customPeriods || [])
    ]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    className={cn(
                        'h-9 w-full justify-between border-0 px-2',
                        !value && 'text-muted-foreground'
                    )}
                >
                    <span className="truncate">{value?.label || 'Select'}</span>
                    <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No warranty found.</CommandEmpty>
                        <CommandGroup>
                            {allPeriods.map((period) => (
                                <CommandItem
                                    key={period.label}
                                    value={period.label}
                                    onSelect={() => {
                                        onChange({
                                            label: period.label,
                                            days: period.days
                                        })
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 size-4',
                                            value?.label === period.label
                                                ? 'opacity-100'
                                                : 'opacity-0'
                                        )}
                                    />
                                    {period.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
