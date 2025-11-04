import { ReactNode } from 'react'
import { UseFormReturn, FieldValues } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface CrudFormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onSubmit: (data: T) => Promise<void>
    children: ReactNode
    submitLabel?: string
    cancelLabel?: string
    onCancel?: () => void
    isLoading?: boolean
}

export function CrudForm<T extends FieldValues>({
    form,
    onSubmit,
    children,
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
    onCancel,
    isLoading
}: CrudFormProps<T>) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {children}

                <div className="flex gap-2 justify-end pt-4">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                        >
                            {cancelLabel}
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={isLoading || form.formState.isSubmitting}
                    >
                        {(isLoading || form.formState.isSubmitting) && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {submitLabel}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
