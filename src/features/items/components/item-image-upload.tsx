import { useState, useMemo, useEffect, memo, useCallback } from 'react'
import { ImagePlus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Image } from '@/components/ui/image'
import { useDraftItem } from '../hooks/use-draft-item'
import { useUpload } from '@/hooks/use-upload'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'
import { CircularProgress } from '@/components/upload/circular-progress'

interface ItemImageUploadProps {
    images?: string[]
    onChange?: (images: string[]) => void
    itemId?: string
}

const ImageThumbnail = memo(function ImageThumbnail({
    image,
    index,
    onClick
}: {
    image: string
    index: number
    onClick: () => void
}) {
    return (
        <Button
            type="button"
            variant="outline"
            className="size-12 rounded-md hover:border-primary transition-colors flex items-center justify-center bg-muted/30 flex-shrink-0 border-dashed"
            onClick={onClick}
        >
            <Image
                src={image}
                alt={`Item ${index + 1}`}
                className="w-full h-full object-cover"
            />
        </Button>
    )
})

const AddImageButton = memo(function AddImageButton({
    onClick,
    isUploading,
    uploadProgress,
    size = 'sm'
}: {
    onClick: () => void
    isUploading: boolean
    uploadProgress: { percentage: number } | null
    size?: 'sm' | 'lg'
}) {
    const sizeClasses =
        size === 'sm' ? 'size-12' : 'w-[60px] h-[60px] md:w-full md:h-[80px]'
    const progressSize = size === 'sm' ? 32 : 40

    return (
        <Button
            type="button"
            onClick={onClick}
            className={cn(
                sizeClasses,
                'rounded-md hover:border-primary transition-colors flex items-center justify-center bg-muted/30 flex-shrink-0 border-dashed relative',
                size === 'lg' && 'border-2'
            )}
            variant="outline"
            disabled={isUploading}
        >
            {isUploading && uploadProgress ? (
                <CircularProgress
                    percentage={uploadProgress.percentage}
                    size={progressSize}
                />
            ) : (
                <ImagePlus className="size-4 text-muted-foreground" />
            )}
        </Button>
    )
})

const ImagePreviewActions = memo(function ImagePreviewActions({
    onRemove,
    onEdit
}: {
    onRemove: () => void
    onEdit: () => void
}) {
    return (
        <div className="border-t p-3 md:p-4 flex justify-center gap-2 md:gap-3 flex-shrink-0">
            <Button
                type="button"
                variant="outline"
                onClick={onRemove}
                className="gap-2 flex-1 md:flex-none"
                size="sm"
            >
                <Trash2 className="size-4" />
                <span className="hidden sm:inline">Remove Image</span>
                <span className="sm:hidden">Remove</span>
            </Button>
            <Button
                type="button"
                variant="outline"
                onClick={onEdit}
                className="gap-2 flex-1 md:flex-none"
                size="sm"
            >
                <Pencil className="size-4" />
                <span className="hidden sm:inline">Edit Image</span>
                <span className="sm:hidden">Edit</span>
            </Button>
        </div>
    )
})

export function ItemImageUpload({
    images = [],
    onChange,
    itemId
}: ItemImageUploadProps) {
    const [showDialog, setShowDialog] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const { draftImages, saveDraftImages } = useDraftItem(itemId)
    const upload = useUpload({
        path: 'items',
        accept: 'image/png, image/jpeg',
        onSuccess: (url) => {
            const newImages = [...mergedImages, url]
            onChange?.(newImages)
            saveDraftImages(newImages)
        }
    })

    const mergedImages = useMemo(() => {
        return images.length > 0 ? images : draftImages
    }, [images, draftImages])

    useEffect(() => {
        if (mergedImages.length > 0 && images.length === 0) {
            onChange?.(mergedImages)
        }
    }, [mergedImages, images, onChange])

    const validImages = useMemo(
        () => mergedImages.filter(Boolean),
        [mergedImages]
    )
    const canAddMore = validImages.length < 5

    const handleImageClick = useCallback((imageIndex: number) => {
        setSelectedIndex(imageIndex)
        setShowDialog(true)
    }, [])

    const handleAddClick = useCallback(() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/png, image/jpeg'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                upload.selectFile(file)
                upload.uploadToFirebase(file)
            }
        }
        input.click()
    }, [upload])

    const handleRemoveImage = useCallback(() => {
        const actualIndex = mergedImages.indexOf(validImages[selectedIndex])
        if (actualIndex !== -1) {
            const newImages = [...mergedImages]
            newImages.splice(actualIndex, 1)
            onChange?.(newImages)
            saveDraftImages(newImages)
            setShowDialog(false)
        }
    }, [mergedImages, validImages, selectedIndex, onChange, saveDraftImages])

    const handleEditImage = useCallback(() => {
        // TODO: Implement edit functionality
    }, [])

    return (
        <>
            <div className="flex items-center gap-2">
                {validImages.map((image, i) => (
                    <ImageThumbnail
                        key={i}
                        image={image}
                        index={i}
                        onClick={() => handleImageClick(i)}
                    />
                ))}
                {canAddMore && (
                    <AddImageButton
                        onClick={handleAddClick}
                        isUploading={upload.isUploading}
                        uploadProgress={upload.uploadProgress}
                        size="sm"
                    />
                )}
            </div>

            <ResponsiveModal
                open={showDialog}
                onOpenChange={setShowDialog}
                title={
                    selectedIndex < validImages.length
                        ? 'Preview Image'
                        : 'Upload Image'
                }
                className="max-w-5xl"
                contentClassName="p-0"
            >
                <Tabs
                    value={`image-${selectedIndex}`}
                    onValueChange={(val) =>
                        setSelectedIndex(Number(val.split('-')[1]))
                    }
                    className="flex flex-col md:flex-row min-h-[400px] md:min-h-[500px]"
                >
                    <TabsList className="flex md:flex-col w-full md:w-[100px] md:h-full border-b md:border-b-0 md:border-r p-2 gap-2 bg-transparent flex-shrink-0 overflow-x-auto md:overflow-y-auto scrollbar-hide touch-pan-x md:touch-pan-y">
                        {validImages.map((image, i) => (
                            <TabsTrigger
                                key={i}
                                value={`image-${i}`}
                                className={cn(
                                    'w-[60px] h-[60px] md:w-full md:h-[80px] border-2 rounded-md p-0 overflow-hidden flex-shrink-0',
                                    'data-[state=active]:border-primary data-[state=inactive]:border-border'
                                )}
                            >
                                <Image
                                    src={image}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </TabsTrigger>
                        ))}

                        {canAddMore && (
                            <AddImageButton
                                onClick={handleAddClick}
                                isUploading={upload.isUploading}
                                uploadProgress={upload.uploadProgress}
                                size="lg"
                            />
                        )}
                    </TabsList>

                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                        {validImages.map((image, i) => (
                            <TabsContent
                                key={i}
                                value={`image-${i}`}
                                className="flex-1 m-0 data-[state=active]:flex flex-col h-full"
                            >
                                <div className="flex-1 p-4 md:p-6 flex items-center justify-center bg-muted/30 overflow-hidden">
                                    <div className="w-full h-full max-w-2xl max-h-[300px] md:max-h-[500px] min-h-[250px] md:min-h-[400px] flex items-center justify-center">
                                        <Image
                                            src={image}
                                            alt="Preview"
                                            className="w-full h-full object-contain rounded-md"
                                        />
                                    </div>
                                </div>

                                <ImagePreviewActions
                                    onRemove={handleRemoveImage}
                                    onEdit={handleEditImage}
                                />
                            </TabsContent>
                        ))}
                    </div>
                </Tabs>
            </ResponsiveModal>
        </>
    )
}
