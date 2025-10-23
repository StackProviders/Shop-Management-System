import { useRef, forwardRef } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, InputWrapper } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface SearchInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string
    onValueChange: (value: string) => void
    onClear?: () => void
    wrapperClassName?: string
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    (
        {
            value,
            onValueChange,
            onClear,
            className,
            wrapperClassName,
            placeholder = 'Search...',
            ...props
        },
        ref
    ) => {
        const inputRef = useRef<HTMLInputElement>(null)
        const finalRef = (ref as React.RefObject<HTMLInputElement>) || inputRef

        const handleClear = () => {
            onValueChange('')
            onClear?.()
            if (finalRef.current) {
                finalRef.current.focus()
            }
        }

        return (
            <InputWrapper className={cn('relative', wrapperClassName)}>
                <Search className="size-4" />
                <Input
                    ref={finalRef}
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    placeholder={placeholder}
                    className={className}
                    {...props}
                />
                <Button
                    onClick={handleClear}
                    variant="dim"
                    className="absolute right-0"
                    disabled={value === ''}
                    type="button"
                >
                    {value !== '' && <X size={16} />}
                </Button>
            </InputWrapper>
        )
    }
)

SearchInput.displayName = 'SearchInput'
