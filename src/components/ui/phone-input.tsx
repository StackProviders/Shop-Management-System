import * as React from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type PhoneInputProps = Omit<
    React.ComponentProps<'input'>,
    'onChange' | 'value' | 'ref'
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
        onChange?: (value: RPNInput.Value) => void
    }

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<
        React.ElementRef<typeof RPNInput.default>,
        PhoneInputProps
    >(({ className, onChange, value, ...props }, ref) => {
        return (
            <RPNInput.default
                ref={ref}
                className={cn('flex', className)}
                flagComponent={FlagComponent}
                countrySelectComponent={CountrySelect}
                inputComponent={InputComponent}
                smartCaret={false}
                defaultCountry="BD"
                countries={['BD']}
                value={value || undefined}
                /**
                 * Handles the onChange event.
                 *
                 * react-phone-number-input might trigger the onChange event as undefined
                 * when a valid phone number is not entered. To prevent this,
                 * the value is coerced to an empty string.
                 *
                 * @param {E164Number | undefined} value - The entered value
                 */
                onChange={(value) =>
                    onChange?.(value || ('' as RPNInput.Value))
                }
                {...props}
            />
        )
    })
PhoneInput.displayName = 'PhoneInput'

const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
    return (
        <span
            className={cn(
                'relative inline-flex w-full rounded-lg border border-input bg-background bg-clip-padding text-base/5 shadow-xs ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:has-not-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:border-ring has-focus-visible:ring-[3px] has-disabled:opacity-64 has-aria-invalid:border-destructive/36 has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 sm:text-sm dark:bg-input/32 dark:not-in-data-[slot=group]:bg-clip-border dark:not-has-disabled:has-not-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/8%)] dark:has-aria-invalid:ring-destructive/24 [&:has(:disabled,:focus-visible,[aria-invalid])]:shadow-none',
                className
            )}
        >
            <input
                ref={ref}
                className="w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] py-[calc(--spacing(1.5)-1px)] outline-none placeholder:text-muted-foreground/64"
                maxLength={12}
                {...props}
            />
        </span>
    )
})
InputComponent.displayName = 'InputComponent'

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
    disabled?: boolean
    value: RPNInput.Country
    options: CountryEntry[]
    onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({ value: selectedCountry }: CountrySelectProps) => {
    return (
        <Button
            type="button"
            variant="outline"
            className="flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 pointer-events-none"
            disabled
        >
            <FlagComponent
                country={selectedCountry}
                countryName={selectedCountry}
            />
        </Button>
    )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country]

    return (
        <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
            {Flag && <Flag title={countryName} />}
        </span>
    )
}

export { PhoneInput }
