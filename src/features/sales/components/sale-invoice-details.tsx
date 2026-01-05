import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { SaleFormData } from '../validations'
import { FormField } from '@/components/ui/form'

interface SaleInvoiceDetailsProps {
    date: Date
    setDate: (date: Date) => void
}

export function SaleInvoiceDetails({ date, setDate }: SaleInvoiceDetailsProps) {
    const { control } = useFormContext<SaleFormData>()

    return (
        <div className="flex flex-col gap-3 min-w-[250px]">
            <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Invoice Number
                </span>
                <div className="relative w-full max-w-[150px]">
                    <FormField
                        control={control}
                        name="invoiceNumber"
                        render={({ field }) => (
                            <div className="relative">
                                <Input
                                    {...field}
                                    className="h-8 text-right bg-transparent border-none focus-visible:ring-0 px-0"
                                />
                                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
                            </div>
                        )}
                    />
                </div>
            </div>
            <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                    Invoice Date
                </span>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={'ghost'}
                            className={cn(
                                'w-full max-w-[150px] justify-end text-left font-normal h-8 px-0 hover:bg-transparent',
                                !date && 'text-muted-foreground'
                            )}
                        >
                            {date ? (
                                format(date, 'dd/MM/yyyy')
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-2 size-4 opacity-80 text-primary" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(d) => d && setDate(d)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
