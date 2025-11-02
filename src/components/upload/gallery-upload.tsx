import { useState, memo, useCallback, useRef, useEffect } from 'react'
import {
    ImageIcon,
    Upload,
    XIcon,
    ZoomInIcon,
    WifiOff,
    Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { useUpload } from '@/hooks/use-upload'
import { useOnline } from '@/hooks/use-online'
import { useIsMobile } from '@/hooks/use-mobile'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

interface GalleryUploadProps {
    images: string[]
    maxFiles?: number
    maxSize?: number
    accept?: string
    path: string
    className?: string
    onImagesChange: (images: string[]) => void
    onUploadComplete?: (url: string) => void
    onDeleteComplete?: (deletedUrl: string) => void
}

const ImagePreview = memo(
    function ImagePreview({
        src,
        onRemove,
        onView
    }: {
        src: string
        onRemove: () => void
        onView: () => void
    }) {
        const isMobile = useIsMobile()

        return (
            <div className="group relative aspect-square">
                <Image
                    src={src}
                    alt="Gallery"
                    className="h-full w-full rounded-lg border object-cover transition-transform active:scale-95 md:group-hover:scale-105"
                />
                <div
                    className={cn(
                        'absolute inset-0 flex items-center justify-center gap-1.5 md:gap-2 rounded-lg bg-black/50 transition-opacity',
                        isMobile
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                    )}
                >
                    <Button
                        onClick={onView}
                        variant="secondary"
                        size="icon"
                        className="size-7 md:size-8"
                    >
                        <ZoomInIcon className="size-3.5 md:size-4" />
                    </Button>
                    <Button
                        onClick={onRemove}
                        variant="secondary"
                        size="icon"
                        className="size-7 md:size-8"
                    >
                        <XIcon className="size-3.5 md:size-4" />
                    </Button>
                </div>
            </div>
        )
    },
    (prev, next) => prev.src === next.src
)

const ImageModal = memo(
    function ImageModal({
        src,
        onClose,
        open
    }: {
        src: string
        onClose: () => void
        open: boolean
    }) {
        const isMobile = useIsMobile()

        if (isMobile) {
            return (
                <Drawer open={open} onOpenChange={onClose}>
                    <DrawerContent className="h-[90vh]">
                        <div className="flex-1 flex items-center justify-center p-4 bg-black/90">
                            <Image
                                src={src}
                                alt="Preview"
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </DrawerContent>
                </Drawer>
            )
        }

        return (
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90 border-none">
                    <div className="relative flex items-center justify-center p-4">
                        <Image
                            src={src}
                            alt="Preview"
                            className="max-h-[85vh] max-w-full object-contain rounded-lg"
                        />
                        <Button
                            onClick={onClose}
                            variant="secondary"
                            size="icon"
                            className="absolute end-2 top-2 size-8"
                        >
                            <XIcon className="size-4" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    },
    (prev, next) => prev.open === next.open && prev.src === next.src
)

export const GalleryUpload = memo(function GalleryUpload({
    images,
    maxFiles = 5,
    maxSize = 5 * 1024 * 1024,
    accept = 'image/*',
    path,
    className,
    onImagesChange,
    onUploadComplete,
    onDeleteComplete
}: GalleryUploadProps) {
    const isMobile = useIsMobile()
    const isOnline = useOnline()
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
    const [showDeleteAll, setShowDeleteAll] = useState(false)
    const [pendingFiles, setPendingFiles] = useState<File[]>([])
    const [uploadingIndex, setUploadingIndex] = useState<number>(-1)

    const canAddMore = images.length + pendingFiles.length < maxFiles

    const handleUploadSuccess = useCallback(
        (url: string) => {
            const newImages = [...images, url]
            onImagesChange(newImages)
            onUploadComplete?.(url)

            // Upload next file if any
            setPendingFiles((prev) => {
                const nextFiles = prev.slice(1)
                if (nextFiles.length > 0) {
                    setUploadingIndex((idx) => idx + 1)
                } else {
                    setUploadingIndex(-1)
                }
                return nextFiles
            })
        },
        [images, onImagesChange, onUploadComplete]
    )

    const upload = useUpload({
        path,
        accept,
        maxSize,
        onSuccess: handleUploadSuccess
    })

    const handleRemove = useCallback(
        (index: number) => {
            const deletedUrl = images[index]
            const newImages = images.filter((_, i) => i !== index)
            onImagesChange(newImages)
            onDeleteComplete?.(deletedUrl)
            setDeleteIndex(null)
        },
        [images, onImagesChange, onDeleteComplete]
    )

    const handleDeleteAll = useCallback(() => {
        images.forEach((url) => onDeleteComplete?.(url))
        onImagesChange([])
        setShowDeleteAll(false)
    }, [images, onImagesChange, onDeleteComplete])

    const handleDragEnter = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }, [])

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)

            const files = Array.from(e.dataTransfer.files || [])
            const availableSlots = maxFiles - images.length
            const filesToAdd = files.slice(0, availableSlots)

            if (filesToAdd.length > 0) {
                setPendingFiles(filesToAdd)
            }
        },
        [maxFiles, images.length]
    )

    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || [])
            const availableSlots = maxFiles - images.length
            const filesToAdd = files.slice(0, availableSlots)

            if (filesToAdd.length > 0) {
                setPendingFiles(filesToAdd)
            }

            e.target.value = ''
        },
        [maxFiles, images.length]
    )

    const handleStartUpload = useCallback(() => {
        if (pendingFiles.length > 0 && !upload.isUploading) {
            setUploadingIndex(0)
            const firstFile = pendingFiles[0]
            upload.selectFile(firstFile)
            setTimeout(() => {
                upload.uploadToFirebase(firstFile)
            }, 50)
        }
    }, [pendingFiles, upload])

    // Auto-upload next file when previous completes
    const prevUploadingRef = useRef(upload.isUploading)
    useEffect(() => {
        if (
            prevUploadingRef.current &&
            !upload.isUploading &&
            pendingFiles.length > 0
        ) {
            const nextFile = pendingFiles[0]
            upload.selectFile(nextFile)
            setTimeout(() => {
                upload.uploadToFirebase(nextFile)
            }, 100)
        }
        prevUploadingRef.current = upload.isUploading
    }, [upload.isUploading, pendingFiles, upload])

    const handleCancelUpload = useCallback(() => {
        upload.cancel()
        setPendingFiles([])
        setUploadingIndex(-1)
    }, [upload.cancel])

    return (
        <div className={cn('w-full space-y-3 md:space-y-4', className)}>
            {/* Upload Area */}
            {canAddMore && pendingFiles.length === 0 && !upload.isUploading && (
                <div
                    className={cn(
                        'relative rounded-lg border border-dashed p-4 md:p-6 text-center transition-colors',
                        isDragging
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                        !isOnline && 'opacity-50 pointer-events-none'
                    )}
                    onDragEnter={!isMobile ? handleDragEnter : undefined}
                    onDragLeave={!isMobile ? handleDragLeave : undefined}
                    onDragOver={!isMobile ? handleDragOver : undefined}
                    onDrop={!isMobile ? handleDrop : undefined}
                >
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        className="sr-only"
                        id="gallery-upload-input"
                        disabled={!isOnline}
                        multiple
                    />

                    <div className="flex flex-col items-center gap-2 md:gap-3">
                        <div
                            className={cn(
                                'flex size-10 md:size-12 items-center justify-center rounded-full',
                                isDragging ? 'bg-primary/10' : 'bg-muted'
                            )}
                        >
                            <ImageIcon
                                className={cn(
                                    'size-4 md:size-5',
                                    isDragging
                                        ? 'text-primary'
                                        : 'text-muted-foreground'
                                )}
                            />
                        </div>

                        <div className="space-y-0.5 md:space-y-1">
                            <p className="text-xs md:text-sm font-medium">
                                {isMobile
                                    ? 'Tap to upload'
                                    : 'Upload images to gallery'}
                            </p>
                            <p className="text-[10px] md:text-xs text-muted-foreground">
                                PNG, JPG, GIF up to{' '}
                                {(maxSize / 1024 / 1024).toFixed(0)}MB (max{' '}
                                {maxFiles} files)
                            </p>
                        </div>

                        <label htmlFor="gallery-upload-input">
                            <Button
                                type="button"
                                size={isMobile ? 'sm' : 'default'}
                                disabled={!isOnline}
                            >
                                <span>
                                    <Upload className="size-3 md:size-4 mr-1.5 md:mr-2" />
                                    Select image
                                </span>
                            </Button>
                        </label>
                    </div>
                </div>
            )}

            {/* Pending Files Preview */}
            {pendingFiles.length > 0 && !upload.isUploading && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm font-medium">
                            {pendingFiles.length} image
                            {pendingFiles.length > 1 ? 's' : ''} selected
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {pendingFiles.map((file, index) => {
                            const previewUrl = URL.createObjectURL(file)
                            return (
                                <div
                                    key={index}
                                    className="relative aspect-square border rounded-lg overflow-hidden bg-muted"
                                >
                                    <Image
                                        src={previewUrl}
                                        alt={file.name}
                                        className="h-full w-full object-cover"
                                        onLoad={() =>
                                            URL.revokeObjectURL(previewUrl)
                                        }
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <p className="text-white text-[10px] md:text-xs text-center px-2 truncate w-full">
                                            {file.name}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {!isOnline && (
                        <Alert variant="destructive">
                            <WifiOff className="size-4" />
                            <AlertDescription className="text-xs">
                                No internet connection
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancelUpload}
                            size={isMobile ? 'sm' : 'default'}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleStartUpload}
                            disabled={!isOnline}
                            size={isMobile ? 'sm' : 'default'}
                            className="flex-1"
                        >
                            <Upload className="size-3 md:size-4 mr-1.5" />
                            Upload{' '}
                            {pendingFiles.length > 1
                                ? `All (${pendingFiles.length})`
                                : ''}
                        </Button>
                    </div>
                </div>
            )}

            {/* Upload Progress */}
            {upload.isUploading && upload.uploadProgress && (
                <div className="border rounded-lg p-3 md:p-4 space-y-2 md:space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-xs md:text-sm font-medium">
                            Uploading{' '}
                            {pendingFiles.length > 1
                                ? `${uploadingIndex + 1}/${pendingFiles.length}`
                                : '...'}
                        </span>
                        <span className="text-[10px] md:text-xs text-muted-foreground">
                            {upload.uploadProgress.percentage}%
                        </span>
                    </div>
                    <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all"
                            style={{
                                width: `${upload.uploadProgress.percentage}%`
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Offline Warning */}
            {!isOnline && (
                <Alert variant="destructive">
                    <WifiOff className="size-4" />
                    <AlertDescription className="text-xs md:text-sm">
                        No internet connection. Upload disabled.
                    </AlertDescription>
                </Alert>
            )}

            {/* Gallery Stats */}
            {images.length > 0 && (
                <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="font-medium">
                        Gallery ({images.length}/{maxFiles})
                    </span>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDeleteAll(true)}
                        className="h-7 text-xs text-destructive hover:text-destructive"
                    >
                        <Trash2 className="size-3 mr-1" />
                        Clear all
                    </Button>
                </div>
            )}

            {/* Image Grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 md:gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {images.map((image, index) => (
                        <ImagePreview
                            key={index}
                            src={image}
                            onRemove={() => setDeleteIndex(index)}
                            onView={() => setSelectedImage(image)}
                        />
                    ))}
                </div>
            )}

            {/* Image Modal */}
            <ImageModal
                src={selectedImage || ''}
                onClose={() => setSelectedImage(null)}
                open={!!selectedImage}
            />

            {/* Delete Confirmation */}
            <AlertDialog
                open={deleteIndex !== null}
                onOpenChange={() => setDeleteIndex(null)}
            >
                <AlertDialogContent className="max-w-[90vw] md:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base md:text-lg">
                            Delete image?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs md:text-sm">
                            This action cannot be undone. This will permanently
                            delete the image.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="m-0 w-full sm:w-auto">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                deleteIndex !== null &&
                                handleRemove(deleteIndex)
                            }
                            className="m-0 w-full sm:w-auto bg-destructive hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete All Confirmation */}
            <AlertDialog open={showDeleteAll} onOpenChange={setShowDeleteAll}>
                <AlertDialogContent className="max-w-[90vw] md:max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base md:text-lg">
                            Delete all images?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-xs md:text-sm">
                            This will permanently delete all {images.length}{' '}
                            images. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="m-0 w-full sm:w-auto">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteAll}
                            className="m-0 w-full sm:w-auto bg-destructive hover:bg-destructive/90"
                        >
                            Delete All
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
})
