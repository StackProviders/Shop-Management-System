'use client'

import { useState } from 'react'
import {
    scan,
    cancel as cancelScan,
    Format,
    checkPermissions,
    requestPermissions
} from '@tauri-apps/plugin-barcode-scanner'
import { Button } from '@/components/ui/button'
import { Scan } from 'lucide-react'
import { toast } from 'sonner'

interface BarcodeScanButtonProps {
    onScan: (barcode: string, format: string) => void
    disabled?: boolean
    variant?: 'default' | 'outline' | 'ghost' | 'secondary'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    className?: string
    formats?: Format[]
}

export function BarcodeScanButton({
    onScan,
    disabled = false,
    variant = 'outline',
    size = 'icon',
    className,
    formats = [
        Format.QRCode,
        Format.EAN13,
        Format.EAN8,
        Format.Code128,
        Format.Code39
    ]
}: BarcodeScanButtonProps) {
    const [isScanning, setIsScanning] = useState(false)

    const ensureCameraPermission = async (): Promise<boolean> => {
        try {
            const state = await checkPermissions()
            if (state === 'granted') return true
            const next = await requestPermissions()
            return next === 'granted'
        } catch (err) {
            console.error('Permission check/request failed:', err)
            return false
        }
    }

    const handleScan = async () => {
        try {
            setIsScanning(true)

            const hasPermission = await ensureCameraPermission()
            if (!hasPermission) {
                toast.error('Camera permission required')
                return
            }

            const result = await scan({ windowed: false, formats })
            onScan(result.content, result.format)
            toast.success('Barcode scanned')

            try {
                await cancelScan()
            } catch (err) {
                console.error('Failed to cancel scan:', err)
            }
        } catch (err) {
            console.error('Failed to scan barcode:', err)
            toast.error('Scan failed')
        } finally {
            setIsScanning(false)
            try {
                await cancelScan()
            } catch (err) {
                console.error('Failed to cancel scan:', err)
            }
        }
    }

    return (
        <Button
            type="button"
            variant={variant}
            size={size}
            onClick={handleScan}
            disabled={disabled || isScanning}
            className={className}
        >
            {isScanning ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
            ) : (
                <Scan className="h-4 w-4" />
            )}
        </Button>
    )
}
