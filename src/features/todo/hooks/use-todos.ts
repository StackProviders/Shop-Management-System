import { useEffect } from 'react'
import { todoApi, todoQueries } from '../api/todo.api'
import { useTodoStore } from './use-todo-store'

export function useTodos() {
    const items = useTodoStore((state) => state.items)
    const isLoading = useTodoStore((state) => state.isLoading)
    const error = useTodoStore((state) => state.error)

    useEffect(() => {
        useTodoStore.getState().setLoading(true)

        const unsubscribe = todoApi.subscribe(
            todoQueries.all(),
            (data) => {
                useTodoStore.getState().setItems(data)
                useTodoStore.getState().setLoading(false)
                useTodoStore.getState().setError(null)
            },
            (err) => {
                useTodoStore.getState().setError(err.message)
                useTodoStore.getState().setLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    return {
        todos: items,
        isLoading,
        error
    }
}
