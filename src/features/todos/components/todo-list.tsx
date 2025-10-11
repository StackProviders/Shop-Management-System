import { useTodos } from '../hooks/use-todos'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'

export const TodoList = () => {
  const { todos, loading, error, addTodo, removeTodo, toggleTodo } = useTodos()

  const handleAdd = async (title: string) => {
    try {
      await addTodo({ title, completed: false })
    } catch (err) {
      console.error('Failed to add todo:', err)
      alert('Failed to add todo. Check console for details.')
    }
  }

  if (loading) {
    return <div className="text-center p-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="border border-red-500 bg-red-50 p-4 rounded-lg">
          <h2 className="text-red-700 font-bold mb-2">Firebase Error</h2>
          <p className="text-red-600 text-sm mb-2">{error}</p>
          <p className="text-xs text-red-500">Check console for details. Make sure .env file is configured.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Todo App</h1>
        <p className="text-muted-foreground">Firebase Firestore with offline support</p>
      </div>
      
      <TodoForm onSubmit={handleAdd} />
      
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground p-8">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={removeTodo}
            />
          ))
        )}
      </div>
    </div>
  )
}
