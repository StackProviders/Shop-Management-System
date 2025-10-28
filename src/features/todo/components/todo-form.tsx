import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/button'
import { useTodoActions } from '../hooks/use-todo-actions'

const schema = z.object({
    title: z.string().min(1, 'Title is required')
})

type FormData = z.infer<typeof schema>

interface TodoFormProps {
    onSuccess?: () => void
}

export function TodoForm({ onSuccess }: TodoFormProps) {
    const { createTodo } = useTodoActions()

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { title: '' }
    })

    const onSubmit = async (data: FormData) => {
        await createTodo(data)
        form.reset()
        onSuccess?.()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Add a new todo..."
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SubmitButton loading={form.formState.isSubmitting}>
                    Add
                </SubmitButton>
            </form>
        </Form>
    )
}
