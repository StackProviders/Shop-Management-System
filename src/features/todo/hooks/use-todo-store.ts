import { createEntityStore } from '@/features/shared'
import { Todo } from '../types'

export const useTodoStore = createEntityStore<Todo>()
