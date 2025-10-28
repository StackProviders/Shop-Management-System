import { useState } from 'react'
import { toast } from 'sonner'
import { todoApi } from '../api/todo.api'
import { useTodoStore } from './use-todo-store'
import { CreateTodoData, UpdateTodoData, Todo } from '../types'
import { useOnline } from '@/hooks/use-online'

export function useTodoActions() {
    const [loading, setLoading] = useState(false)
    const { addItemOptimistic, updateItemOptimistic, deleteItemOptimistic } =
        useTodoStore()
    const isOnline = useOnline()

    const createTodo = async (data: CreateTodoData) => {
        const tempId = `temp-${Date.now()}`
        const optimisticTodo: Todo = {
            id: tempId,
            title: data.title,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        if (isOnline) setLoading(true)
        addItemOptimistic(optimisticTodo)
        const toastId = isOnline ? toast.loading('Creating todo...') : null

        try {
            await todoApi.create(data)
            if (isOnline) {
                toast.success('Todo created', { id: toastId! })
            } else {
                toast.success('Todo saved (will sync when online)')
            }
        } catch (error) {
            deleteItemOptimistic(tempId)
            const message =
                error instanceof Error ? error.message : 'Failed to create'
            if (isOnline) {
                toast.error(message, { id: toastId! })
            } else {
                toast.error(message)
            }
            throw error
        } finally {
            if (isOnline) setLoading(false)
        }
    }

    const updateTodo = async (id: string, data: UpdateTodoData) => {
        const toastId = isOnline ? toast.loading('Updating...') : null
        updateItemOptimistic(id, data)

        try {
            await todoApi.update(id, data)
            if (isOnline) {
                toast.success('Todo updated', { id: toastId! })
            } else {
                toast.success('Todo updated (will sync when online)')
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update'
            if (isOnline) {
                toast.error(message, { id: toastId! })
            } else {
                toast.error(message)
            }
            throw error
        }
    }

    const deleteTodo = async (id: string) => {
        const toastId = isOnline ? toast.loading('Deleting...') : null
        deleteItemOptimistic(id)

        try {
            await todoApi.delete(id)
            if (isOnline) {
                toast.success('Todo deleted', { id: toastId! })
            } else {
                toast.success('Todo deleted (will sync when online)')
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete'
            if (isOnline) {
                toast.error(message, { id: toastId! })
            } else {
                toast.error(message)
            }
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
