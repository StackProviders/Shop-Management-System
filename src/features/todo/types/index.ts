export interface Todo {
    id: string
    title: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
}

export interface CreateTodoData {
    title: string
}

export interface UpdateTodoData {
    title?: string
    completed?: boolean
}
