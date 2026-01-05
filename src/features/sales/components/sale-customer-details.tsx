import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField, FormControl } from '@/components/ui/form'
import {
    Field,
    FieldContent,
    FieldError,
    FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Loader2 } from 'lucide-react'
import { CustomerAutocomplete } from './customer-autocomplete'
import { type SaleFormData } from '../validations'
import { type Party } from '@/features/parties/types'
import { cn, formatCurrency } from '@/lib/utils'
import { usePartyMutations } from '@/features/parties/hooks/use-party-mutations'
import { useShopContext } from '@/features/shop'
import { toast } from 'sonner'

interface SaleCustomerDetailsProps {
    customers: Party[]
}

export function SaleCustomerDetails({ customers }: SaleCustomerDetailsProps) {
    const form = useFormContext<SaleFormData>()
    const { currentShop } = useShopContext()
    const shopId = currentShop?.shopId || ''
    const { createParty } = usePartyMutations(shopId)
    const [isCreating, setIsCreating] = useState(false)

    // Watch values for conditional rendering
    const selectedPartyId = form.watch('partyId')
    const partyName = form.watch('partyName')
    const customerPhone = form.watch('customerPhone') // Watch phone for the add button logic too

    const selectedParty = useMemo(
        () => customers.find((c) => c.id === selectedPartyId),
        [customers, selectedPartyId]
    )

    // Show billing address if there is ANY text in the customer name field
    const showBillingAddress = !!partyName && partyName.trim().length > 0

    // Check if the entered phone number already exists
    const existingPhone = useMemo(
        () =>
            customerPhone &&
            customers.some((c) => c.contactInfo?.phone === customerPhone),
        [customers, customerPhone]
    )

    // Show add button if:
    // 1. There is input (name or phone)
    // 2. No existing customer is selected
    // 3. The entered phone number is NOT found in existing customers
    // Show add button if:
    // 1. Party name is provided
    // 2. Phone number is provided
    // 3. Phone number is unique (does not exist in customers)
    // 4. No existing customer is selected
    const showAddCustomerButton =
        !!partyName && !!customerPhone && !selectedPartyId && !existingPhone

    const handleAddCustomer = async () => {
        if (!partyName) {
            toast.error('Customer name is required')
            return
        }

        setIsCreating(true)
        try {
            const newParty = {
                name: partyName,
                type: 'customer' as const,
                contactInfo: {
                    phone: customerPhone || '',
                    address: form.getValues('billingAddress') || '',
                    email: ''
                },
                balance: 0,
                status: 'active' as const
            }

            const id = await createParty(newParty)

            // Set the partyId to the new ID
            // The autocomplete component receives the updated customers list eventually,
            // but we set the ID here to link the sale to the new party immediately.
            form.setValue('partyId', id)

            toast.success('Customer added successfully')
        } catch (error) {
            console.error('Failed to add customer:', error)
            // Error is already handled/toasted in mutate hook, but keeping generic log
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-end">
                {/* Customer Autocomplete */}
                <FormField
                    control={form.control}
                    name="partyId"
                    render={({ field, fieldState }) => (
                        <Field className="flex-1">
                            <div className="flex items-center gap-1">
                                <FieldLabel className="text-primary font-medium text-xs">
                                    Customer *
                                </FieldLabel>
                            </div>
                            <FieldContent>
                                <FormControl>
                                    <div className="relative w-full">
                                        <CustomerAutocomplete
                                            value={
                                                form.getValues('partyName') ||
                                                customers.find(
                                                    (c) => c.id === field.value
                                                )?.name ||
                                                ''
                                            }
                                            customers={customers}
                                            showAddButton={false}
                                            onSelect={(customer) => {
                                                form.setValue(
                                                    'partyId',
                                                    customer.id
                                                )
                                                form.setValue(
                                                    'partyName',
                                                    customer.name
                                                )
                                                form.setValue(
                                                    'customerPhone',
                                                    customer.contactInfo
                                                        ?.phone || ''
                                                )
                                                form.setValue(
                                                    'billingAddress',
                                                    customer.contactInfo
                                                        ?.address || ''
                                                )
                                            }}
                                            onManualInput={(value) => {
                                                form.setValue(
                                                    'partyName',
                                                    value
                                                )
                                                // Clear partyId if manual input changes to avoid mismatch
                                                if (
                                                    selectedParty &&
                                                    selectedParty.name !== value
                                                ) {
                                                    form.setValue(
                                                        'partyId',
                                                        undefined
                                                    )
                                                }
                                            }}
                                            placeholder="Search Customer..."
                                            className="h-9 pr-24"
                                        />
                                        {/* Selected Party Balance - Absolute Positioned */}
                                        {selectedParty && (
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] pointer-events-none flex items-center gap-1 bg-background/80 px-1 rounded">
                                                <span className="text-muted-foreground font-medium">
                                                    BAL:
                                                </span>
                                                <span
                                                    className={cn(
                                                        'font-medium',
                                                        selectedParty.balance >
                                                            0
                                                            ? 'text-success'
                                                            : 'text-destructive'
                                                    )}
                                                >
                                                    {formatCurrency(
                                                        Math.abs(
                                                            selectedParty.balance
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />

                {/* Phone Number */}
                <FormField
                    control={form.control}
                    name="customerPhone"
                    render={({ field, fieldState }) => (
                        <Field className="w-[180px]">
                            <FieldLabel className="text-muted-foreground font-normal text-xs">
                                Phone No.
                            </FieldLabel>
                            <FieldContent>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Phone No."
                                        className="h-9"
                                    />
                                </FormControl>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />

                {/* Add New Customer Button */}
                {showAddCustomerButton && (
                    <div className="pb-1">
                        <Button
                            type="button"
                            size="icon"
                            variant="default"
                            className="h-9 w-9 shrink-0 bg-primary/90 hover:bg-primary text-primary-foreground shadow-sm"
                            onClick={handleAddCustomer}
                            disabled={isCreating}
                            title="Add new customer"
                        >
                            {isCreating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                )}
            </div>

            {/* Billing Address - Conditionally Rendered */}
            {showBillingAddress && (
                <FormField
                    control={form.control}
                    name="billingAddress"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="text-muted-foreground font-normal text-xs">
                                Billing Address
                            </FieldLabel>
                            <FieldContent>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Enter Billing Address"
                                        className="min-h-[60px] resize-none"
                                    />
                                </FormControl>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>
                        </Field>
                    )}
                />
            )}
        </div>
    )
}
