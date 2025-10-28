import { db } from '@/lib/firebase'
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore'
import { Todo, CreateTodoData, UpdateTodoData } from '../types'

const COLLECTION = 'todos'

export const todoApi = {
    getAll: (): Promise<Todo[]> => {
        return new Promise((resolve) => {
            const q = query(
                collection(db, COLLECTION),
                orderBy('createdAt', 'desc')
            )
            onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
                const todos = snapshot.docs.map((doc) => {
                    const data = doc.data()
                    return {
                        id: doc.id,
                        title: data.title,
                        completed: data.completed,
                        createdAt: data.createdAt?.toDate?.() || new Date(),
                        updatedAt: data.updatedAt?.toDate?.() || new Date()
                    }
                })
                resolve(todos)
            })
        })
    },

    create: async (data: CreateTodoData): Promise<Todo> => {
        const now = new Date()
        try {
            const docRef = await addDoc(collection(db, COLLECTION), {
                title: data.title,
                completed: false,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
            return {
                id: docRef.id,
                title: data.title,
                completed: false,
                createdAt: now,
                updatedAt: now
            }
        } catch (error) {
            console.error('Create error:', error)
            throw error
        }
    },

    update: async (id: string, data: UpdateTodoData): Promise<void> => {
        try {
            const docRef = doc(db, COLLECTION, id)
            await updateDoc(docRef, {
                ...data,
                updatedAt: serverTimestamp()
            })
        } catch (error) {
            console.error('Update error:', error)
            throw error
        }
    },

    delete: async (id: string): Promise<void> => {
        try {
            await deleteDoc(doc(db, COLLECTION, id))
        } catch (error) {
            console.error('Delete error:', error)
            throw error
        }
    }
}
