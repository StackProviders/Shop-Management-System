import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const categorySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional()
})

type FormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
    onSubmit: (data: FormData) => Promise<void>
    formId: string
}

export function CategoryForm({ onSubmit, formId }: CategoryFormProps) {
    const form = useForm<FormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: '',
            description: ''
        }
    })

    return (
        <Form {...form}>
            <form
                id={formId}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name *</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter category name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} rows={2} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
