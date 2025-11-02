import { useMemo, useEffect, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { GalleryUploadModal } from '@/components/upload/gallery-upload-modal'
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
    const { draftImages, saveDraftImages } = useDraftItem(itemId)
    const [showModal, setShowModal] = useState(false)

    const mergedImages = useMemo(() => {
        return images.length > 0 ? images : draftImages
    }, [images, draftImages])

    useEffect(() => {
        if (mergedImages.length > 0 && images.length === 0) {
            onChange?.(mergedImages)
        }
    }, [mergedImages, images, onChange])

    const handleImagesChange = (newImages: string[]) => {
        onChange?.(newImages)
        saveDraftImages(newImages)
    }

    const canAddMore = mergedImages.length < 5

    return (
        <>
            <div className="flex items-center gap-2 flex-wrap">
                {mergedImages.map((image, i) => (
                    <Button
                        key={i}
                        type="button"
                        variant="outline"
                        className="size-12 rounded-md p-0 overflow-hidden"
                        onClick={() => setShowModal(true)}
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
                        onClick={() => setShowModal(true)}
                        className="size-12 rounded-md"
                        variant="outline"
                    >
                        <ImagePlus className="size-4" />
                    </Button>
                )}
            </div>

            <GalleryUploadModal
                open={showModal}
                onOpenChange={setShowModal}
                images={mergedImages}
                maxFiles={5}
                maxSize={5 * 1024 * 1024}
                path="items"
                onImagesChange={handleImagesChange}
            />
        </>
    )
}
