import { useState, useEffect } from 'react'
import { subscribeTodos, createTodo, updateTodo, deleteTodo } from '../api/todos'
import type { Todo, CreateTodoData, UpdateTodoData } from '../types'

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeTodos((data) => {
      setTodos(data)
      setLoading(false)
      setError(null)
    }, (err) => {
      console.error('Error loading todos:', err)
      setError(err.message)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const addTodo = async (data: CreateTodoData) => {
    await createTodo(data)
  }

  const editTodo = async (id: string, data: UpdateTodoData) => {
    await updateTodo(id, data)
  }

  const removeTodo = async (id: string) => {
    await deleteTodo(id)
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    await updateTodo(id, { completed })
  }

  return { todos, loading, error, addTodo, editTodo, removeTodo, toggleTodo }
}
