import { useState, memo, useCallback, useRef, useEffect } from 'react'
import { Upload, XIcon, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import { useUpload } from '@/hooks/use-upload'
import { useOnline } from '@/hooks/use-online'
import { useIsMobile } from '@/hooks/use-mobile'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface GalleryUploadModalProps {
    images: string[]
    maxFiles?: number
    maxSize?: number
    accept?: string
    path: string
    open: boolean
    onOpenChange: (open: boolean) => void
    onImagesChange: (images: string[]) => void
    onUploadComplete?: (url: string) => void
    onDeleteComplete?: (deletedUrl: string) => void
}

interface PendingFile {
    id: string
    file: File
    preview: string
    progress: number
    status: 'pending' | 'uploading' | 'completed' | 'error'
    error?: string
}

const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export const GalleryUploadModal = memo(function GalleryUploadModal({
    images,
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024,
    accept = 'image/*',
    path,
    open,
    onOpenChange,
    onImagesChange,
    onUploadComplete,
    onDeleteComplete
}: GalleryUploadModalProps) {
    const isMobile = useIsMobile()
    const isOnline = useOnline()
    const [isDragging, setIsDragging] = useState(false)
    const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const canAddMore = images.length + pendingFiles.length < maxFiles

    const handleUploadSuccess = useCallback(
        (url: string, fileId: string) => {
            const newImages = [...images, url]
            onImagesChange(newImages)
            onUploadComplete?.(url)

            setPendingFiles((prev) => prev.filter((f) => f.id !== fileId))
        },
        [images, onImagesChange, onUploadComplete]
    )

    const upload = useUpload({
        path,
        accept,
        maxSize,
        onSuccess: (url) => {
            const uploadingFile = pendingFiles.find(
                (f) => f.status === 'uploading'
            )
            if (uploadingFile) {
                handleUploadSuccess(url, uploadingFile.id)
            }
        }
    })

    const handleFileSelect = useCallback(
        (files: FileList | null) => {
            if (!files) return

            const availableSlots =
                maxFiles - images.length - pendingFiles.length
            const filesToAdd = Array.from(files).slice(0, availableSlots)

            const newPendingFiles: PendingFile[] = filesToAdd.map((file) => ({
                id: `${Date.now()}-${Math.random()}`,
                file,
                preview: URL.createObjectURL(file),
                progress: 0,
                status: 'pending' as const
            }))

            setPendingFiles((prev) => [...prev, ...newPendingFiles])
        },
        [maxFiles, images.length, pendingFiles.length]
    )

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            handleFileSelect(e.target.files)
            e.target.value = ''
        },
        [handleFileSelect]
    )

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)
            handleFileSelect(e.dataTransfer.files)
        },
        [handleFileSelect]
    )

    const handleStartUpload = useCallback(() => {
        const firstPending = pendingFiles.find((f) => f.status === 'pending')
        if (firstPending && !upload.isUploading) {
            setPendingFiles((prev) =>
                prev.map((f) =>
                    f.id === firstPending.id
                        ? { ...f, status: 'uploading' as const }
                        : f
                )
            )
            upload.selectFile(firstPending.file)
            setTimeout(() => {
                upload.uploadToFirebase(firstPending.file)
            }, 50)
        }
    }, [pendingFiles, upload])

    const handleRemoveImage = useCallback(
        (index: number) => {
            const deletedUrl = images[index]
            const newImages = images.filter((_, i) => i !== index)
            onImagesChange(newImages)
            onDeleteComplete?.(deletedUrl)
        },
        [images, onImagesChange, onDeleteComplete]
    )

    const handleRemovePending = useCallback((id: string) => {
        setPendingFiles((prev) => {
            const file = prev.find((f) => f.id === id)
            if (file) URL.revokeObjectURL(file.preview)
            return prev.filter((f) => f.id !== id)
        })
    }, [])

    // Update progress
    useEffect(() => {
        if (upload.uploadProgress && upload.isUploading) {
            setPendingFiles((prev) =>
                prev.map((f) =>
                    f.status === 'uploading'
                        ? { ...f, progress: upload.uploadProgress!.percentage }
                        : f
                )
            )
        }
    }, [upload.uploadProgress, upload.isUploading])

    // Auto-upload next file
    const prevUploadingRef = useRef(upload.isUploading)
    useEffect(() => {
        if (prevUploadingRef.current && !upload.isUploading) {
            const nextPending = pendingFiles.find((f) => f.status === 'pending')
            if (nextPending) {
                setTimeout(() => handleStartUpload(), 100)
            }
        }
        prevUploadingRef.current = upload.isUploading
    }, [upload.isUploading, pendingFiles, handleStartUpload])

    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title="Manage Images"
            description={`${images.length}/${maxFiles} images uploaded`}
            className="max-w-4xl"
        >
            <div className="space-y-4">
                {/* Upload Area */}
                {canAddMore && (
                    <div
                        className={cn(
                            'relative rounded-lg border border-dashed p-4 md:p-6 text-center transition-colors',
                            isDragging
                                ? 'border-primary bg-primary/5'
                                : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                            !isOnline && 'opacity-50 pointer-events-none'
                        )}
                        onDragEnter={(e) => {
                            e.preventDefault()
                            setIsDragging(true)
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault()
                            setIsDragging(false)
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            className="sr-only"
                            multiple
                            disabled={!isOnline}
                        />

                        <div className="flex flex-col items-center gap-3">
                            <div
                                className={cn(
                                    'flex size-10 md:size-12 items-center justify-center rounded-full',
                                    isDragging ? 'bg-primary/10' : 'bg-muted'
                                )}
                            >
                                <Upload className="size-4 md:size-5 text-muted-foreground" />
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs md:text-sm font-medium">
                                    {isMobile
                                        ? 'Tap to upload'
                                        : 'Drop files here or'}{' '}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="text-primary underline-offset-4 hover:underline"
                                    >
                                        browse
                                    </button>
                                </p>
                                <p className="text-[10px] md:text-xs text-muted-foreground">
                                    Max {formatBytes(maxSize)} • {maxFiles}{' '}
                                    files max
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {!isOnline && (
                    <Alert variant="destructive">
                        <WifiOff className="size-4" />
                        <AlertDescription className="text-xs md:text-sm">
                            No internet connection. Upload disabled.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Pending Files */}
                {pendingFiles.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs md:text-sm font-medium">
                                Uploading (
                                {
                                    pendingFiles.filter(
                                        (f) => f.status !== 'pending'
                                    ).length
                                }
                                /{pendingFiles.length})
                            </span>
                            {pendingFiles.some(
                                (f) => f.status === 'pending'
                            ) && (
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={handleStartUpload}
                                    disabled={!isOnline}
                                >
                                    <Upload className="size-3 mr-1" />
                                    Upload All
                                </Button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {pendingFiles.map((item) => (
                                <div key={item.id} className="relative group">
                                    <Button
                                        onClick={() =>
                                            handleRemovePending(item.id)
                                        }
                                        variant="secondary"
                                        size="icon"
                                        className="absolute -end-1 -top-1 z-10 size-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <XIcon className="size-3" />
                                    </Button>

                                    <div className="relative aspect-square rounded-lg border overflow-hidden bg-muted">
                                        <Image
                                            src={item.preview}
                                            alt={item.file.name}
                                            className="h-full w-full object-cover"
                                        />
                                        {item.status === 'uploading' && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                <svg
                                                    className="size-10 -rotate-90"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <circle
                                                        cx="24"
                                                        cy="24"
                                                        r="20"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        className="text-white/20"
                                                    />
                                                    <circle
                                                        cx="24"
                                                        cy="24"
                                                        r="20"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="3"
                                                        strokeDasharray={`${2 * Math.PI * 20}`}
                                                        strokeDashoffset={`${2 * Math.PI * 20 * (1 - item.progress / 100)}`}
                                                        className="text-white transition-all"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-[10px] md:text-xs truncate mt-1">
                                        {item.file.name}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Uploaded Images */}
                {images.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs md:text-sm font-medium">
                                Uploaded ({images.length})
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <Button
                                        onClick={() => handleRemoveImage(index)}
                                        variant="secondary"
                                        size="icon"
                                        className="absolute -end-1 -top-1 z-10 size-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <XIcon className="size-3" />
                                    </Button>

                                    <div className="relative aspect-square rounded-lg border overflow-hidden">
                                        <Image
                                            src={image}
                                            alt={`Image ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ResponsiveModal>
    )
})
