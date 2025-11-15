import { useMemo, useState } from 'react'
import { FormCombobox } from './form-fields'
import { UnitForm } from '@/features/items/components/unit-form'
import { useUnits } from '@/features/items/hooks/use-units'
import { useShopContext } from '@/features/shop'
import { UNITS } from '@/config/units'
import type { FieldValues, Path } from 'react-hook-form'

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
