import { useState, useCallback } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useStorage, useStorageTask } from 'reactfire'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type {
    UploadTask,
    UploadTaskSnapshot,
    StorageReference
} from 'firebase/storage'

interface ImageUploadProps {
    path: string
    accept?: string
    onUploadComplete: (url: string) => void
    onCancel?: () => void
}

function UploadProgress({
    uploadTask,
    storageRef
}: {
    uploadTask: UploadTask
    storageRef: StorageReference
}) {
    const { data: snapshot } = useStorageTask<UploadTaskSnapshot>(
        uploadTask,
        storageRef
    )
    const { bytesTransferred, totalBytes } = snapshot
    const progress = Math.round((bytesTransferred / totalBytes) * 100)

    return (
        <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground text-center">
                {progress}% uploaded
            </p>
        </div>
    )
}

export function ImageUpload({
    path,
    accept = 'image/png, image/jpeg',
    onUploadComplete,
    onCancel
}: ImageUploadProps) {
    const storage = useStorage()
    const [uploadTask, setUploadTask] = useState<UploadTask | undefined>()
    const [storageRef, setStorageRef] = useState<StorageReference | undefined>()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (file.size > 10 * 1024 * 1024) {
            alert('File size must be less than 10MB')
            return
        }

        if (!file.type.startsWith('image/')) {
            alert('Only image files are allowed')
            return
        }

        setSelectedFile(file)
    }

    const handleUploadConfirm = useCallback(async () => {
        if (!selectedFile) return

        const fileName = `${Date.now()}-${selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const newRef = ref(storage, `${path}/${fileName}`)
        setStorageRef(newRef)

        const task = uploadBytesResumable(newRef, selectedFile, {
            contentType: selectedFile.type
        })

        task.then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref)
            onUploadComplete(downloadURL)
            setUploadTask(undefined)
            setStorageRef(undefined)
            setSelectedFile(null)
        }).catch((error) => {
            console.error('Upload failed:', error)
            alert(`Upload failed: ${error.message}`)
            setUploadTask(undefined)
            setStorageRef(undefined)
        })

        setUploadTask(task)
    }, [selectedFile, storage, path, onUploadComplete])

    const handleCancel = () => {
        setSelectedFile(null)
        onCancel?.()
    }

    if (selectedFile && !uploadTask) {
        return (
            <div className="flex w-full flex-col gap-4 items-center">
                <div className="border rounded-lg p-4 bg-muted/30">
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                </div>
                <div className="flex gap-2 justify-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleUploadConfirm}>
                        Upload
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md space-y-4">
            {uploadTask && storageRef ? (
                <UploadProgress
                    uploadTask={uploadTask}
                    storageRef={storageRef}
                />
            ) : (
                <>
                    <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:border-primary transition-colors">
                        <Upload className="size-12 text-muted-foreground" />
                        <div className="text-center">
                            <p className="text-sm font-medium">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                        <input
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload-input"
                        />
                        <label htmlFor="file-upload-input">
                            <Button
                                type="button"
                                size="sm"
                                className="mt-2"
                                asChild
                            >
                                <span>Choose File</span>
                            </Button>
                        </label>
                    </div>
                </>
            )}
        </div>
    )
}
