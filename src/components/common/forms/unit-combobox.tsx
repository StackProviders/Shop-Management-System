'use client'

import { useMemo, useState } from 'react'
import { FormCombobox } from './form-fields'
import { UnitForm } from '@/features/items/components/unit-form'
import { useUnits } from '@/features/items/hooks/use-units'
import { useShopContext } from '@/features/shop'
import { UNITS } from '@/config/units'
import type { FieldValues, Path } from 'react-hook-form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
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

interface UnitComboboxProps<T extends FieldValues> {
    name: Path<T>
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    className?: string
}

export function UnitCombobox<T extends FieldValues>({
    name,
    label = 'Unit',
    placeholder = 'Select unit',
    required,
    disabled,
    className
}: UnitComboboxProps<T>) {
    const [showUnitModal, setShowUnitModal] = useState(false)
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { units: customUnits } = useUnits(shopId)

    const unitOptions = useMemo(() => {
        const defaultUnits = UNITS.map((unit) => ({
            value: unit.id,
            label: `${unit.fullName} (${unit.shortName})`
        }))
        const shopUnits = customUnits.map((unit) => ({
            value: unit.id,
            label: `${unit.fullName} (${unit.shortName})`
        }))
        return [...defaultUnits, ...shopUnits]
    }, [customUnits])

    return (
        <>
            <FormCombobox
                name={name}
                label={label}
                placeholder={placeholder}
                searchPlaceholder="Search units..."
                options={unitOptions}
                onAddNew={() => setShowUnitModal(true)}
                addNewLabel="Add New Unit"
                required={required}
                disabled={disabled}
                className={className}
            />
            <UnitForm open={showUnitModal} onOpenChange={setShowUnitModal} />
        </>
    )
}

interface StandaloneUnitComboboxProps {
    value: string
    onChange: (value: string) => void
    shopId: string
    className?: string
}

export function StandaloneUnitCombobox({
    value,
    onChange,
    shopId,
    className
}: StandaloneUnitComboboxProps) {
    const [open, setOpen] = useState(false)
    const [showUnitModal, setShowUnitModal] = useState(false)
    const { units: customUnits } = useUnits(shopId)

    const unitOptions = useMemo(() => {
        const defaultUnits = UNITS.map((unit) => ({
            value: unit.id,
            label: `${unit.fullName} (${unit.shortName})`
        }))
        const shopUnits = customUnits.map((unit) => ({
            value: unit.id,
            label: `${unit.fullName} (${unit.shortName})`
        }))
        return [...defaultUnits, ...shopUnits]
    }, [customUnits])

    const displayValue =
        unitOptions.find((opt) => opt.value === value)?.label || 'Select unit'

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn(
                            'w-full justify-between border-0 focus:ring-0 h-9',
                            className
                        )}
                    >
                        <span className="truncate">{displayValue}</span>
                        <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder="Search units..." />
                        <CommandList>
                            <CommandEmpty>No unit found.</CommandEmpty>
                            <CommandGroup>
                                {unitOptions.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={() => {
                                            onChange(option.value)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                'mr-2 size-4',
                                                value === option.value
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            )}
                                        />
                                        <span className="truncate">
                                            {option.label}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                        <div className="border-t" />
                        <div className="p-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => {
                                    setShowUnitModal(true)
                                    setOpen(false)
                                }}
                            >
                                <span className="mr-2">+</span>
                                Add New Unit
                            </Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
            <UnitForm open={showUnitModal} onOpenChange={setShowUnitModal} />
        </>
    )
}
