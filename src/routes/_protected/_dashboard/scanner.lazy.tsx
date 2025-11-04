import { createLazyFileRoute } from '@tanstack/react-router'
import { ScannerPage } from '@/app/routes/scanner'

export const Route = createLazyFileRoute('/_protected/_dashboard/scanner')({
    component: ScannerPage
})
