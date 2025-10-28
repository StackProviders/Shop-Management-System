import { useState } from 'react'
import { toast } from 'sonner'
import { todoApi } from '../api/todo.api'
import { useTodoStore } from './use-todo-store'
import { CreateTodoData, UpdateTodoData, Todo } from '../types'

export function useTodoActions() {
    const [loading, setLoading] = useState(false)
    const { addItemOptimistic, updateItemOptimistic, deleteItemOptimistic } =
        useTodoStore()

    const createTodo = async (data: CreateTodoData) => {
        const tempId = `temp-${Date.now()}`
        const optimisticTodo: Todo = {
            id: tempId,
            title: data.title,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        setLoading(true)
        addItemOptimistic(optimisticTodo)
        const toastId = toast.loading('Creating todo...')

        try {
            await todoApi.create(data)
            toast.success('Todo created', { id: toastId })
        } catch (error) {
            deleteItemOptimistic(tempId)
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            toast.error(message, { id: toastId })
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateTodo = async (id: string, data: UpdateTodoData) => {
        const toastId = toast.loading('Updating...')
        updateItemOptimistic(id, data)

        try {
            await todoApi.update(id, data)
            toast.success('Todo updated', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    const deleteTodo = async (id: string) => {
        const toastId = toast.loading('Deleting...')
        deleteItemOptimistic(id)

        try {
            await todoApi.delete(id)
            toast.success('Todo deleted', { id: toastId })
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete'
            toast.error(message, { id: toastId })
            throw error
        }
    }

    return {
        createTodo,
        updateTodo,
        deleteTodo,
        loading
    }
}
