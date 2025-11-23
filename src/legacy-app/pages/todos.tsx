import { TodoList, TodoForm } from '@/features/todo'
import { Card } from '@/components/ui/card'

export default function TodosPage() {
    return (
        <div className="max-w-2xl mx-auto p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Todos</h1>
                <p className="text-muted-foreground">Manage your tasks</p>
            </div>

            <Card className="p-4">
                <TodoForm />
            </Card>

            <TodoList />
        </div>
    )
}
