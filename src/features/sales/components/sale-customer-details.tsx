import { useMemo } from 'react'
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
import { CustomerAutocomplete } from './customer-autocomplete'
import { type SaleFormData } from '../validations'
import { type Party } from '@/features/parties/types'
import { cn, formatCurrency } from '@/lib/utils'

interface SaleCustomerDetailsProps {
    customers: Party[]
}

export function SaleCustomerDetails({ customers }: SaleCustomerDetailsProps) {
    const form = useFormContext<SaleFormData>()

    // Watch for customer name to conditionally show billing address
    const selectedPartyId = form.watch('partyId')
    const selectedParty = useMemo(
        () => customers.find((c) => c.id === selectedPartyId),
        [customers, selectedPartyId]
    )

    const showBillingAddress = !!selectedPartyId

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-3">
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
                                    <CustomerAutocomplete
                                        value={
                                            form.getValues('partyName') ||
                                            customers.find(
                                                (c) => c.id === field.value
                                            )?.name ||
                                            ''
                                        }
                                        customers={customers}
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
                                                customer.contactInfo?.phone ||
                                                    ''
                                            )
                                            form.setValue(
                                                'billingAddress',
                                                customer.contactInfo?.address ||
                                                    ''
                                            )
                                        }}
                                        placeholder="Search Customer..."
                                        className="h-9"
                                    />
                                </FormControl>
                                <FieldError errors={[fieldState.error]} />
                            </FieldContent>

                            {/* Selected Party Summary - Compact Balance Display */}
                            {selectedParty && (
                                <div className="text-[10px] items-center gap-1 flex mt-0.5">
                                    <span className="text-muted-foreground font-medium">
                                        BAL:
                                    </span>
                                    <span
                                        className={cn(
                                            'font-medium',
                                            selectedParty.balance > 0
                                                ? 'text-emerald-600'
                                                : 'text-destructive'
                                        )}
                                    >
                                        {formatCurrency(
                                            Math.abs(selectedParty.balance)
                                        )}
                                        {selectedParty.balance !== 0 &&
                                            (selectedParty.balance > 0
                                                ? ' Cr'
                                                : ' Dr')}
                                    </span>
                                </div>
                            )}
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
