import { collection, doc, Timestamp } from 'firebase/firestore'
import {
    useFirestore,
    useFirestoreCollectionData,
    useFirestoreDocData
} from 'reactfire'
import { Todo } from '../types'

export function useTodos() {
    const firestore = useFirestore()
    const todosCollection = collection(firestore, 'todos')

    const { status, data } = useFirestoreCollectionData(todosCollection, {
        idField: 'id'
    })

    const sortedTodos = ((data as Todo[]) ?? []).sort((a, b) => {
        const aTime =
            a.createdAt instanceof Date
                ? a.createdAt.getTime()
                : (a.createdAt as Timestamp).toMillis()
        const bTime =
            b.createdAt instanceof Date
                ? b.createdAt.getTime()
                : (b.createdAt as Timestamp).toMillis()
        return bTime - aTime
    })

    return {
        todos: sortedTodos,
        isLoading: status === 'loading',
        error: status === 'error' ? new Error('Failed to load todos') : null
    }
}

export function useTodoById(todoId: string) {
    const firestore = useFirestore()
    const todoRef = doc(firestore, 'todos', todoId)

    const { status, data } = useFirestoreDocData(todoRef, { idField: 'id' })

    return {
        todo: data as Todo | undefined,
        isLoading: status === 'loading'
    }
}
