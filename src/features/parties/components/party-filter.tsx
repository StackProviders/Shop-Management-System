import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Filter } from 'lucide-react'

interface PartyFilterProps {
    filterType: string[]
    filterStatus: string[]
    filterBalance: string[]
    onFilterTypeChange: (types: string[]) => void
    onFilterStatusChange: (statuses: string[]) => void
    onFilterBalanceChange: (balances: string[]) => void
    onClearFilters: () => void
}

export function PartyFilter({
    filterType,
    filterStatus,
    filterBalance,
    onFilterTypeChange,
    onFilterStatusChange,
    onFilterBalanceChange,
    onClearFilters
}: PartyFilterProps) {
    const activeFiltersCount =
        filterType.length + filterStatus.length + filterBalance.length

    const toggleFilter = (
        value: string,
        current: string[],
        onChange: (values: string[]) => void
    ) => {
        if (current.includes(value)) {
            onChange(current.filter((v) => v !== value))
        } else {
            onChange([...current, value])
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 relative overflow-visible"
                >
                    <Filter className="size-4" />
                    <span className="sr-only">Filter</span>
                    {activeFiltersCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] rounded-full"
                        >
                            {activeFiltersCount}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 sm:w-60" align="end" sideOffset={8}>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-sm">
                            Filter Options
                        </h4>
                        {activeFiltersCount > 0 && (
                            <Button
                                variant="ghost"
                                size="xs"
                                onClick={onClearFilters}
                                className="h-auto"
                            >
                                Clear all
                            </Button>
                        )}
                    </div>

                    <div className="space-y-3">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Type
                        </Label>
                        <div className="space-y-2.5">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="customer"
                                    checked={filterType.includes('customer')}
                                    onCheckedChange={() =>
                                        toggleFilter(
                                            'customer',
                                            filterType,
                                            onFilterTypeChange
                                        )
                                    }
                                />
                                <Label
                                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed block peer-disabled:opacity-70"
                                    htmlFor="customer"
                                >
                                    Customer
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="supplier"
                                    checked={filterType.includes('supplier')}
                                    onCheckedChange={() =>
                                        toggleFilter(
                                            'supplier',
                                            filterType,
                                            onFilterTypeChange
                                        )
                                    }
                                />
                                <Label
                                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="supplier"
                                >
                                    Supplier
                                </Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Status
                        </Label>
                        <div className="space-y-2.5">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="active"
                                    checked={filterStatus.includes('active')}
                                    onCheckedChange={() =>
                                        toggleFilter(
                                            'active',
                                            filterStatus,
                                            onFilterStatusChange
                                        )
                                    }
                                />
                                <Label
                                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="active"
                                >
                                    Active
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="inactive"
                                    checked={filterStatus.includes('inactive')}
                                    onCheckedChange={() =>
                                        toggleFilter(
                                            'inactive',
                                            filterStatus,
                                            onFilterStatusChange
                                        )
                                    }
                                />
                                <Label
                                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="inactive"
                                >
                                    Inactive
                                </Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Balance
                        </Label>
                        <div className="space-y-2.5">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="due"
                                    checked={filterBalance.includes('due')}
                                    onCheckedChange={() =>
                                        toggleFilter(
                                            'due',
                                            filterBalance,
                                            onFilterBalanceChange
                                        )
                                    }
                                />
                                <Label
                                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="due"
                                >
                                    Due (Negative)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="advance"
                                    checked={filterBalance.includes('advance')}
                                    onCheckedChange={() =>
                                        toggleFilter(
                                            'advance',
                                            filterBalance,
                                            onFilterBalanceChange
                                        )
                                    }
                                />
                                <Label
                                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="advance"
                                >
                                    Advance (Positive)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="settled"
                                    checked={filterBalance.includes('settled')}
                                    onCheckedChange={() =>
                                        toggleFilter(
                                            'settled',
                                            filterBalance,
                                            onFilterBalanceChange
                                        )
                                    }
                                />
                                <Label
                                    className="cursor-pointer text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="settled"
                                >
                                    Settled (Zero)
                                </Label>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
