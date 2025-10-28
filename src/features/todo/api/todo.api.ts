import { collection, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { createFirestoreApi } from '@/features/shared'
import { Todo, CreateTodoData, UpdateTodoData } from '../types'

const COLLECTION = 'todos'
const baseApi = createFirestoreApi<Todo>(COLLECTION)

export const todoQueries = {
    all: () => query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
}

export const todoApi = {
    subscribe: baseApi.subscribe,

    create: async (data: CreateTodoData) => {
        return baseApi.create({
            title: data.title,
            completed: false
        } as Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>)
    },

    update: async (id: string, data: UpdateTodoData) => {
        return baseApi.update(id, data)
    },

    delete: async (id: string) => {
        return baseApi.delete(id)
    }
}
