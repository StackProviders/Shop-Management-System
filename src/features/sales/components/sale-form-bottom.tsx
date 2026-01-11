import { Button } from '@/components/ui/button'
import {
    FileText,
    Image as ImageIcon,
    X,
    ChevronsUpDown,
    Save
} from 'lucide-react'
import { FormField } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { NumberInput } from '@/components/common'
import { formatCurrency } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import type { SaleFormData } from '../validations'
import { useState } from 'react'
import { useShopContext } from '@/features/shop'
import { useItemSettings } from '@/features/items'
import { cn } from '@/lib/utils'

interface SaleFormBottomProps {
    subtotal: number
    taxType: 'none' | 'percent'
    setTaxType: (type: 'none' | 'percent') => void
    discountAmount: number
    taxAmount: number
    finalTotal: number
    dueAmount: number
    isSubmitting: boolean
}

export function SaleFormBottom({
    subtotal,
    taxType,
    setTaxType,
    discountAmount,
    taxAmount,
    finalTotal,
    dueAmount,
    isSubmitting
}: SaleFormBottomProps) {
    const { control, setValue } = useFormContext<SaleFormData>()
    const [showDescription, setShowDescription] = useState(false)

    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { settings } = useItemSettings(shopId)

    // Check if tax is enabled in settings
    const isTaxEnabled = settings?.taxEnabled ?? false

    return (
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
                                control={control}
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
                                onClick={() => setShowDescription(false)}
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
                </div>

                {/* Bottom Right: Totals */}
                <div className="w-full md:w-2/3 space-y-4">
                    {/* Discount */}
                    <div className="flex items-center justify-end gap-4 text-sm">
                        <span className="text-muted-foreground w-24">
                            Discount
                        </span>
                        <div className="flex items-center justify-end gap-2 w-48">
                            <FormField
                                control={control}
                                name="discountType"
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-[70px] h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="percent">
                                                %
                                            </SelectItem>
                                            <SelectItem value="flat">
                                                Flat
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <FormField
                                control={control}
                                name="discount"
                                render={({ field }) => (
                                    <NumberInput
                                        className="w-20 text-right h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        {...field}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            <div className="w-20 text-right font-medium">
                                - {formatCurrency(discountAmount)}
                            </div>
                        </div>
                    </div>

                    {/* Tax - Conditional Rendering */}
                    {isTaxEnabled && (
                        <div className="flex items-center justify-end gap-4 text-sm">
                            <span className="text-muted-foreground w-24">
                                Tax
                            </span>
                            <div className="flex items-center justify-end gap-2 w-48">
                                <Select
                                    value={taxType}
                                    onValueChange={(
                                        val: 'none' | 'percent'
                                    ) => {
                                        setTaxType(val)
                                        if (val === 'none') {
                                            setValue('taxRate', 0)
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-[70px] h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">
                                            None
                                        </SelectItem>
                                        <SelectItem value="percent">
                                            %
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {taxType === 'percent' ? (
                                    <FormField
                                        control={control}
                                        name="taxRate"
                                        render={({ field }) => (
                                            <NumberInput
                                                className="w-20 text-right h-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                {...field}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                ) : (
                                    <div className="w-20" />
                                )}

                                <div className="w-20 text-right font-medium">
                                    + {formatCurrency(taxAmount)}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border-t my-4" />

                    {/* Received Amount */}
                    <div className="flex items-center justify-end gap-4">
                        <span className="text-sm font-medium w-32 text-muted-foreground">
                            Received Amount
                        </span>
                        <FormField
                            control={control}
                            name="paidAmount"
                            render={({ field }) => (
                                <div className="relative w-40">
                                    <NumberInput
                                        className="pr-4 text-right font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        {...field}
                                        onChange={field.onChange}
                                    />
                                </div>
                            )}
                        />
                    </div>

                    {/* Due Amount (Conditional) */}
                    {dueAmount > 0 && (
                        <div className="flex items-center justify-end gap-4 text-destructive animate-in fade-in slide-in-from-top-1">
                            <span className="text-sm font-medium w-32">
                                Due Amount
                            </span>
                            <div className="w-40 text-right pr-4 text-base font-bold">
                                {formatCurrency(dueAmount)}
                            </div>
                        </div>
                    )}

                    {/* Total Payable - Prominent at Bottom */}
                    <div className="flex items-center justify-end gap-4 pt-2">
                        <span className="text-sm font-bold w-32">
                            Total Payable
                        </span>
                        <div className="w-40 text-right pr-4 text-xl font-bold tracking-tight">
                            {formatCurrency(finalTotal)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 flex justify-end gap-4">
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        'Saving...'
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" /> Save
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
