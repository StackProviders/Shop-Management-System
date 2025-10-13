import { useState } from 'react';
import { scan, Format, checkPermissions, requestPermissions } from '@tauri-apps/plugin-barcode-scanner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, QrCode, Package, AlertCircle, CheckCircle } from 'lucide-react';

interface ScanResult {
    data: string;
    format: string;
    timestamp: Date;
}

export function BarcodeScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);

    const ensureCameraPermission = async (): Promise<boolean> => {
        try {
            const state = await checkPermissions();
            if (state === 'granted') return true;
            const next = await requestPermissions();
            return next === 'granted';
        } catch (err) {
            console.error('Permission check/request failed:', err);
            return false;
        }
    };

    const handleScan = async () => {
        try {
            setIsScanning(true);
            setError(null);

            const hasPermission = await ensureCameraPermission();
            if (!hasPermission) {
                setError('Camera permission is required. Enable it in settings if previously denied.');
                return;
            }

            const result = await scan({
                windowed: true,
                formats: [Format.QRCode, Format.EAN13, Format.EAN8, Format.Code128, Format.Code39]
            });

            console.log(result);

            const newResult: ScanResult = {
                data: result.content,
                format: result.format,
                timestamp: new Date()
            };

            setScanResult(newResult);
            setScanHistory(prev => [newResult, ...prev.slice(0, 9)]); // Keep last 10 scans
        } catch (err) {
            console.error('Failed to scan barcode:', err);
            const message = err instanceof Error
                ? err.message
                : typeof err === 'string'
                ? err
                : (() => {
                    try {
                        return JSON.stringify(err);
                    } catch {
                        return String(err);
                    }
                })();
            setError(message);
        } finally {
            setIsScanning(false);
        }
    };

    const clearHistory = () => {
        setScanHistory([]);
        setScanResult(null);
        setError(null);
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
        }
    };

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
                            Click the button below to start scanning barcodes and QR codes
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button
                            onClick={handleScan}
                            disabled={isScanning}
                            size="lg"
                            className="w-full"
                        >
                            {isScanning ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Scanning...
                                </>
                            ) : (
                                <>
                                    <Camera className="h-4 w-4 mr-2" />
                                    Start Scanning
                                </>
                            )}
                        </Button>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
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
                                <Badge variant="secondary">{scanResult.format}</Badge>
                                <span className="text-sm text-muted-foreground">
                                    {scanResult.timestamp.toLocaleString()}
                                </span>
                            </div>
                            <div className="p-4 bg-muted rounded-lg">
                                <code className="text-sm break-all">{scanResult.data}</code>
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
                            <Button variant="outline" size="sm" onClick={clearHistory}>
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
                                            <Badge variant="outline">{result.format}</Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {result.timestamp.toLocaleString()}
                                            </span>
                                        </div>
                                        <code className="text-sm break-all">{result.data}</code>
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
                        <p>• Click &quot;Start Scanning&quot; to open the camera</p>
                        <p>• Point your camera at a QR code or barcode</p>
                        <p>• The scanner will automatically detect and decode the code</p>
                        <p>• Scanned results will appear below and be saved to history</p>
                        <p>• Supported formats: QR Code, EAN-13, EAN-8, Code 128, Code 39</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
