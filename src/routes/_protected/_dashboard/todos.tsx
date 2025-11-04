import { createFileRoute } from '@tanstack/react-router'
import TodosPage from '@/app/routes/todos'

export const Route = createFileRoute('/_protected/_dashboard/todos')({
    component: TodosPage
})
