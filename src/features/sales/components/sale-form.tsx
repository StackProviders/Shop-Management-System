import { useState, useMemo, useEffect } from 'react'
import { toast } from 'sonner'
import { useForm, type FieldErrors } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { saleSchema, type SaleFormData } from '../validations'
import { Form } from '@/components/ui/form'
import type { Item } from '@/features/items'
import { SaleItemsTable } from './sale-items-table'
import { SaleCustomerDetails } from './sale-customer-details'
import { SaleInvoiceDetails } from './sale-invoice-details'
import { SaleFormBottom } from './sale-form-bottom'
import { useSaleItemsStore } from '../stores/sale-items-store'
import { useShopContext } from '@/features/shop'
import { usePartiesByShop } from '@/features/parties/hooks/use-party-queries'

interface SaleFormProps {
    items: Item[]
    onSubmit: (data: SaleFormData) => Promise<void>
}

export function SaleForm({ items, onSubmit }: SaleFormProps) {
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { parties } = usePartiesByShop(shopId)
    const saleItems = useSaleItemsStore((state) => state.items)
    // We need to sync store items to form manually or just use form for everything.
    // Given the architecture seems to split them, we will sync store -> form

    // Local state for date (invoice date)
    const [date, setDate] = useState<Date>(new Date())

    // Local state for tax type helper
    const [taxType, setTaxType] = useState<'none' | 'percent'>('none')

    // Generate a default invoice number
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
            discountType: 'percent',
            paymentStatus: 'unpaid',
            notes: '',
            customerPhone: '',
            billingAddress: '',
            paidAmount: 0,
            roundOff: 0,
            taxRate: 0
        }
    })

    const customers = useMemo(
        () => parties?.filter((p) => p.type === 'customer') || [],
        [parties]
    )

    // Sync Store Items to Form
    // This connects the zustand store (where the table likely updates) to the RHF state
    useEffect(() => {
        // We cast saleItems to the schema type. Ideally they should match exactly.
        // If the store has extra fields, they are ignored by the validation if not in schema,
        // but for strictness we trust the store produces valid items.
        form.setValue('items', saleItems as SaleFormData['items'], {
            shouldValidate: true
        })
    }, [saleItems, form])

    // Calculate Totals for Display & Logic
    // We can rely on the store values for calculation to keep it responsive
    const subtotal = saleItems.reduce((sum, item) => sum + (item.total || 0), 0)

    const discountValue = form.watch('discount') || 0
    const discountType = form.watch('discountType')
    const discountAmount =
        discountType === 'percent'
            ? (subtotal * discountValue) / 100
            : discountValue

    const taxRate = form.watch('taxRate') || 0
    // Tax is applied on (Subtotal - Discount) usually
    const taxableAmount = Math.max(0, subtotal - discountAmount)
    const taxAmount = (taxableAmount * taxRate) / 100

    const rawTotal = taxableAmount + taxAmount
    const finalTotal = Math.round(rawTotal)

    // Auto-update totals in form state before submit could be handled here,
    // but typically we recalculate on submit or rely on the form values being up to date.

    // Auto-fill paid amount if fully paid or just default logic
    // The previous code had a specific effect for this:
    const paymentStatus = form.watch('paymentStatus')
    useEffect(() => {
        if (paymentStatus === 'paid') {
            form.setValue('paidAmount', finalTotal)
        }
    }, [finalTotal, form, paymentStatus])

    const onFormSubmit = async (data: SaleFormData) => {
        // Final recalculation/verification to ensure data integrity
        const calculatedSubtotal = data.items.reduce(
            (sum, i) => sum + i.total,
            0
        )

        // Recalculate everything precisely to send clean data
        const currentDiscountAmount =
            data.discountType === 'percent'
                ? (calculatedSubtotal * data.discount) / 100
                : data.discount

        const currentTaxable = Math.max(
            0,
            calculatedSubtotal - currentDiscountAmount
        )
        const currentTax = taxType === 'none' ? 0 : data.taxRate || 0
        const currentTaxAmount = (currentTaxable * currentTax) / 100

        const expectedTotal = Math.round(currentTaxable + currentTaxAmount)
        const roundOff = expectedTotal - (currentTaxable + currentTaxAmount)

        // Determine Payment Status based on paidAmount vs Total
        // If user explicitly selected 'paid', we forcefully matched paidAmount above.
        // If partial/unpaid, we trust the paidAmount entered.

        const finalData: SaleFormData = {
            ...data,
            items: saleItems, // Taking from store ensures we have latest array
            roundOff: roundOff,
            taxRate: taxType === 'none' ? 0 : data.taxRate // Ensure 0 if disabled
            // If the user didn't touch the paid amount but status is unpaid, ensure 0?
            // The zod default is 0.
        }

        await onSubmit(finalData)
    }

    const onInvalid = (errors: FieldErrors<SaleFormData>) => {
        console.error('Validation Errors:', errors)
        const firstErrorKey = Object.keys(errors)[0]
        const message =
            errors[firstErrorKey as keyof SaleFormData]?.message ||
            errors.items?.message || // Check array error
            'Please check the form for errors'

        toast.error(`Validation Error: ${message}`)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onFormSubmit, onInvalid)}
                className="space-y-0 h-full flex flex-col"
            >
                {/* Top Section */}
                <div className="bg-muted/10 p-3 space-y-4">
                    <div className="flex flex-col md:flex-row gap-5 justify-between">
                        <SaleCustomerDetails customers={customers} />
                        <SaleInvoiceDetails date={date} setDate={setDate} />
                    </div>
                </div>

                {/* Middle Section: Items Table */}
                <div className="flex-1 overflow-auto bg-muted/5 p-3 min-h-[300px]">
                    <SaleItemsTable items={items} />
                    {/* Hidden input to ensure 'items' field is registered and validates? 
                        RHF registers via setValue, but sometimes a dummy Input helps if needed. 
                        For now relies on Sync Effect.
                    */}
                </div>

                {/* Bottom Section */}
                <SaleFormBottom
                    subtotal={subtotal}
                    taxType={taxType}
                    setTaxType={setTaxType}
                    discountAmount={discountAmount}
                    taxAmount={taxAmount}
                    finalTotal={finalTotal}
                    dueAmount={finalTotal - (form.watch('paidAmount') || 0)}
                    isSubmitting={form.formState.isSubmitting}
                />
            </form>
        </Form>
    )
}
