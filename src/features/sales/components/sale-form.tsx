import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { saleSchema, type SaleFormData } from '../validations'
import { CrudForm } from '@/components/common'
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
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
import { useSaleItemsStore } from '../stores/sale-items-store'

interface SaleFormProps {
    items: Item[]
    onSubmit: (data: SaleFormData) => Promise<void>
}

export function SaleForm({ items, onSubmit }: SaleFormProps) {
    const saleItems = useSaleItemsStore((state) => state.items)

    const form = useForm<SaleFormData>({
        resolver: zodResolver(saleSchema),
        defaultValues: {
            items: [],
            discount: 0,
            paymentStatus: 'unpaid',
            notes: ''
        }
    })

    const handleSubmit = async (data: SaleFormData) => {
        await onSubmit({ ...data, items: saleItems })
    }

    const subtotal = saleItems.reduce((sum, item) => sum + item.total, 0)
    const discount = form.watch('discount') || 0
    const total = subtotal - discount

    return (
        <CrudForm form={form} onSubmit={handleSubmit} submitLabel="Create Sale">
            <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="partyName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer Name (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter customer name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SaleItemsTable items={items} />

                <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span className="font-medium">
                            ₹{subtotal.toFixed(2)}
                        </span>
                    </div>
                    <FormField
                        control={form.control}
                        name="discount"
                        render={({ field }) => (
                            <div className="flex justify-between items-center">
                                <FormLabel className="text-sm">
                                    Discount (%):
                                </FormLabel>
                                <Input
                                    type="number"
                                    className="w-32"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />
                            </div>
                        )}
                    />
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total:</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="paymentStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Status</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="paid">
                                            Paid
                                        </SelectItem>
                                        <SelectItem value="unpaid">
                                            Unpaid
                                        </SelectItem>
                                        <SelectItem value="partial">
                                            Partial
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="cash">
                                            Cash
                                        </SelectItem>
                                        <SelectItem value="card">
                                            Card
                                        </SelectItem>
                                        <SelectItem value="upi">UPI</SelectItem>
                                        <SelectItem value="other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Add notes..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </CrudForm>
    )
}
