import {
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { toast } from 'sonner'
import { CreateTodoData, UpdateTodoData } from '../types'

export function useTodoMutations() {
    const firestore = useFirestore()

    const createTodo = async (data: CreateTodoData) => {
        const toastId = toast.loading('Creating todo...')
        try {
            const newDocRef = doc(collection(firestore, 'todos'))
            await setDoc(newDocRef, {
                title: data.title,
                completed: false,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })
            toast.success('Todo created', { id: toastId })
            return newDocRef.id
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to create',
                { id: toastId }
            )
            throw error
        }
    }

    const updateTodo = async (todoId: string, data: UpdateTodoData) => {
        try {
            await updateDoc(doc(firestore, 'todos', todoId), {
                ...data,
                updatedAt: Timestamp.now()
            })
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to update'
            )
            throw error
        }
    }

    const deleteTodo = async (todoId: string) => {
        const toastId = toast.loading('Deleting todo...')
        try {
            await deleteDoc(doc(firestore, 'todos', todoId))
            toast.success('Todo deleted', { id: toastId })
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to delete',
                { id: toastId }
            )
            throw error
        }
    }

    return { createTodo, updateTodo, deleteTodo }
}
