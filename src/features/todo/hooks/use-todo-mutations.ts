import { useCrudOperations } from '@/features/shared'
import { Todo } from '../types'

export function useTodoMutations() {
    const { create, update, remove } = useCrudOperations<Todo>('todos', '')

    return {
        createTodo: create,
        updateTodo: update,
        deleteTodo: remove
    }
}
