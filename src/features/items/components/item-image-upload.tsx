import { useState, useMemo, useEffect } from 'react'
import { ImagePlus, Pencil, Trash2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Image } from '@/components/ui/image'
import { ImageUpload } from '@/components/upload/image-upload'
import { useDraftItem } from '../hooks/use-draft-item'

interface ItemImageUploadProps {
    images?: string[]
    onChange?: (images: string[]) => void
    itemId?: string
}

export function ItemImageUpload({
    images = [],
    onChange,
    itemId
}: ItemImageUploadProps) {
    const [showDialog, setShowDialog] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const { draftImages, saveDraftImages } = useDraftItem(itemId)

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

    const handleImageClick = (imageIndex: number) => {
        setSelectedIndex(imageIndex)
        setShowDialog(true)
    }

    const handleAddClick = () => {
        setSelectedIndex(validImages.length)
        setShowDialog(true)
    }

    const handleUploadComplete = (url: string) => {
        const newImages = [...mergedImages, url]
        onChange?.(newImages)
        saveDraftImages(newImages)
        setShowDialog(false)
    }

    const handleUploadCancel = () => {
        setShowDialog(false)
    }

    const handleRemoveImage = () => {
        const actualIndex = mergedImages.indexOf(validImages[selectedIndex])
        if (actualIndex !== -1) {
            const newImages = [...mergedImages]
            newImages.splice(actualIndex, 1)
            onChange?.(newImages)
            saveDraftImages(newImages)
            setShowDialog(false)
        }
    }

    return (
        <>
            <div className="flex items-center gap-2">
                {validImages.map((image, i) => (
                    <Button
                        key={i}
                        type="button"
                        variant="dashed"
                        className="size-12 rounded-md hover:border-primary transition-colors flex items-center justify-center bg-muted/30 flex-shrink-0"
                        onClick={() => handleImageClick(i)}
                    >
                        <Image
                            src={image}
                            alt={`Item ${i + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </Button>
                ))}
                {canAddMore && (
                    <Button
                        type="button"
                        onClick={handleAddClick}
                        className="size-12 rounded-md hover:border-primary transition-colors flex items-center justify-center bg-muted/30 flex-shrink-0"
                        variant="dashed"
                    >
                        <ImagePlus className="size-4 text-muted-foreground" />
                    </Button>
                )}
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-5xl h-[500px] md:h-[600px] max-h-[90vh] p-0 flex flex-col">
                    <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
                        <DialogTitle>
                            {selectedIndex < validImages.length
                                ? 'Preview Image'
                                : 'Upload Image'}
                        </DialogTitle>
                    </DialogHeader>

                    <Tabs
                        value={`image-${selectedIndex}`}
                        onValueChange={(val) =>
                            setSelectedIndex(Number(val.split('-')[1]))
                        }
                        className="flex-1 flex min-h-[400px]"
                    >
                        <TabsList className="flex-col h-full w-[100px] border-r p-2 gap-2 bg-transparent flex-shrink-0 overflow-y-auto">
                            {validImages.map((image, i) => (
                                <TabsTrigger
                                    key={i}
                                    value={`image-${i}`}
                                    className={cn(
                                        'w-full h-[80px] border-2 rounded-md p-0 overflow-hidden',
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
                                <TabsTrigger
                                    value={`image-${validImages.length}`}
                                    className={cn(
                                        'w-full h-[80px] border-2 border-dashed rounded-md',
                                        'data-[state=active]:border-primary data-[state=inactive]:border-border',
                                        'flex items-center justify-center bg-muted/30'
                                    )}
                                >
                                    <ImagePlus className="size-4 text-muted-foreground" />
                                </TabsTrigger>
                            )}
                        </TabsList>

                        <div className="flex-1 flex flex-col min-w-0">
                            {validImages.map((image, i) => (
                                <TabsContent
                                    key={i}
                                    value={`image-${i}`}
                                    className="flex-1 m-0 data-[state=active]:flex flex-col min-h-0"
                                >
                                    <div className="flex-1 p-4 md:p-6 flex items-center justify-center bg-muted/30 min-h-[300px] overflow-hidden">
                                        <Image
                                            src={image}
                                            alt="Preview"
                                            className="max-w-full max-h-full object-contain rounded-md"
                                        />
                                    </div>

                                    <div className="border-t p-4 flex justify-center gap-3 flex-shrink-0">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleRemoveImage}
                                            className="gap-2"
                                        >
                                            <Trash2 className="size-4" />
                                            Remove Image
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="gap-2"
                                        >
                                            <Pencil className="size-4" />
                                            Edit Image
                                        </Button>
                                    </div>
                                </TabsContent>
                            ))}

                            {canAddMore && (
                                <TabsContent
                                    value={`image-${validImages.length}`}
                                    className="flex-1 m-0 data-[state=active]:flex flex-col min-h-0"
                                >
                                    <div className="flex-1 p-4 md:p-6 flex items-center justify-center bg-muted/30 min-h-[300px] overflow-hidden">
                                        <ImageUpload
                                            path="items"
                                            onUploadComplete={
                                                handleUploadComplete
                                            }
                                            onCancel={handleUploadCancel}
                                        />
                                    </div>

                                    <div className="border-t p-4 flex justify-center gap-3 flex-shrink-0">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled
                                            className="gap-2"
                                        >
                                            <Trash2 className="size-4" />
                                            Remove Image
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            disabled
                                            className="gap-2"
                                        >
                                            <Pencil className="size-4" />
                                            Edit Image
                                        </Button>
                                    </div>
                                </TabsContent>
                            )}
                        </div>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    )
}
