import { Controller, useFormContext } from 'react-hook-form'
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
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { WARRANTY_PERIODS } from '@/config/warranty-periods'
import type { CustomWarrantyPeriod } from '../types/settings'

interface WarrantyInputProps {
    availablePeriods: string[]
    customPeriods?: CustomWarrantyPeriod[]
}

export function WarrantyInput({
    availablePeriods = [],
    customPeriods = []
}: WarrantyInputProps) {
    const { control } = useFormContext()
    const [open, setOpen] = useState(false)

    const allPeriods = [
        ...WARRANTY_PERIODS.filter((p) => availablePeriods?.includes(p.value)),
        ...(customPeriods || [])
    ]

    return (
        <Controller
            name="warranty"
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Field data-invalid={!!error}>
                    <FieldLabel>Warranty</FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    'w-full justify-between',
                                    !field.value && 'text-muted-foreground'
                                )}
                            >
                                <span className="truncate">
                                    {field.value?.label || 'Select warranty'}
                                </span>
                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder="Search warranty..." />
                                <CommandList>
                                    <CommandEmpty>
                                        No warranty found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {allPeriods.map((period) => (
                                            <CommandItem
                                                key={period.label}
                                                value={period.label}
                                                onSelect={() => {
                                                    field.onChange({
                                                        label: period.label,
                                                        days: period.days
                                                    })
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        'mr-2 size-4',
                                                        field.value?.label ===
                                                            period.label
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
                    {error && (
                        <FieldError>{error.message as string}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}
