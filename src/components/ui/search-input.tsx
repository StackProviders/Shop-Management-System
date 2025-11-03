import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface SearchInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        'value' | 'onChange'
    > {
    value: string
    onValueChange: (value: string) => void
    onClear?: () => void
    wrapperClassName?: string
}

export function SearchInput({
    value,
    onValueChange,
    onClear,
    className,
    wrapperClassName,
    placeholder = 'Search...',
    ...props
}: SearchInputProps) {
    const handleClear = () => {
        onValueChange('')
        onClear?.()
    }

    return (
        <div className={cn('relative', wrapperClassName)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                placeholder={placeholder}
                className={cn('px-5', className)}
                {...props}
            />
            {value !== '' && (
                <button
                    onClick={handleClear}
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 size-7 inline-flex items-center justify-center rounded-md hover:bg-accent transition-colors"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    )
}
