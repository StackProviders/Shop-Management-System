import { useState, useMemo } from 'react'
import { ImagePlus, Upload, Pencil, Trash2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface ItemImageUploadProps {
    images?: string[]
    onChange?: (images: string[]) => void
}

export function ItemImageUpload({
    images = [],
    onChange
}: ItemImageUploadProps) {
    const [showDialog, setShowDialog] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)

    const validImages = useMemo(() => images.filter(Boolean), [images])
    const canAddMore = validImages.length < 5

    const handleImageClick = (imageIndex: number) => {
        setSelectedIndex(imageIndex)
        setShowDialog(true)
    }

    const handleAddClick = () => {
        setSelectedIndex(validImages.length)
        setShowDialog(true)
    }

    const handleRemoveImage = () => {
        const actualIndex = images.indexOf(validImages[selectedIndex])
        if (actualIndex !== -1) {
            const newImages = [...images]
            newImages.splice(actualIndex, 1)
            onChange?.(newImages)
            setShowDialog(false)
        }
    }

    return (
        <>
            <div className="flex items-center gap-2">
                {validImages.map((image, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => handleImageClick(i)}
                        className="w-12 h-12 border-2 rounded-md transition-colors overflow-hidden flex-shrink-0 border-border hover:border-primary"
                    >
                        <img
                            src={image}
                            alt={`Item ${i + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
                {canAddMore && (
                    <button
                        type="button"
                        onClick={handleAddClick}
                        className="w-12 h-12 border-2 border-dashed rounded-md hover:border-primary transition-colors flex items-center justify-center bg-muted/30 flex-shrink-0"
                    >
                        <ImagePlus className="size-4 text-muted-foreground" />
                    </button>
                )}
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-5xl h-[600px] p-0">
                    <DialogHeader className="px-6 py-4 border-b">
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
                        className="h-[calc(600px-120px)] flex"
                    >
                        <TabsList className="flex-col h-full w-[100px] border-r p-2 gap-2 bg-transparent">
                            {validImages.map((image, i) => (
                                <TabsTrigger
                                    key={i}
                                    value={`image-${i}`}
                                    className={cn(
                                        'w-full h-[80px] border-2 rounded-md p-0 overflow-hidden',
                                        'data-[state=active]:border-primary data-[state=inactive]:border-border'
                                    )}
                                >
                                    <img
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

                        <div className="flex-1 flex flex-col">
                            {validImages.map((image, i) => (
                                <TabsContent
                                    key={i}
                                    value={`image-${i}`}
                                    className="flex-1 m-0 data-[state=active]:flex flex-col"
                                >
                                    <div className="flex-1 p-6 flex items-center justify-center bg-muted/30">
                                        <img
                                            src={image}
                                            alt="Preview"
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>

                                    <div className="border-t p-4 flex justify-center gap-3">
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
                                    className="flex-1 m-0 data-[state=active]:flex flex-col"
                                >
                                    <div className="flex-1 p-6 flex items-center justify-center bg-muted/30">
                                        <div className="w-full max-w-md">
                                            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors cursor-pointer">
                                                <Upload className="size-12 text-muted-foreground" />
                                                <div className="text-center">
                                                    <p className="text-sm font-medium">
                                                        Click to upload or drag
                                                        and drop
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        PNG, JPG, GIF up to 10MB
                                                    </p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    className="mt-2"
                                                >
                                                    Choose File
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t p-4 flex justify-center gap-3">
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
