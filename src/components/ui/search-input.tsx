import * as React from 'react'
import { Search, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const searchInputVariants = cva(
    'relative flex items-center text-muted-foreground focus-within:text-foreground',
    {
        variants: {
            size: {
                default: '[&_input]:h-9 [&_svg]:size-4',
                sm: '[&_input]:h-8 [&_input]:text-xs [&_svg]:size-3.5',
                lg: '[&_input]:h-10 [&_svg]:size-5'
            }
        },
        defaultVariants: {
            size: 'default'
        }
    }
)

export interface SearchInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        VariantProps<typeof searchInputVariants> {
    onValueChange?: (value: string) => void
    onClear?: () => void
    isLoading?: boolean
    wrapperClassName?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
    (
        {
            className,
            wrapperClassName,
            value,
            onChange,
            onValueChange,
            onClear,
            isLoading,
            size,
            placeholder = 'Search...',
            disabled,
            ...props
        },
        ref
    ) => {
        const handleClear = React.useCallback(() => {
            if (onValueChange) {
                onValueChange('')
            }
            // Create a synthetic event if onChange is provided but onValueChange isn't
            // This is a comprehensive fallback but ideally onValueChange is used
            if (onChange) {
                const event = {
                    target: { value: '' },
                    currentTarget: { value: '' }
                } as React.ChangeEvent<HTMLInputElement>
                onChange(event)
            }
            onClear?.()
        }, [onValueChange, onChange, onClear])

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange?.(e)
            onValueChange?.(e.target.value)
        }

        const showClear = value && value !== '' && !disabled && !isLoading

        return (
            <div
                className={cn(
                    searchInputVariants({ size }),
                    disabled && 'opacity-50 pointer-events-none',
                    wrapperClassName
                )}
            >
                <div className="absolute left-2.5 flex items-center justify-center pointer-events-none">
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <Search />
                    )}
                </div>
                <Input
                    ref={ref}
                    type="text"
                    className={cn(
                        'pl-9 pr-8 bg-background transition-shadow',
                        className
                    )}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...props}
                />
                {showClear && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-2 flex size-5 items-center justify-center rounded-full text-muted-foreground/70 hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Clear search"
                    >
                        <X className="size-3.5" />
                    </button>
                )}
            </div>
        )
    }
)
SearchInput.displayName = 'SearchInput'

export { SearchInput }
