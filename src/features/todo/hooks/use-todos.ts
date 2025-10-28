import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Todo } from '../types'

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(
            q,
            { includeMetadataChanges: true },
            (snapshot) => {
                const data = snapshot.docs.map((doc) => {
                    const docData = doc.data()
                    return {
                        id: doc.id,
                        title: docData.title,
                        completed: docData.completed,
                        createdAt: docData.createdAt?.toDate?.() || new Date(),
                        updatedAt: docData.updatedAt?.toDate?.() || new Date()
                    }
                })
                setTodos(data)
                setIsLoading(false)
                setError(null)
            },
            (err) => {
                setError(err)
                setIsLoading(false)
            }
        )

        return () => unsubscribe()
    }, [])

    return {
        todos,
        isLoading,
        error,
        refresh: () => {}
    }
}
