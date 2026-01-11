import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

export function NumberInput({
    value,
    onChange,
    className,
    ...props
}: {
    value: number
    onChange: (value: number) => void
} & Omit<React.ComponentProps<typeof Input>, 'value' | 'onChange'>) {
    const [inputValue, setInputValue] = useState(
        value === undefined || value === null ? '' : value.toString()
    )

    useEffect(() => {
        // Sync local state if parent value changes externally
        // But exclude changes that match the current parsed local value to avoid cursor jumps/formatting loss
        if (Number(inputValue) !== value) {
            setInputValue(value.toString())
        }
        // If the value is 0 and locally it's empty string, we want to keep it empty
        // logic above: Number("") is 0. So if value is 0, 0 !== 0 is false.
        // So it won't force "0" if we have "".
    }, [value, inputValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        if (newValue === '') {
            onChange(0)
        } else {
            onChange(Number(newValue))
        }
    }

    return (
        <Input
            type="number"
            value={inputValue}
            onChange={handleChange}
            className={className}
            {...props}
        />
    )
}
