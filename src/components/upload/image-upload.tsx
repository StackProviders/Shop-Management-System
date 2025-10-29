import { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useStorage, useStorageTask } from 'reactfire'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload } from 'lucide-react'
import type {
    UploadTask,
    UploadTaskSnapshot,
    StorageReference
} from 'firebase/storage'

interface ImageUploadProps {
    path: string
    onComplete?: (downloadURL: string) => void
    accept?: string
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
    onComplete,
    accept = 'image/png, image/jpeg'
}: ImageUploadProps) {
    const storage = useStorage()
    const [uploadTask, setUploadTask] = useState<UploadTask | undefined>()
    const [storageRef, setStorageRef] = useState<StorageReference | undefined>()

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const newRef = ref(storage, `${path}/${file.name}`)
        setStorageRef(newRef)

        const task = uploadBytesResumable(newRef, file)

        task.then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref)
            onComplete?.(downloadURL)
            setUploadTask(undefined)
        }).catch((error) => {
            console.error('Upload failed:', error)
            setUploadTask(undefined)
        })

        setUploadTask(task)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <input
                    type="file"
                    accept={accept}
                    onChange={handleFileChange}
                    disabled={!!uploadTask}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload">
                    <Button asChild disabled={!!uploadTask}>
                        <span>
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Image
                        </span>
                    </Button>
                </label>
            </div>
            {uploadTask && storageRef && (
                <UploadProgress
                    uploadTask={uploadTask}
                    storageRef={storageRef}
                />
            )}
        </div>
    )
}
