// Example usage of useUpload hook and ImageUpload component

import { useUpload } from '@/hooks/use-upload'
import { ImageUpload } from '@/components/upload/image-upload'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useState } from 'react'

// Example 1: Basic hook usage
export function BasicUploadExample() {
    const {
        selectedFile,
        selectFile,
        uploadToFirebase,
        uploadProgress,
        isUploading
    } = useUpload({
        path: 'products',
        accept: 'image/*',
        maxSize: 5 * 1024 * 1024,
        onSuccess: (url) => console.log('Uploaded:', url)
    })

    return (
        <div className="space-y-4">
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) selectFile(file)
                }}
            />
            {selectedFile && (
                <Button onClick={() => uploadToFirebase(selectedFile)}>
                    Upload {selectedFile.name}
                </Button>
            )}
            {isUploading && uploadProgress && (
                <div className="space-y-2">
                    <Progress value={uploadProgress.percentage} />
                    <p className="text-sm">{uploadProgress.percentage}%</p>
                </div>
            )}
        </div>
    )
}

// Example 2: Custom avatar upload UI
export function AvatarUploadExample() {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

    return (
        <ImageUpload
            path="avatars"
            accept="image/png, image/jpeg"
            maxSize={2 * 1024 * 1024}
            onUploadComplete={setAvatarUrl}
        >
            {({
                selectFile,
                selectedFile,
                isUploading,
                uploadProgress,
                cancel
            }) => (
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="size-24">
                        <AvatarImage src={avatarUrl || undefined} />
                        <AvatarFallback>Upload</AvatarFallback>
                    </Avatar>
                    {!selectedFile && !isUploading && (
                        <Button
                            variant="outline"
                            onClick={() => {
                                const input = document.createElement('input')
                                input.type = 'file'
                                input.accept = 'image/*'
                                input.onchange = (e) => {
                                    const file = (e.target as HTMLInputElement)
                                        .files?.[0]
                                    if (file) selectFile(file)
                                }
                                input.click()
                            }}
                        >
                            Choose Avatar
                        </Button>
                    )}
                    {selectedFile && !isUploading && (
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={cancel}>
                                Cancel
                            </Button>
                            <Button onClick={() => selectFile(selectedFile)}>
                                Upload
                            </Button>
                        </div>
                    )}
                    {isUploading && uploadProgress && (
                        <div className="w-full space-y-2">
                            <Progress value={uploadProgress.percentage} />
                            <p className="text-xs text-center">
                                {uploadProgress.percentage}%
                            </p>
                        </div>
                    )}
                </div>
            )}
        </ImageUpload>
    )
}

// Example 3: Default UI
export function DefaultUploadExample() {
    return (
        <ImageUpload
            path="products"
            accept="image/*"
            maxSize={10 * 1024 * 1024}
            onUploadComplete={(url) => console.log('Uploaded:', url)}
            onCancel={() => console.log('Cancelled')}
        />
    )
}

// Example 4: Form integration
export function FormUploadExample() {
    const [imageUrl, setImageUrl] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted with image:', imageUrl)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <ImageUpload
                path="products"
                onUploadComplete={setImageUrl}
                className="w-full"
            />
            {imageUrl && (
                <div className="border rounded p-2">
                    <img src={imageUrl} alt="Preview" className="max-h-40" />
                </div>
            )}
            <Button type="submit" disabled={!imageUrl}>
                Submit
            </Button>
        </form>
    )
}
