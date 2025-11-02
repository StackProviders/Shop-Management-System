import { memo, useCallback, useState } from 'react'
import { useFormContext, Controller, FieldValues, Path } from 'react-hook-form'
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
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

interface BaseFieldProps<T extends FieldValues> {
    name: Path<T>
    label?: string
    description?: string
    required?: boolean
    orientation?: 'vertical' | 'horizontal' | 'responsive'
    className?: string
}

// FormInput
interface FormInputProps<T extends FieldValues> extends BaseFieldProps<T> {
    type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url'
    placeholder?: string
    disabled?: boolean
}

export const FormInput = memo(function FormInput<T extends FieldValues>({
    name,
    label,
    description,
    required,
    orientation = 'vertical',
    type = 'text',
    placeholder,
    disabled,
    className
}: FormInputProps<T>) {
    const { control } = useFormContext<T>()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                const handleChange = useCallback(
                    (e: React.ChangeEvent<HTMLInputElement>) => {
                        const value =
                            type === 'number'
                                ? e.target.value === ''
                                    ? ''
                                    : Number(e.target.value)
                                : e.target.value
                        field.onChange(value)
                    },
                    [field, type]
                )

                return (
                    <Field
                        orientation={orientation}
                        data-invalid={!!error}
                        className={className}
                    >
                        {label && (
                            <FieldLabel htmlFor={name}>
                                {label}
                                {required && (
                                    <span className="text-destructive">*</span>
                                )}
                            </FieldLabel>
                        )}
                        <Input
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            disabled={disabled}
                            aria-invalid={!!error}
                            value={field.value ?? ''}
                            onChange={handleChange}
                        />
                        {description && (
                            <FieldDescription>{description}</FieldDescription>
                        )}
                        {error && (
                            <FieldError>{error.message as string}</FieldError>
                        )}
                    </Field>
                )
            }}
        />
    )
}) as <T extends FieldValues>(props: FormInputProps<T>) => React.ReactElement

// FormTextarea
interface FormTextareaProps<T extends FieldValues> extends BaseFieldProps<T> {
    placeholder?: string
    rows?: number
    disabled?: boolean
}

export function FormTextarea<T extends FieldValues>({
    name,
    label,
    description,
    required,
    orientation = 'vertical',
    placeholder,
    rows = 3,
    disabled,
    className
}: FormTextareaProps<T>) {
    const { control } = useFormContext<T>()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Field
                    orientation={orientation}
                    data-invalid={!!error}
                    className={className}
                >
                    {label && (
                        <FieldLabel htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </FieldLabel>
                    )}
                    <Textarea
                        {...field}
                        id={name}
                        placeholder={placeholder}
                        rows={rows}
                        disabled={disabled}
                        aria-invalid={!!error}
                        value={field.value ?? ''}
                    />
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    {error && (
                        <FieldError>{error.message as string}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}

// FormSelect
interface FormSelectProps<T extends FieldValues> extends BaseFieldProps<T> {
    placeholder?: string
    options: Array<{ value: string; label: string }>
    disabled?: boolean
}

export function FormSelect<T extends FieldValues>({
    name,
    label,
    description,
    required,
    orientation = 'vertical',
    placeholder = 'Select...',
    options,
    disabled,
    className
}: FormSelectProps<T>) {
    const { control } = useFormContext<T>()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Field
                    orientation={orientation}
                    data-invalid={!!error}
                    className={className}
                >
                    {label && (
                        <FieldLabel htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </FieldLabel>
                    )}
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={disabled}
                    >
                        <SelectTrigger id={name} aria-invalid={!!error}>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    {error && (
                        <FieldError>{error.message as string}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}

// FormCheckbox
interface FormCheckboxProps<T extends FieldValues> extends BaseFieldProps<T> {
    disabled?: boolean
}

export function FormCheckbox<T extends FieldValues>({
    name,
    label,
    description,
    orientation = 'horizontal',
    disabled,
    className
}: FormCheckboxProps<T>) {
    const { control } = useFormContext<T>()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Field
                    orientation={orientation}
                    data-invalid={!!error}
                    className={className}
                >
                    <Checkbox
                        id={name}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={disabled}
                        aria-invalid={!!error}
                    />
                    {label && (
                        <FieldLabel htmlFor={name} className="font-normal">
                            {label}
                        </FieldLabel>
                    )}
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    {error && (
                        <FieldError>{error.message as string}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}

// FormRadioGroup
interface FormRadioGroupProps<T extends FieldValues> extends BaseFieldProps<T> {
    options: Array<{ value: string; label: string; description?: string }>
    disabled?: boolean
}

export function FormRadioGroup<T extends FieldValues>({
    name,
    label,
    description,
    required,
    options,
    disabled,
    className
}: FormRadioGroupProps<T>) {
    const { control } = useFormContext<T>()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Field data-invalid={!!error} className={className}>
                    {label && (
                        <FieldLabel>
                            {label}
                            {required && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </FieldLabel>
                    )}
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={disabled}
                    >
                        {options.map((option) => (
                            <Field key={option.value} orientation="horizontal">
                                <RadioGroupItem
                                    value={option.value}
                                    id={`${name}-${option.value}`}
                                />
                                <FieldLabel
                                    htmlFor={`${name}-${option.value}`}
                                    className="font-normal"
                                >
                                    {option.label}
                                </FieldLabel>
                                {option.description && (
                                    <FieldDescription>
                                        {option.description}
                                    </FieldDescription>
                                )}
                            </Field>
                        ))}
                    </RadioGroup>
                    {error && (
                        <FieldError>{error.message as string}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}

// FormCombobox
interface FormComboboxProps<T extends FieldValues> extends BaseFieldProps<T> {
    placeholder?: string
    searchPlaceholder?: string
    emptyText?: string
    options: Array<{ value: string; label: string }>
    disabled?: boolean
    buttonClassName?: string
    onAddNew?: () => void
    addNewLabel?: string
    multiple?: boolean
    clearable?: boolean
    maxSelected?: number
}

export const FormCombobox = memo(function FormCombobox<T extends FieldValues>({
    name,
    label,
    description,
    required,
    orientation = 'vertical',
    placeholder = 'Select...',
    searchPlaceholder = 'Search...',
    emptyText = 'No results found.',
    options,
    disabled,
    className,
    buttonClassName,
    onAddNew,
    addNewLabel = 'Add new',
    multiple = false,
    clearable = true,
    maxSelected
}: FormComboboxProps<T>) {
    const { control } = useFormContext<T>()
    const [open, setOpen] = useState(false)

    const getDisplayValue = useCallback(
        (value: string | string[]) => {
            if (!value || (Array.isArray(value) && value.length === 0))
                return placeholder

            if (multiple && Array.isArray(value)) {
                if (value.length === 1) {
                    return options.find((opt) => opt.value === value[0])?.label
                }
                if (value.length <= 3) {
                    return value
                        .map(
                            (v) => options.find((opt) => opt.value === v)?.label
                        )
                        .filter(Boolean)
                        .join(', ')
                }
                const lastThree = value.slice(-3)
                const labels = lastThree
                    .map((v) => options.find((opt) => opt.value === v)?.label)
                    .filter(Boolean)
                    .join(', ')
                return `${labels}, Etc`
            }

            return (
                options.find((opt) => opt.value === value)?.label || placeholder
            )
        },
        [options, placeholder, multiple]
    )

    const handleSelect = useCallback(
        (field: any, selectedValue: string) => {
            if (multiple) {
                const currentValues = Array.isArray(field.value)
                    ? field.value
                    : []
                const isSelected = currentValues.includes(selectedValue)

                if (isSelected) {
                    field.onChange(
                        currentValues.filter((v: string) => v !== selectedValue)
                    )
                } else {
                    if (maxSelected && currentValues.length >= maxSelected)
                        return
                    field.onChange([...currentValues, selectedValue])
                }
            } else {
                const newValue =
                    clearable && field.value === selectedValue
                        ? ''
                        : selectedValue
                field.onChange(newValue)
                setOpen(false)
            }
        },
        [multiple, clearable, maxSelected]
    )

    const isSelected = useCallback(
        (field: any, value: string) => {
            if (multiple && Array.isArray(field.value)) {
                return field.value.includes(value)
            }
            return field.value === value
        },
        [multiple]
    )

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Field
                    orientation={orientation}
                    data-invalid={!!error}
                    className={className}
                >
                    {label && (
                        <FieldLabel htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </FieldLabel>
                    )}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                aria-invalid={!!error}
                                disabled={disabled}
                                className={cn(
                                    'w-full justify-between',
                                    !field.value && 'text-muted-foreground',
                                    buttonClassName
                                )}
                            >
                                <span className="truncate">
                                    {getDisplayValue(field.value)}
                                </span>
                                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            <Command>
                                <CommandInput placeholder={searchPlaceholder} />
                                <CommandList>
                                    <CommandEmpty>{emptyText}</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.value}
                                                onSelect={() =>
                                                    handleSelect(
                                                        field,
                                                        option.value
                                                    )
                                                }
                                            >
                                                {multiple ? (
                                                    <Checkbox
                                                        checked={isSelected(
                                                            field,
                                                            option.value
                                                        )}
                                                        className="mr-2"
                                                    />
                                                ) : (
                                                    <Check
                                                        className={cn(
                                                            'mr-2 size-4',
                                                            isSelected(
                                                                field,
                                                                option.value
                                                            )
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                )}
                                                <span
                                                    title={option.label}
                                                    className="truncate max-w-[200px] md:max-w-[250px]"
                                                >
                                                    {option.label}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                                {onAddNew && (
                                    <>
                                        <div className="border-t" />
                                        <div className="p-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="w-full justify-start"
                                                onClick={() => {
                                                    onAddNew()
                                                    setOpen(false)
                                                }}
                                            >
                                                <span className="mr-2">+</span>
                                                {addNewLabel}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </Command>
                        </PopoverContent>
                    </Popover>
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    {error && (
                        <FieldError>{error.message as string}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}) as <T extends FieldValues>(props: FormComboboxProps<T>) => React.ReactElement
