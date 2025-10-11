export interface Todo {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

export type CreateTodoData = Omit<Todo, 'id' | 'createdAt'>
export type UpdateTodoData = Partial<Omit<Todo, 'id' | 'createdAt'>>
