import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { saleSchema, type SaleFormData } from '../validations'
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { Item } from '@/features/items'
import { SaleItemsTable } from './sale-items-table'
import { SaleCustomerDetails } from './sale-customer-details'
import { SaleInvoiceDetails } from './sale-invoice-details'
import { useSaleItemsStore } from '../stores/sale-items-store'
import { useShopContext } from '@/features/shop'
import { usePartiesByShop } from '@/features/parties/hooks/use-party-queries'
import { Button } from '@/components/ui/button'
import {
    FileText,
    Image as ImageIcon,
    File,
    X,
    ChevronsUpDown
} from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

interface SaleFormProps {
    items: Item[]
    onSubmit: (data: SaleFormData) => Promise<void>
}

export function SaleForm({ items, onSubmit }: SaleFormProps) {
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { parties } = usePartiesByShop(shopId)
    const saleItems = useSaleItemsStore((state) => state.items)
    const [date, setDate] = useState<Date>(new Date())
    const [showDescription, setShowDescription] = useState(false)

    // Generate a default invoice number (simple timestamp based for now)
    const defaultInvoiceNumber = useMemo(
        () => `INV-${Math.floor(100000 + Math.random() * 900000)}`,
        []
    )

    const form = useForm<SaleFormData>({
        resolver: zodResolver(saleSchema),
        defaultValues: {
            invoiceNumber: defaultInvoiceNumber,
            items: [],
            discount: 0,
            paymentStatus: 'unpaid',
            notes: '',
            customerPhone: '',
            billingAddress: ''
        }
    })

    const customers = useMemo(
        () => parties?.filter((p) => p.type === 'customer') || [],
        [parties]
    )

    const handleSubmit = async (data: SaleFormData) => {
        await onSubmit({ ...data, items: saleItems })
    }

    const subtotal = saleItems.reduce((sum, item) => sum + item.total, 0)
    const discountPercent = form.watch('discount') || 0
    const discountAmount = (subtotal * discountPercent) / 100

    // Tax state (local for now)
    const [taxRate, setTaxRate] = useState(0)
    const taxAmount = ((subtotal - discountAmount) * taxRate) / 100

    // Round off state
    const [roundOffEnabled, setRoundOffEnabled] = useState(false)
    const [roundOffAmount, setRoundOffAmount] = useState(0)

    const rawTotal = subtotal - discountAmount + taxAmount

    // Calculate final total based on round off
    let finalTotal = rawTotal
    if (roundOffEnabled) {
        // If user enters a manual round off adjustment
        finalTotal = rawTotal + roundOffAmount
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-0 h-full flex flex-col"
            >
                {/* Top Section */}
                <div className="bg-muted/10 p-3 space-y-4">
                    <div className="flex flex-col md:flex-row gap-5 justify-between">
                        {/* Left: Customer Selection & Details */}
                        <SaleCustomerDetails customers={customers} />

                        {/* Right: Invoice Details */}
                        <SaleInvoiceDetails date={date} setDate={setDate} />
                    </div>
                </div>

                {/* Middle Section: Items Table */}
                <div className="flex-1 overflow-auto bg-muted/5 p-3 min-h-[300px]">
                    <SaleItemsTable items={items} />
                </div>

                {/* Bottom Section */}
                <div className="bg-background border-t p-3">
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Bottom Left: Actions */}
                        <div className="w-full md:w-1/3 space-y-2">
                            {!showDescription ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full justify-start text-muted-foreground h-10"
                                    onClick={() => setShowDescription(true)}
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    ADD DESCRIPTION
                                </Button>
                            ) : (
                                <div className="relative">
                                    <FormField
                                        control={form.control}
                                        name="notes"
                                        render={({ field }) => (
                                            <Textarea
                                                placeholder="Add notes..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-1 right-1 h-6 w-6"
                                        onClick={() =>
                                            setShowDescription(false)
                                        }
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            )}

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full justify-start text-muted-foreground h-10"
                            >
                                <ImageIcon className="mr-2 h-4 w-4" />
                                ADD IMAGE
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full justify-start text-muted-foreground h-10"
                            >
                                <File className="mr-2 h-4 w-4" />
                                ADD DOCUMENT
                            </Button>
                        </div>

                        {/* Bottom Right: Totals */}
                        <div className="w-full md:w-2/3 space-y-3">
                            {/* Discount */}
                            <div className="flex items-center justify-end gap-4">
                                <span className="text-sm">Discount</span>
                                <div className="flex items-center gap-2">
                                    <FormField
                                        control={form.control}
                                        name="discount"
                                        render={({ field }) => (
                                            <div className="relative w-20">
                                                <Input
                                                    type="number"
                                                    className="pr-6 text-right"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                                <span className="absolute right-2 top-2.5 text-xs text-muted-foreground">
                                                    (%)
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <div className="relative w-24">
                                        <Input
                                            type="number"
                                            readOnly
                                            value={discountAmount.toFixed(2)}
                                            className="pr-6 text-right bg-muted/50"
                                        />
                                        <span className="absolute right-2 top-2.5 text-xs text-muted-foreground">
                                            (₹)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Tax */}
                            <div className="flex items-center justify-end gap-4">
                                <span className="text-sm">Tax</span>
                                <div className="flex items-center gap-2">
                                    <Select
                                        value={taxRate.toString()}
                                        onValueChange={(val) =>
                                            setTaxRate(Number(val))
                                        }
                                    >
                                        <SelectTrigger className="w-20">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">
                                                NONE
                                            </SelectItem>
                                            <SelectItem value="18">
                                                GST 18%
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="w-24 text-right pr-2 text-sm">
                                        {taxAmount.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {/* Round Off */}
                            <div className="flex items-center justify-end gap-4">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="roundOff"
                                        checked={roundOffEnabled}
                                        onCheckedChange={(c) =>
                                            setRoundOffEnabled(!!c)
                                        }
                                    />
                                    <label
                                        htmlFor="roundOff"
                                        className="text-sm cursor-pointer select-none"
                                    >
                                        Round Off
                                    </label>
                                </div>
                                <Input
                                    type="number"
                                    value={roundOffAmount}
                                    onChange={(e) =>
                                        setRoundOffAmount(
                                            Number(e.target.value)
                                        )
                                    }
                                    disabled={!roundOffEnabled}
                                    className="w-20 text-right h-8"
                                />
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-end gap-4 border-t pt-3">
                                <span className="text-base font-semibold">
                                    Total
                                </span>
                                <div className="w-48 text-right">
                                    <Input
                                        readOnly
                                        value={finalTotal.toFixed(2)}
                                        className="text-right text-lg font-bold border-none bg-transparent shadow-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="bg-background border-t p-4 flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="min-w-[100px] text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                        Share <ChevronsUpDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                        type="submit"
                        className="min-w-[100px] bg-blue-600 hover:bg-blue-700"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}
