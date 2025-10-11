import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import type { CreateTodoData, UpdateTodoData, Todo } from '../types'

const COLLECTION = 'todos'

export const subscribeTodos = (
  callback: (todos: Todo[]) => void,
  onError?: (error: Error) => void
) => {
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => {
      const todos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Todo[]
      callback(todos)
    },
    (error) => {
      console.error('Firestore error:', error)
      if (onError) onError(error as Error)
    }
  )
}

export const createTodo = async (data: CreateTodoData) => {
  await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: Date.now()
  })
}

export const updateTodo = async (id: string, data: UpdateTodoData) => {
  await updateDoc(doc(db, COLLECTION, id), data)
}

export const deleteTodo = async (id: string) => {
  await deleteDoc(doc(db, COLLECTION, id))
}
