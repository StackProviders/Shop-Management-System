import { FormCombobox } from '@/components/common'
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
    const predefinedOptions = WARRANTY_PERIODS.filter((period) =>
        availablePeriods?.includes(period.value)
    ).map((period) => ({
        value: period.value,
        label: period.label
    }))

    const customOptions = customPeriods.map((period, index) => ({
        value: `custom-${index}`,
        label: period.label
    }))

    const options = [...predefinedOptions, ...customOptions]

    return (
        <FormCombobox
            name="warrantyPeriod"
            label="Warranty Period"
            placeholder="Select warranty"
            searchPlaceholder="Search warranty..."
            options={options}
        />
    )
}
