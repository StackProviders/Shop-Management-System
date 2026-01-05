import { createLazyFileRoute } from '@tanstack/react-router'
import { BarcodeScanner } from '@/features/barcode-scanner'

export const Route = createLazyFileRoute('/_protected/_dashboard/scanner')({
    component: ScannerPage
})

function ScannerPage() {
    return <BarcodeScanner />
}
