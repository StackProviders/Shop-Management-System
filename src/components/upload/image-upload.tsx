import { ReactNode, memo, useCallback } from 'react'
import { Upload, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUpload } from '@/hooks/use-upload'
import { useOnline } from '@/hooks/use-online'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface ImageUploadProps {
    path: string
    accept?: string
    maxSize?: number
    onUploadComplete: (url: string) => void
    onCancel?: () => void
    className?: string
    children?: (props: {
        selectFile: (file: File) => void
        selectedFile: File | null
        isUploading: boolean
        uploadProgress: {
            percentage: number
            bytesTransferred: number
            totalBytes: number
        } | null
        cancel: () => void
        isOnline: boolean
    }) => ReactNode
}

const FilePreview = memo(function FilePreview({
    file,
    onCancel,
    onUpload,
    isOnline
}: {
    file: File
    onCancel: () => void
    onUpload: () => void
    isOnline: boolean
}) {
    const isMobile = useIsMobile()

    return (
        <div className="flex w-full flex-col gap-3 items-center">
            <div className="border rounded-lg p-3 md:p-4 bg-muted/30 w-full">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
            </div>
            {!isOnline && (
                <Alert variant="destructive" className="w-full">
                    <WifiOff className="size-4" />
                    <AlertDescription className="text-xs">
                        No internet connection
                    </AlertDescription>
                </Alert>
            )}
            <div className="flex gap-2 justify-center w-full">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    size={isMobile ? 'sm' : 'default'}
                    className="flex-1 md:flex-none"
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    onClick={onUpload}
                    disabled={!isOnline}
                    size={isMobile ? 'sm' : 'default'}
                    className="flex-1 md:flex-none"
                >
                    Upload
                </Button>
            </div>
        </div>
    )
})

const UploadProgress = memo(function UploadProgress({
    progress
}: {
    progress: {
        percentage: number
        bytesTransferred: number
        totalBytes: number
    }
}) {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <div className="relative">
                <svg className="size-12 -rotate-90" viewBox="0 0 48 48">
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-muted/60"
                    />
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${2 * Math.PI * 20}`}
                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress.percentage / 100)}`}
                        className="text-white transition-all duration-300"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    )
})

export { UploadProgress }

export const ImageUpload = memo(function ImageUpload({
    path,
    accept = 'image/png, image/jpeg',
    maxSize,
    onUploadComplete,
    onCancel,
    className,
    children
}: ImageUploadProps) {
    const isMobile = useIsMobile()
    const isOnline = useOnline()
    const upload = useUpload({
        path,
        accept,
        maxSize,
        onSuccess: onUploadComplete
    })

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]
            if (file) upload.selectFile(file)
        },
        [upload.selectFile]
    )

    const handleCancel = useCallback(() => {
        upload.cancel()
        onCancel?.()
    }, [upload.cancel, onCancel])

    const handleUpload = useCallback(() => {
        if (upload.selectedFile) upload.uploadToFirebase(upload.selectedFile)
    }, [upload.selectedFile, upload.uploadToFirebase])

    if (children) {
        return <>{children({ ...upload, isOnline })}</>
    }

    if (upload.selectedFile && !upload.isUploading) {
        return (
            <FilePreview
                file={upload.selectedFile}
                onCancel={handleCancel}
                onUpload={handleUpload}
                isOnline={isOnline}
            />
        )
    }

    return (
        <div
            className={cn('w-full max-w-md space-y-3 md:space-y-4', className)}
        >
            {upload.isUploading && upload.uploadProgress ? (
                <UploadProgress progress={upload.uploadProgress} />
            ) : (
                <>
                    <div className="border-2 border-dashed rounded-lg p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-3 hover:border-primary transition-colors">
                        <Upload className="size-8 md:size-12 text-muted-foreground" />
                        <div className="text-center">
                            <p className="text-xs md:text-sm font-medium">
                                {isMobile
                                    ? 'Tap to upload'
                                    : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground mt-1">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                        <input
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload-input"
                            disabled={!isOnline}
                        />
                        <label htmlFor="file-upload-input">
                            <Button
                                type="button"
                                size={isMobile ? 'sm' : 'default'}
                                className="mt-1 md:mt-2"
                                disabled={!isOnline}
                            >
                                <span>Choose File</span>
                            </Button>
                        </label>
                    </div>
                    {!isOnline && (
                        <Alert variant="destructive">
                            <WifiOff className="size-4" />
                            <AlertDescription className="text-xs md:text-sm">
                                No internet connection. Upload disabled.
                            </AlertDescription>
                        </Alert>
                    )}
                </>
            )}
        </div>
    )
})
