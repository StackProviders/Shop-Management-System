import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from 'lucide-react'
import { useTodos } from '../hooks/use-todos'
import { useTodoActions } from '../hooks/use-todo-actions'
import { cn } from '@/lib/utils'

export function TodoList() {
    const { todos, isLoading, error, refresh } = useTodos()
    const { updateTodo, deleteTodo } = useTodoActions()

    const handleToggle = async (id: string, completed: boolean) => {
        await updateTodo(id, { completed: !completed })
        refresh()
    }

    const handleDelete = async (id: string) => {
        await deleteTodo(id)
        refresh()
    }

    if (isLoading) {
        return (
            <div className="space-y-2">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        )
    }

    if (error) {
        return (
            <Card className="p-6">
                <p className="text-destructive">Error loading todos</p>
            </Card>
        )
    }

    if (todos.length === 0) {
        return (
            <Card className="p-6 text-center">
                <p className="text-muted-foreground">
                    No todos yet. Create one to get started!
                </p>
            </Card>
        )
    }

    return (
        <div className="space-y-2">
            {todos.map((todo) => (
                <Card key={todo.id} className="p-4">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() =>
                                handleToggle(todo.id, todo.completed)
                            }
                        />
                        <span
                            className={cn(
                                'flex-1',
                                todo.completed &&
                                    'line-through text-muted-foreground'
                            )}
                        >
                            {todo.title}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(todo.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    )
}
