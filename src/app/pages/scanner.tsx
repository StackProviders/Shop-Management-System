import { BarcodeScanner } from '@/features/barcode-scanner'

export function ScannerPage() {
    return <BarcodeScanner />
}

// Necessary for react router to lazy load.
export const Component = ScannerPage
