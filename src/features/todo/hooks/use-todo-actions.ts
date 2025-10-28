import { useState } from 'react'
import { toast } from 'sonner'
import { todoApi } from '../api/todo.api'
import { CreateTodoData, UpdateTodoData } from '../types'

export function useTodoActions() {
    const [loading, setLoading] = useState(false)

    const createTodo = async (data: CreateTodoData) => {
        setLoading(true)
        try {
            await todoApi.create(data)
            toast.success('Todo created')
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to create todo'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateTodo = async (id: string, data: UpdateTodoData) => {
        setLoading(true)
        try {
            await todoApi.update(id, data)
            toast.success('Todo updated')
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update todo'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteTodo = async (id: string) => {
        setLoading(true)
        try {
            await todoApi.delete(id)
            toast.success('Todo deleted')
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete todo'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        createTodo,
        updateTodo,
        deleteTodo,
        loading
    }
}
