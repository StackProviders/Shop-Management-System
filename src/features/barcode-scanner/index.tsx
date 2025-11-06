import { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Camera, QrCode, Package, CheckCircle } from 'lucide-react'
import { BarcodeScanButton } from './components'

export { BarcodeScanButton, BarcodeScanInput } from './components'

interface ScanResult {
    data: string
    format: string
    timestamp: Date
}

export function BarcodeScanner() {
    const [scanResult, setScanResult] = useState<ScanResult | null>(null)
    const [scanHistory, setScanHistory] = useState<ScanResult[]>([])

    const handleScan = (data: string, format: string) => {
        const newResult: ScanResult = {
            data,
            format,
            timestamp: new Date()
        }
        setScanResult(newResult)
        setScanHistory((prev) => [newResult, ...prev.slice(0, 9)])
    }

    const clearHistory = () => {
        setScanHistory([])
        setScanResult(null)
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
        } catch (err) {
            console.error('Failed to copy to clipboard:', err)
        }
    }

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                        <Camera className="h-8 w-8" />
                        Barcode Scanner
                    </h1>
                    <p className="text-muted-foreground">
                        Scan QR codes and barcodes using your device camera
                    </p>
                </div>

                {/* Scan Button */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <QrCode className="h-5 w-5" />
                            Scanner
                        </CardTitle>
                        <CardDescription>
                            Click the button below to start scanning barcodes
                            and QR codes
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BarcodeScanButton
                            onScan={handleScan}
                            variant="default"
                            size="lg"
                            className="w-full"
                        />
                    </CardContent>
                </Card>

                {/* Current Scan Result */}
                {scanResult && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                Latest Scan Result
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge variant="secondary">
                                    {scanResult.format}
                                </Badge>
                                <span className="text-sm text-muted-foreground">
                                    {scanResult.timestamp.toLocaleString()}
                                </span>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <code className="text-sm break-all">
                                    {scanResult.data}
                                </code>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyToClipboard(scanResult.data)}
                            >
                                Copy to Clipboard
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Scan History */}
                {scanHistory.length > 0 && (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-5 w-5" />
                                    Scan History
                                </CardTitle>
                                <CardDescription>
                                    Recent scans ({scanHistory.length})
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearHistory}
                            >
                                Clear History
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {scanHistory.map((result, index) => (
                                    <div
                                        key={index}
                                        className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline">
                                                {result.format}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {result.timestamp.toLocaleString()}
                                            </span>
                                        </div>
                                        <code className="text-sm break-all">
                                            {result.data}
                                        </code>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Instructions */}
                <Card>
                    <CardHeader>
                        <CardTitle>How to Use</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p>• Click the scan button to open the camera</p>
                        <p>• Point your camera at a QR code or barcode</p>
                        <p>
                            • The scanner will automatically detect and decode
                            the code
                        </p>
                        <p>
                            • Scanned results will appear below and be saved to
                            history
                        </p>
                        <p>
                            • Supported formats: QR Code, EAN-13, EAN-8, Code
                            128, Code 39
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
